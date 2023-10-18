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
export const signUpValidators = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Enter correct email"),
    body("password").trim().isLength({ min: 5 }).withMessage("Password length should be > 5"),
];
//# sourceMappingURL=validators.js.map