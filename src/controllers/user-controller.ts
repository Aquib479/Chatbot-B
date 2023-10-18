import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import { compare, hash } from 'bcrypt';
import { createAuthToken } from '../utils/token-manager.js';

// get all registered user !!
export const getAllUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        // get all users 
        const user = await User.find();
        return res.status(200).json({ message: "success", users: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
}

// Register for new user !!
export const registerNewUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { name, email, password } = req.body;
        const ExistingUser = await User.findOne({ email });

        // check wether user email is already exists !
        //  if 'yes' then send an error !
        if (ExistingUser) {
            return res.status(401).send("User with this email already exists");
        }

        // if 'no' then create a new user !
        const hashedPassword = await hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });

        // create token and store cookie
        res.clearCookie("bearer", {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });

        const token = createAuthToken(newUser._id.toString(), newUser.email, newUser.password, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("bearer", token, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
            expires,
        });

        return res.status(201).json({ message: "OK", id: newUser._id.toString(), name: newUser.name, email: newUser.email });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ messge: "ERROR", cause: error.message });
    }
}

// login user after registration !!
export const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // check wether user email exists or not !!
        if (!user) {
            return res.status(401).send("User email not found");
        }

        // if 'yes' then match the user password !
        const MatchPassword = await compare(password, user.password);
        if (!MatchPassword) {
            return res.status(403).send("Incorrect password");
        }

        // if user login again just clear the cookie !
        res.clearCookie("bearer", {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });

        const token = createAuthToken(user._id.toString(), user.email, user.password, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("bearer", token, {
            httpOnly: true,
            signed: true,
            path: "/",
            domain: "localhost",
            secure: true,
            expires,
        });

        // if password matches then send the user !
        return res.status(200).json({ message: "OK", id: user._id.toString(), email: user.email, name: user.name });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.messsage });
    }
}

// verify user login with some local variables 
export const VerifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);

        // check wether user email exists or not !!
        if (!user) {
            return res.status(401).send("User email not found");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission didn't match");
        }
        // if password matches then send the user !
        return res.status(200).json({ message: "OK", id: user._id.toString(), name: user.name, email: user.email });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.messsage });
    }
}

// logout user by deleting their token from cookie !!
export const LogoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);

        // check wether user email exists or not !!
        if (!user) {
            return res.status(401).send("User email not found");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission didn't match");
        }
        res.clearCookie("bearer", {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        return res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.messsage });
    }
}