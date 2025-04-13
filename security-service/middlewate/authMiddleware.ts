import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { RequestWithUser } from '../types';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ message: 'Access forbidden', error: err.message });
        }
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        req.user = user; 
        next(); 
    })(req, res, next);
};

export const requireRole = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    
    const userReq = req as RequestWithUser;
    
    if (!userReq.user || !userReq.user.role || !roles.includes(userReq.user.role)) {
        return res.status(403).json({ 
            message: 'Access forbidden: insufficient permissions',
            required: roles,
            current: userReq.user?.role || 'none'
        });
    }
    
    next();
}; 