import BlockWithPosts from "@/components/BlockWithPosts";
import Image from "next/image";
import { Suspense } from "react";
import bannerNext from "../public/pictures/bannerNext.png";

export default function Home() {
	return (
		<section className="text-center my-10">
			<div className="flex lg:flex-row flex-col justify-center items-center my-8">
				<div className="basis-3/5 px-4">
					<Image
						src={bannerNext}
						width="0"
						height="0"
						sizes="100vw"
						className="w-full h-auto"
						alt="Picture bannerNext"
					/>
				</div>
				<div className="basis-2/5 px-5 max-lg:mt-5">
					<h1 className="md:text-4xl text-lg text-orange-500">
						The React Framework for the Web
					</h1>
					<h2 className="md:text-lg text-base mt-5 text-[#4b4a4a]">
						Used by some of the world is largest companies, Next.js enables you
						to create full-stack Web applications by extending the latest React
						features, and integrating powerful Rust-based JavaScript tooling for
						the fastest builds.
					</h2>
				</div>
			</div>

			<div className=" min-h-min">
				<Suspense fallback={<p>Loading feed...</p>}>
					<BlockWithPosts />
				</Suspense>
			</div>
		</section>
	);
}
