import { body, validationResult } from 'express-validator';
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(422).json({ errors: errors.array() });
    };
};
// Login validation !!
export const LoginValidators = [
    body("email").trim().isEmail().withMessage("Please enter correct email"),
    body("password").trim().isLength({ min: 5 }).withMessage("Password length should be greater than 5")
];
// New User Register validation !!
export const signUpValidators = [
    body("name").notEmpty().withMessage("Name is required"),
    ...LoginValidators,
];
// Chat message validation !!
export const ChatValidators = [
    body("message").notEmpty().withMessage("Enter some message"),
];
//# sourceMappingURL=validators.js.map