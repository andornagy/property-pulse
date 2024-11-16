"use client";

import { useRouter } from "next/navigation";

const PropertyPage = () => {
	const router = useRouter();
	console.log(router);

	return (
		<div>
			<h1>PropertyPage</h1>
			<button onClick={() => router.replace("/")}>Go home</button>
		</div>
	);
};

export default PropertyPage;
