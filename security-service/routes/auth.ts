import express from 'express';
import passport from 'passport';
import { register, login } from '../controllers/authController';
import { authenticateJWT } from '../middlewate/authMiddleware'

const router = express.Router();

router.post('/register', register);
router.post('/login', passport.authenticate('local', { session: false }), login);
router.post('/refresh-token', (req, res) => {
});

router.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'Welcome to the protected route!', user: req.user });
});

export default router;
