//Bring in Router from express
import { Router } from "express";
import DogModel from "../models/Dog.js";
//Create instance of app router
const router = Router();

//Endpoint used to get all dogs
router.get("/", async (req, res, next) => {
	try {
		const dogs = await DogModel.find();
		return res.status(200).json(dogs);
	} catch (error) {
		next(error);
	}
});

//Endpoint used to get a single dogs
router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		//Check if id is present
		if (!id) return req.status(404);
		const dog = await DogModel.findById(id);
		//Checkif the record exist
		if (!dog) return res.status(404).json({ error: "Dog not found" });
		//Return the dog record
		return res.status(200).json(dog);
	} catch (error) {
		next(error);
	}
});

//Endpoint used to create a dog record
router.post("/", async (req, res, next) => {
	try {
		if (!req.body.name)
			return res.status(400).json({ error: "Dog name is required" });

		const newDog = DogModel(req.body);
		await newDog.save();

		return res.status(201).json(newDog);
	} catch (error) {
		next(error);
	}
});

//Endpoint used to update a dog record
router.put("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		//Check if id is present
		if (!id) return req.status(404);
		const updatedDog = await DogModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		return res.status(200).json(updatedDog);
	} catch (error) {
		next(error);
	}
});

//Endpoint used to delete a dog record
router.delete("/:id", async (req, res, next) => {
	try {
		await DogModel.findByIdAndDelete(req.params.id);
		return res.status(200).json({ message: "Dog deleted." });
	} catch (error) {
		next(error);
	}
});

export default router;
