"use server";

import connectDB from "@/config/database";
import cloudinary from "@/config/cloudinary";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
	const sessionUser = await getSessionUser();

	if (!sessionUser || !sessionUser.userId) {
		throw new Error("You must be logged in to delete a property");
	}

	const { userId } = sessionUser;

	await connectDB();

	const property = await Property.findById(propertyId);

	if (!property) {
		throw new Error("Property not found");
	}

	if (property.owner.toString() !== userId) {
		throw new Error("Unauthorized");
	}

	// extract public ids from image urls
	const publicIds = property.images.map((imageUrl) => {
		const parts = imageUrl.split("/");
		return parts.at(-1).split(".").at(0);
	});

	console.log(property._id + " " + propertyId);

	// delete images from cloudinary
	if (publicIds.length > 0) {
		for (let publicId of publicIds) {
			await cloudinary.uploader.destroy("propertypulse/" + publicId);
		}
	}

	await Property.deleteOne({ _id: propertyId });

	revalidatePath("/profile", "layout");
}

export default deleteProperty;
