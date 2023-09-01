import { IPost } from "@/components/BlockWithPosts";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({
	params: { id },
}: Props): Promise<Metadata> {
	const postMeta = await getData(id);
	return {
		title: postMeta.title,
	};
}

type Props = {
	params: {
		id: string;
	};
};

async function getData(id: string): Promise<IPost> {
	const response = await fetch(`http://localhost:3004/posts/${id}`, {
		next: {
			revalidate: 60,
		},
	});

	if (!response.ok) throw new Error("Unable to fetch  post!");
	return response.json();
}

export default async function myPost({ params: { id } }: Props) {
	const post = await getData(id);

	return (
		<section className="my-10 mx-8 md:flex gap-5 justify-center">
			<div className="basis-1/4">
				<Image
					src={post.picture}
					width="0"
					height="0"
					sizes="100vw"
					className="w-full  h-auto"
					alt={post.title}
				/>
			</div>
			<div className="basis-3/4 max-md:mt-10">
				<h2 className="text-2xl mb-2">{post.author}</h2>
				<h3 className="text-xl mb-7">{post.title}</h3>
				<p>{post.fullDescription}</p>
			</div>
		</section>
	);
}
