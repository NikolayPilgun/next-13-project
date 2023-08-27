import TheBlog from "@/components/TheBlog";
import { Suspense } from "react";

export default function Home() {
	return (
		<section className="text-center my-10">
			<h1 className="text-2xl">Hello, Next.js!</h1>
			<h2 className="text-xl">Home</h2>
			<Suspense fallback={<p>Loading feed...</p>}>
				<TheBlog />
			</Suspense>
		</section>
	);
}
