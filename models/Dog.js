import mongoose from "mongoose";
const { Schema, model } = mongoose;
//create Schema
const dogSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	age: Number,
	image: String,
	likes: {
		type: Number,
		default: 0,
	},
});

//create model
const DogModel = model("Dog", dogSchema);

//export the model
export default DogModel;
