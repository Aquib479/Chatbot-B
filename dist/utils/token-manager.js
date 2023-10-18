import jwt from 'jsonwebtoken';
export const createAuthToken = (id, email, password, expiresIn) => {
    const payload = { id, email, password };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
export const AuthenticateUserToken = (req, res, next) => {
    const token = req.signedCookies['bearer'];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "no token found" });
    }
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "token expired! please login" });
            }
            else {
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
//# sourceMappingURL=token-manager.js.map