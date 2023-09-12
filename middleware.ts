export { default } from "next-auth/middleware";

export const config = {
	matcher: ["/createPost", "/([0-9]+)"],
};
