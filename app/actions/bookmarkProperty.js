"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId) {
	const sessionUser = await getSessionUser();

	if (!sessionUser || !sessionUser.userId) {
		throw new Error("You must be logged in to bookmark a property");
	}

	const { userId } = sessionUser;

	await connectDB();

	const user = await User.findById(userId);

	let isBookmarked = user.bookmarks.includes(propertyId);

	let message;

	if (isBookmarked) {
		// if already bookmarked, remove from bookmarks
		user.bookmarks.pull(propertyId);
		message = "Property removed from bookmarks";
		isBookmarked = false;
	} else {
		// if not bookmarked, add to bookmarks
		user.bookmarks.push(propertyId);
		message = "Property bookmarked successfully";
		isBookmarked = true;
	}

	await user.save();

	// revalidate path to update the client side cache
	revalidatePath("/properties/saved", "page");

	return { message, isBookmarked };
}

export default bookmarkProperty;
