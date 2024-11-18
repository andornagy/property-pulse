"use client";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
	display: "block",
	margin: "100px auto",
};

const Spinner = () => {
	return (
		<ClipLoader
			color="#36d7b7"
			cssOverride={override}
			size={150}
			aria-label="Loading Spinner"
		/>
	);
};

export default Spinner;
