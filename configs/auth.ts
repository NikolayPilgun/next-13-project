import type { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export interface IUser {
	id: number;
	username: string;
	password: string;
	name?: string;
	email?: string;
	image?: string;
}

async function getData(username: string, password: string): Promise<IUser[]> {
	const response = await fetch(
		`http://localhost:3004/users?username=${username}&password=${password}`
	);
	if (!response.ok) throw new Error("Unable to fetch posts!");
	return response.json();
}

export const authConfig: AuthOptions = {
	providers: [
		Credentials({
			credentials: {
				username: { label: "Username", type: "text", required: true },
				password: { label: "Password", type: "password", required: true },
			},
			async authorize(credentials) {
				if (!credentials?.username || !credentials.password) return null;
				const [user] = await getData(
					credentials.username,
					credentials.password
				);

				if (user) {
					const userWithoutPass = {
						id: String(user.id),
						name: user?.name,
						email: user?.email,
						image: user?.image,
					};

					return userWithoutPass as User;
				}

				return null;
			},
		}),
	],
	pages: {
		signIn: "/userSignIn",
	},
};
