import TheFormReg from "@/components/TheFormReg";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Next Register",
};

export default function Register() {
	return (
		<section className="flex flex-col justify-center items-center">
			<div className="mt-10">
				<h1 className="text-2xl">Создание аккаунта</h1>
			</div>
			<div className="my-10 sm:w-[400px] w-11/12 h-auto bg-[#ffffff] rounded-xl">
				<TheFormReg />
			</div>
		</section>
	);
}
