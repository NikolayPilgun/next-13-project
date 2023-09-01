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
	let isLogin = true;
	const posts = await getData();

	return (
		<div className=" my-20">
			{isLogin ? (
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
				<h3>
					Зарегистрируйтесь или войдите в свою учётную запись чтобы увидеть
					содержимое
				</h3>
			)}
		</div>
	);
}
