import User from '../models/User.js';
import { compare, hash } from 'bcrypt';
// get all registered user !!
const getAllUser = async (req, res, next) => {
    try {
        // get all users 
        const user = await User.find();
        return res.status(200).json({ message: "success", users: user });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
// Register for new user !!
const registerNewUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });
        return res.status(201).json({ message: "OK", id: newUser._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ messge: "ERROR", cause: error.message });
    }
};
// login user after registration !!
const LoginUser = async (req, res, next) => {
    try {
        const hash = "password";
        const { email, password } = req.body;
        const MatchPassword = compare(password, hash);
        if (MatchPassword) {
            return res.send("password matched");
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.messsage });
    }
};
export { getAllUser, registerNewUser, LoginUser };
//# sourceMappingURL=user-controller.js.map