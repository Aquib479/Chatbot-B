import express from 'express';
const allRoutes = express.Router();
import userRoutes from './user-routes.js';
import chatRoutes from './chat-routes.js';
allRoutes.use('/user', userRoutes);
allRoutes.use('/chat', chatRoutes);
export default allRoutes;
//# sourceMappingURL=allroutes.js.map