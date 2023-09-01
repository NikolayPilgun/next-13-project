import Image from "next/image";

export default function TheFooter() {
	return (
		<footer className="footer flex sm:flex-row flex-col justify-between items-center py-5 px-7 gap-4  bg-slate-300">
			<div>NextJS 13 Project</div>
			<div>
				<Image
					src="/logo/logo1.png"
					width={150}
					height={150}
					alt="Picture logo"
				/>
			</div>
			<div className="">
				Created by &copy;
				<span className=" text-orange-950">Nikolay Pilgun</span>
			</div>
		</footer>
	);
}
