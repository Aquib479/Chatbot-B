import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const createAuthToken = (id: string, email: string, password: string, expiresIn) => {
    const payload = { id, email, password };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn,
    });
    return token;
};

export const AuthenticateUserToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies['bearer'];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "no token found" });
    }
    return new Promise<void>((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "token expired! please login" })
            } else {
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        })
    })
}