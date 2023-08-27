import Image from "next/image";

export default function TheFooter() {
	return (
		<footer className="footer flex sm:flex-row flex-col justify-between items-center py-5 px-5 gap-4">
			<div className="sm:text-slate-300 text-[#2E00A6]">NextJS 13 Project</div>
			<div>
				<Image
					src="/logo/logo1.png"
					width={150}
					height={150}
					alt="Picture logo"
				/>
			</div>
			<div className="sm:text-slate-300 text-[#2E00A6]">
				Created by &copy;
				<span className="sm:text-slate-100 text-[#2E00A6]">Nikolay Pilgun</span>
			</div>
		</footer>
	);
}
