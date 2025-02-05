import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';

type DoneCallback = (error: any, user?: any, info?: any) => void;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username: string, password: string, done: DoneCallback) => {
    const user = await User.findOne({ username });
    if (!user) return done(null, false, { message: 'Incorrect username.' });

    if (user.password !== password) return done(null, false, { message: 'Incorrect password.' });

    return done(null, user);
}));

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
};

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload: any, done) => {
    const user = await User.findById(jwtPayload.id);
    if (user) return done(null, user);
    return done(null, false);
}));
