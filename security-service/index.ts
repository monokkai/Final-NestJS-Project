import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth';
import passport from './config/passport';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/security-service';

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', service: 'security-service' });
});

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Security service running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });

export default app;
