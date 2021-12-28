//Bring in dependencies
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
//Bring in routes
import router from "./routes/index.js";
dotenv.config();
//Connect to database
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Connected to the DB"))
	.catch((e) => console.log(e.message));

//Initialize app
const app = express();

//Init middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Define port
const PORT = process.env.PORT;

//Tell our app to use the routes imported
app.use("/api/v1", router);

//Global error handler
app.use((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	res.status(err.statusCode).json({
		error: err.message,
	});
});
//start the server on the specified port
app.listen(PORT, () => {
	console.log(`Server running on ${PORT} 🚀`);
});
