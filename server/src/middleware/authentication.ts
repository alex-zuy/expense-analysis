import {ErrorRequestHandler, RequestHandler} from 'express';
import AuthorizationError from '../errors/AuthorizationError';

export const requireAuthentication: RequestHandler = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        next(new AuthorizationError('User is not authenticated'));
    }
}

export const authorizationErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if(res.headersSent) {
        next(err);
    } else if(err instanceof AuthorizationError) {
        res.status(401)
            .json({message: err.message || 'Authorization error'})
            .end();
    } else {
        next(err);
    }
};
