//Bring in dependencies
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
//Bring in routes
import router from "./routes/index.js";
dotenv.config();

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

//start the server on the specified port
app.listen(PORT, () => {
	console.log(`Server running on ${PORT} 🚀`);
});
