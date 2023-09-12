import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";
import PostCard from "./PostCard";

export interface IPost {
	id: number;
	author: string;
	title: string;
	fullDescription: string;
	picture: string;
}

async function getData(): Promise<IPost[]> {
	const response = await fetch("http://localhost:3004/posts", {
		next: {
			revalidate: 1,
		},
	});
	if (!response.ok) throw new Error("Unable to fetch posts!");
	return response.json();
}

export default async function BlockWithPosts() {
	const posts = await getData();
	const session = await getServerSession(authConfig);

	return (
		<div className=" my-20">
			{session?.user ? (
				<div className="flex flex-wrap gap-14 justify-center items-center">
					{posts.map((post: IPost) => (
						<PostCard
							key={post.id}
							id={post.id}
							author={post.author}
							title={post.title}
							picture={post.picture}
						/>
					))}
				</div>
			) : (
				<h3 className=" text-2xl my-12 py-5 bg-red-300">
					Зарегистрируйтесь или войдите в свою учётную запись чтобы увидеть
					содержимое
				</h3>
			)}
		</div>
	);
}
