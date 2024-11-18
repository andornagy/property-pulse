import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
					<ToastContainer />
				</body>
			</html>
		</AuthProvider>
	);
};

export default MainLayout;
