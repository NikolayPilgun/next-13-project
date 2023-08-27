import { IPost } from "@/components/TheBlog";
import { Metadata } from "next";

type Props = {
	params: {
		id: string;
	};
};

async function getData(id: string): Promise<IPost> {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${id}`,
		{
			next: {
				revalidate: 60,
			},
		}
	);

	if (!response.ok) throw new Error("Unable to fetch  post!");
	return response.json();
}

export async function generateMetadata({
	params: { id },
}: Props): Promise<Metadata> {
	return {
		title: `Post ${id}`,
	};
}

export default async function Post({ params: { id } }: Props) {
	const post = await getData(id);

	return (
		<div>
			<p>Идентификатор поста {post.id}</p>
			<p>{post.title}</p>
			<p>{post.body}</p>
			<p>{post.userId}</p>
		</div>
	);
}
