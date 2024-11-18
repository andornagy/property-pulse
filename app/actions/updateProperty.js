"use server";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProperty(propertyId, formData) {
	await connectDB();

	const sessionUser = await getSessionUser();

	if (!sessionUser || !sessionUser.userId) {
		throw new Error("You must be logged in to add a property");
	}

	const { userId } = sessionUser;

	const existingProperty = await Property.findById(propertyId);

	// verify ownership
	if (existingProperty.owner.toString() !== userId) {
		throw new Error("Unauthorized");
	}

	// access all values from amenities and images
	const amenities = formData.getAll("amenities");

	const propertyData = {
		owner: userId,
		type: formData.get("type"),
		name: formData.get("name"),
		description: formData.get("description"),
		location: {
			street: formData.get("location.street"),
			city: formData.get("location.city"),
			state: formData.get("location.state"),
			zipcode: formData.get("location.zipcode"),
		},
		beds: formData.get("beds"),
		baths: formData.get("baths"),
		square_feet: formData.get("square_feet"),
		amenities,
		rates: {
			monthly: formData.get("rates.monthly"),
			weekly: formData.get("rates.weekly"),
			nightly: formData.get("rates.nightly"),
		},
		seller_info: {
			name: formData.get("seller_info.name"),
			email: formData.get("seller_info.email"),
			phone: formData.get("seller_info.phone"),
		},
	};

	const updatedProperty = await Property.findByIdAndUpdate(
		propertyId,
		propertyData
	);

	revalidatePath("/", "layout");

	redirect(`/properties/${propertyId}/edit`);
}
