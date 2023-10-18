import express from 'express';
const userRoutes = express.Router();
import { getAllUser, registerNewUser } from '../controllers/user-controller.js';
import { validate, signUpValidators } from '../utils/validators.js';
userRoutes.get("/", getAllUser);
userRoutes.post('/register', validate(signUpValidators), registerNewUser);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map