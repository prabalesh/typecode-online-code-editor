import app from "./app";
import { config } from "./config/config"

const startServer = async () => {
    app.listen(config.PORT, () => {
        console.log("Server listening on PORT: ", config.PORT);
    });
};

startServer();