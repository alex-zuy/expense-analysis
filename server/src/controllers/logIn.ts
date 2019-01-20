import {RequestHandler} from 'express';
import * as passport from 'passport';
import User from '../entities/User';
import {InfoData} from '../appConfig/passport/DbLocalStrategy';

export const logIn: RequestHandler = (req, res, next) => {

    passport.authenticate('local',

        (err: Error | null, user: User | false, info: InfoData) => {

            if (user === false) {
                const message = info
                    ? info.message
                    : (err ? err.message : 'Unknown error');

                res.status(400)
                    .json({message})
                    .end();
            } else {
                req.login(user, (err?: Error) => {
                    if(err) {
                        next(err);
                    } else {
                        res.status(200)
                            .end();
                    }
                });
            }
        }
    )(req, res, next);
}
