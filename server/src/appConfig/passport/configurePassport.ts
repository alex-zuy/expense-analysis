import {PassportStatic} from 'passport';
import User from '../../entities/User';
import AuthenticationService from '../../services/AuthenticationService';
import DbLocalStrategy from './DbLocalStrategy';

export const configurePassport = (passport: PassportStatic, authenticationService: AuthenticationService) => {

    passport.use('local', new DbLocalStrategy(authenticationService));

    passport.serializeUser((user: User, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: number, done) => {
        try {
            const user = await authenticationService.getUserById(id);
            done(null, user);
        } catch (e) {
            done(e, false);
        }
    });
};
