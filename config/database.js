import mongoose from "mongoose";

let connect = false;

const connectDB = async () => {
	mongoose.set("strictQuery", true);

	// if the database is already connected, don't connect again
	if (connect) {
		console.log("Database is already connected");
		return;
	}

	// connect to the database
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		connect = true;
		console.log("Database connected");
	} catch (error) {
		console.log(error);
	}
};

export default connectDB;
