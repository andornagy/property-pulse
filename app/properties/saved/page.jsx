import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { toast } from "react-toastify";

const SavedPropertiesPage = async () => {
	const { userId } = await getSessionUser();

	if (!userId) {
		toast.error("You must be logged in to view saved properties");
		return;
	}

	await connectDB();

	const { bookmarks } = await User.findById(userId).populate("bookmarks");

	console.log(bookmarks);

	return (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto px-4 py-6">
				<h1 className="text-3xl font-bold mb-4">Saved Properties</h1>
				{bookmarks.length === 0 ? (
					<p>No saved properties found</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{bookmarks.map((property) => (
							<PropertyCard key={property._id} property={property} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default SavedPropertiesPage;
