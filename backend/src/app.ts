import express, {Request, Response} from "express";
import cors from "cors";

import homeRoutes from "./routes/home"

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost",
            "http://localhost:5173",
        ],
        credentials: true,
    })
);

app.use(express.json());

app.use("/api", homeRoutes)

export default app;