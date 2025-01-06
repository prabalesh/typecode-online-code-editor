import express, {Request, Response} from "express";
import cors from "cors";

import homeRoutes from "./routes/home"
import { config } from "./config/config";

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost",
            "http://localhost:3000",
            config.FRONTEND_URL,
            `config.FRONTEND_URL:${3000}`,
            "http://localhost:5173",
        ],
        credentials: true,
    })
);

app.use(express.json());

app.use("/api", homeRoutes)

export default app;