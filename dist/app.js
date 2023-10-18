import { config } from "dotenv";
config();
import express from "express";
import morgan from 'morgan';
import allRoutes from "./routes/allroutes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
const app = express();
// middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// remove it in production
app.use(morgan("tiny"));
app.use("/api", allRoutes);
export default app;
//# sourceMappingURL=app.js.map