import Image from "next/image";
import TheNavigation from "./TheNavigation";
export default function TheHeader() {
	return (
		<>
			<header className="flex justify-between items-center p-5">
				<div className="flex items-center gap-3">
					<Image
						src="/logo/logo1.png"
						width={80}
						height={80}
						alt="Picture logo"
					/>
					<span className="text-xl max-md:sm:hidden">Next.js</span>
				</div>
				<TheNavigation />
			</header>
			<div className="w-full h-1 bg-slate-400"></div>
		</>
	);
}
