import "@/assets/styles/globals.css";

export const metadata = {
	title: "Property Pulse",
	description: "Property Pulse",
};
const MainLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
};

export default MainLayout;
