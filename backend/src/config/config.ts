import dotenv from "dotenv";

dotenv.config();

const _config = {
    PORT: process.env.PORT || 3000,
    FRONTEND_URL: process.env.FRONTEND_URL || "",
    PISTON_URL: process.env.PISTON_URL || "",
};

export const config = Object.freeze(_config);