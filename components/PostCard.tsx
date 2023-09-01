import Image from "next/image";
import Link from "next/link";

export interface ICard {
	id: number;
	author: string;
	title: string;
	picture: string;
}

export default function PostCard({ id, author, title, picture }: ICard) {
	return (
		<div className="w-60 relative flex flex-col justify-end items-center">
			<Image
				src={picture}
				width="0"
				height="0"
				sizes="100vw"
				className="w-60  h-80"
				alt={title}
			/>
			<h2 className="text-lg mt-5">{author}</h2>
			<h3 className="text-base mt-3">{title}</h3>
			<Link
				className="absolute top-0 left-0 w-full  h-full"
				href={`/${id}`}
			></Link>
		</div>
	);
}
