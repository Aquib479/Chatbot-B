import express from 'express';
const userRoutes = express.Router();
import { LoginUser, LogoutUser, VerifyUser, getAllUser, registerNewUser } from '../controllers/user-controller.js';
import { validate, signUpValidators, LoginValidators } from '../utils/validators.js';
import { AuthenticateUserToken } from '../utils/token-manager.js';
userRoutes.get("/", getAllUser);
userRoutes.post('/register', validate(signUpValidators), registerNewUser);
userRoutes.post('/login', validate(LoginValidators), LoginUser);
userRoutes.get('/authenticate', AuthenticateUserToken, VerifyUser);
userRoutes.get('/logout', AuthenticateUserToken, LogoutUser);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map