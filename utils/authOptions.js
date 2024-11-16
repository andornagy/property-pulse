import GoogleProvier from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
	providers: [
		GoogleProvier({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	callbacks: {
		// Invoked on successful login
		async signIn({ profile }) {
			// 1. connect to the db
			await connectDB();

			// 2. check if the user exists in the db
			const userExists = await User.findOne({ email: profile.email });

			// 3. if not, create the user in the db
			if (!userExists) {
				// truncate username if too long
				const username = profile.name.slice(0, 20);

				await User.create({
					email: profile.email,
					username,
					image: profile.picture,
				});
			}

			// 4. return true to allow the user to sign in
			return true;
		},

		// Session callback function that modifies the session object
		async session({ session }) {
			// 1. get the user from db
			const user = await User.findOne({ email: session.user.email });

			// 2. assign user id from session
			session.user.id = user._id.toString();

			// 3. return session
			return session;
		},
	},
};
