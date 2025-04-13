import mongoose, { Document } from 'mongoose';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    role: 'guest' | 'user' | 'moderator' | 'admin' | 'manager' | 'operator';
    comparePassword(candidatePassword: string): boolean;
    generateToken(): string;
}

const UserSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { 
        type: String, 
        required: true, 
        enum: ['guest', 'user', 'moderator', 'admin', 'manager', 'operator'],
        default: 'user'
    }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = Buffer.from(this.password).toString('base64');
        return next();
    } catch (error) {
        return next(error as Error);
    }
});

UserSchema.methods.comparePassword = function(candidatePassword: string): boolean {
    const encodedPassword = Buffer.from(candidatePassword).toString('base64');
    return encodedPassword === this.password;
};

UserSchema.methods.generateToken = function(): string {
    const payload = {
        id: this._id,
        username: this.username,
        email: this.email,
        role: this.role
    };
    
    return jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });
};

export default mongoose.model<IUser>('User', UserSchema);
