import TheCreatePost from "@/components/TheCreatePost";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Next Create Post",
};

export default function CreatePost() {
	return (
		<section className="flex_center my-10">
			<h2 className="text-2xl font-bold text-gray-900 mb-5">
				Добавить новую книгу
			</h2>
			<TheCreatePost />
		</section>
	);
}
