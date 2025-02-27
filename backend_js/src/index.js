const dotenv = require("dotenv");
const connectDB = require("./config/mysqlDb");
const app = require("./app.js");

process.on("uncaughtException", (err) => {
    console.error(`Error: ${err.message}`);
    console.error(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

// Test API
app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to Pyro Hackathon!" });
});

const start = () => {
    connectDB();

    const server = app.listen(PORT, HOST, () => {
        console.log(`App listening at http://${HOST}:${PORT}`);
    });

    process.on("unhandledRejection", (err) => {
        console.error(`Error: ${err.message}`);
        console.error(`Shutting down the server due to Unhandled Promise Rejection`);

        server.close(() => {
            process.exit(1);
        });
    });
};

start();
