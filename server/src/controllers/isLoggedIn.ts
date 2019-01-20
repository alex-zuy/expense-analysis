import {RequestHandler} from 'express';

export const isLoggedIn: RequestHandler = (req, res) => {
    const result = {
        isLoggedIn: req.isAuthenticated()
    };
    res.json(result).end();
};
