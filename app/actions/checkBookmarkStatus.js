"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

async function checkBookmarkStatus(propertyId) {
	const sessionUser = await getSessionUser();

	if (!sessionUser || !sessionUser.userId) {
		throw new Error("You must be logged in to bookmark a property");
	}

	const { userId } = sessionUser;

	await connectDB();

	const user = await User.findById(userId);

	let isBookmarked = user.bookmarks.includes(propertyId);

	return { isBookmarked };
}

export default checkBookmarkStatus;
