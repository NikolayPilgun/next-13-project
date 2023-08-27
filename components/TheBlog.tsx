import Link from "next/link";

export interface IPost {
	userId: number;
	id: number;
	title: string;
	body: string;
}

async function getData(): Promise<IPost[]> {
	const response = await fetch(
		"https://jsonplaceholder.typicode.com/posts?_limit=30",
		{
			next: {
				revalidate: 60,
			},
		}
	);
	if (!response.ok) throw new Error("Unable to fetch posts!");
	return response.json();
}

export default async function TheBlog() {
	const posts = await getData();

	return (
		<div className=" my-20">
			<ul>
				{posts.map((post: IPost) => (
					<li key={post.id}>
						<Link href={`/${post.id}`}>{post.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
