import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    const newUser = new User({ username, password, email });

    await newUser.save();

    res.json({ message: "User registered successfully", userId: newUser._id });
};

export const login = (req: Request, res: Response) => {
    const token = jwt.sign({ id: req.user?.id }, 'your_jwt_secret');

    res.json({ accessToken: token });
};
