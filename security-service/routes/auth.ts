import express, { Request, Response } from 'express';
import passport from 'passport';
import { register, login, refreshToken, getUserProfile, verifyRole } from '../controllers/authController';
import { authenticateJWT } from '../middlewate/authMiddleware';
import { RequestWithUser } from '../types';

const router = express.Router();

// Authentication routes
router.post('/register', register);
router.post('/login', passport.authenticate('local', { session: false }), (req: Request, res: Response) => {
  return login(req as RequestWithUser, res);
});
router.post('/refresh-token', refreshToken);

// Protected routes
router.get('/profile', authenticateJWT, (req: Request, res: Response) => {
  return getUserProfile(req as RequestWithUser, res);
});
router.post('/verify-role', verifyRole);

// Test protected route
router.get('/protected', authenticateJWT, (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the protected route!', user: req.user });
});

export default router;
