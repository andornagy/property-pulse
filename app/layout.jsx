import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import "@/assets/styles/globals.css";

export const metadata = {
	title: "Property Pulse",
	description: "Property Pulse",
};
const MainLayout = ({ children }) => {
	return (
		<AuthProvider>
			<html lang="en">
				<body>
					<Navbar />
					<main>{children} </main>
					<Footer />
				</body>
			</html>
		</AuthProvider>
	);
};

export default MainLayout;
