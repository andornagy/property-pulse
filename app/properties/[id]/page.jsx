import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { convertToSerializableObject } from "@/utils/convertToObject";

const PropertyPage = async ({ params }) => {
	await connectDB();

	const propertyDoc = await Property.findById(params.id).lean();

	const property = convertToSerializableObject(propertyDoc);

	if (!property) {
		throw new Error("Property not found");
	}

	return (
		<>
			<PropertyHeaderImage image={property.images[0]} />
			<section>
				<div className="container m-auto py-6 px-6">
					<Link
						href="/properties"
						className="text-blue-500 hover:text-blue-600 flex items-center"
					>
						<FaArrowLeft className="fas fa-arrow-left mr-2" /> Back to
						Properties
					</Link>
				</div>
			</section>
			<section class="bg-blue-50">
				<div class="container m-auto py-10 px-6">
					<div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
						<PropertyDetails property={property} />
					</div>
				</div>
			</section>
			<PropertyImages images={property.images} />
		</>
	);
};

export default PropertyPage;