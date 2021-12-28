//Bring in Router from express
import { Router } from "express";
//Create instance of app router
const router = Router();
import dogs from "./dog.js";

router.use("/dogs", dogs);

//export the router variable as default
export default router;
