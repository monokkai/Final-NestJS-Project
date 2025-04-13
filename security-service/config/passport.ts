import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';
import { JWT_SECRET } from './jwtConfig';

type DoneCallback = (error: any, user?: any, info?: any) => void;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username: string, password: string, done: DoneCallback) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username or password.' });
        }

        const isMatch = user.comparePassword(password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect username or password.' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
};

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload: any, done) => {
    try {
        const user = await User.findById(jwtPayload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
}));

export default passport;
