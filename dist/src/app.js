import { config } from "dotenv";
config();
import express from "express";
import morgan from 'morgan';
import allRoutes from "../routes/allroutes.js";
const app = express();
// middlewares
app.use(express.json());
// remove it in production
app.use(morgan("tiny"));
app.use("/api", allRoutes);
export default app;
//# sourceMappingURL=app.js.map