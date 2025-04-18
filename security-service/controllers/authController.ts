import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_REFRESH_SECRET } from '../config/jwtConfig';
import { RequestWithUser, AuthUser } from '../types';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password, email, role } = req.body;

        const existingUser = await User.findOne({ 
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({ 
                message: "User with this username or email already exists" 
            });
        }

        const newUser = new User({ 
            username, 
            password, 
            email, 
            role: role || 'user' 
        });

        await newUser.save();

        res.status(201).json({ 
            message: "User registered successfully", 
            userId: newUser._id 
        });
    } catch (error: any) {
        res.status(500).json({ 
            message: "Registration failed", 
            error: error.message || 'Unknown error'
        });
    }
};

export const login = async (req: RequestWithUser, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        const user = req.user as AuthUser & IUser & { _id: string };
        
        const token = user.generateToken();
        
        const refreshToken = jwt.sign(
            { id: user._id }, 
            JWT_REFRESH_SECRET, 
            { expiresIn: '7d' }
        );

        res.status(200).json({ 
            token,
            refreshToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error: any) {
        res.status(500).json({ 
            message: "Login failed", 
            error: error.message || 'Unknown error'
        });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token is required" });
        }
        
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { id: string };
        
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const token = user.generateToken();
        
        res.status(200).json({ token });
    } catch (error: any) {
        res.status(401).json({ 
            message: "Invalid refresh token", 
            error: error.message || 'Unknown error'
        });
    }
};

export const getUserProfile = async (req: RequestWithUser, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized - user not found in request" });
        }
        
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ 
            message: "Failed to get user profile", 
            error: error.message || 'Unknown error'
        });
    }
};

export const verifyRole = async (req: Request, res: Response) => {
    try {
        const { userId, requiredRoles } = req.body;
        
        if (!userId || !requiredRoles || !Array.isArray(requiredRoles)) {
            return res.status(400).json({ 
                message: "User ID and required roles array are required" 
            });
        }
        
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const hasRequiredRole = requiredRoles.includes(user.role);
        
        res.status(200).json({ 
            hasRequiredRole,
            userRole: user.role 
        });
    } catch (error: any) {
        res.status(500).json({ 
            message: "Role verification failed", 
            error: error.message || 'Unknown error'
        });
    }
};
