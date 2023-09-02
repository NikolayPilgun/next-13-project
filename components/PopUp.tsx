"use client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

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
				<h2 className="text-2xl w-full text-center">Войти в аккаунт</h2>
				<div className="my-10 w-10/12 mx-auto">
					<label htmlFor="username" className="label_form mb-4">
						Имя пользователя
					</label>
					<input
						type="text"
						id="username"
						placeholder="Ваше имя"
						className="input_form"
					/>
				</div>
				<div className="my-10 w-10/12 mx-auto">
					<label htmlFor="password" className="label_form mb-4">
						Пароль
					</label>
					<input
						type="password"
						id="password"
						placeholder="Ваш пароль"
						className="input_form"
					/>
				</div>
				<div className="my-10 flex justify-center">
					<button type="submit" className="btn_form btn_primary">
						Войти
					</button>
				</div>
			</div>
		</div>
	);
}
