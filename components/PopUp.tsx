"use client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import SignInForm from "./SignInForm";

type Props = {
	isOpenPopUp: boolean;
	setIsOpenPopUp: Dispatch<SetStateAction<boolean>>;
};

export default function PopUp({ isOpenPopUp, setIsOpenPopUp }: Props) {
	const popUpVisibility = `fixed top-0 right-0 w-[100vw] h-[100vh] bg-opacity-30 bg-[#676464] flex justify-center items-center  z-10 ${
		isOpenPopUp ? "" : "hidden"
	}`;

	return (
		<div className={popUpVisibility}>
			<div className="w-[400px]  bg-[#ffffff]">
				<div className="flex justify-end">
					<Image
						src="/icons/close.png"
						width={40}
						height={40}
						alt="close"
						className="cursor-pointer p-2"
						onClick={() => setIsOpenPopUp(false)}
					/>
				</div>
				<SignInForm setIsOpenPopUp={setIsOpenPopUp} />
			</div>
		</div>
	);
}
