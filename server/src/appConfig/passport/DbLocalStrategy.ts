import {Strategy} from 'passport-local';
import AuthenticationService from '../../services/AuthenticationService';

export interface InfoData {
    message: string
}

export default class DbLocalStrategy extends Strategy {

    private readonly authenticationService: AuthenticationService;

    constructor(authenticationService: AuthenticationService) {
        super(async (username, providedPassword, done) => {

            try {
                const user = await authenticationService.tryMatchUserByEmailAndPassword(username, providedPassword);

                if (user !== null) {
                    done(null, user);
                } else {
                    const info: InfoData = {message: 'Incorrect username or password'};
                    done(null, false, info);
                }
            } catch (e) {
                done(e);
            }
        });
    }
}
