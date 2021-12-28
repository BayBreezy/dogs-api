//Bring in Router from express
import { Router } from "express";
//Create instance of app router
const router = Router();

let dogs = [];

//Endpoint used to get all dogs
router.get("/", async (req, res, next) => {
	res.status(200).json([...dogs]);
});

//Endpoint used to get a single dogs
router.get("/:id", async (req, res, next) => {
	const { id } = req.params;

	//Check if id is present
	if (!id) return req.status(404);

	const dog = dogs.find((d) => d.id == id);

	//Checkif the record exist
	if (!dog) return res.status(404).json({ error: "Dog not found" });

	//Return the dog record
	res.status(200).json(dog);
});

//Endpoint used to create a dog record
router.post("/", async (req, res, next) => {
	let d = {
		...req.body,
		id: dogs.length > 0 ? dogs[dogs.length - 1].id + 1 : 1,
	};
	dogs.push(d);

	res.status(201).json(d);
});

//Endpoint used to update a dog record
router.put("/:id", async (req, res, next) => {
	const { id } = req.params;
	//Check if id is present
	if (!id) return req.status(404);
	const dog = dogs.find((d) => d.id == id);
	//Checkif the record exist
	if (!dog) return res.status(404).json({ error: "Dog not found" });
	//Find the position of the dog in the array
	let dogIndex = dogs.findIndex((d) => d.id === dog.id);
	//replace the record with the new data passed in
	dogs.splice(dogIndex, 1, { ...req.body, id });
	res.status(200).json({ message: "Dog updated." });
});

//Endpoint used to delete a dog record
router.delete("/:id", async (req, res, next) => {
	dogs = dogs.filter((d) => d.id != req.params.id);
	res.status(200).json({ message: "Dog deleted." });
});

export default router;
