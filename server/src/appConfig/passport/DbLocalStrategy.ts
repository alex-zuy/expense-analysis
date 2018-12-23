import {Strategy} from 'passport-local';
import AuthenticationService from '../../services/AuthenticationService';

export default class DbLocalStrategy extends Strategy {

    private readonly authenticationService: AuthenticationService;

    constructor(authenticationService: AuthenticationService) {
        super(async (username, providedPassword, done) => {

            try {
                const user = await authenticationService.tryMatchUserByEmailAndPassword(username, providedPassword);

                if (user !== null) {
                    done(null, user);
                } else {
                    done(null, false, {message: 'Incorrect username or password'})
                }
            } catch (e) {
                done(e, false);
            }
        });
    }
}
