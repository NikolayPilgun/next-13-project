"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import PopUp from "./PopUp";

export default function TheNavigation() {
	const menuLink = [
		{ title: "Главная", href: "/" },
		{ title: "Создать пост", href: "/createPost" },
		{ title: "Зарегистрироваться", href: "/register" },
	];
	const pathname = usePathname();
	const [isOpenPopUp, setIsOpenPopUp] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	let isLogin = isOpenPopUp;

	return (
		<nav>
			{/* Desktop Navigation */}
			<div className="sm:flex items-center hidden sm:gap-4 md:text-lg text-base">
				{menuLink.map((link) => (
					<Link
						className={`transition-all hover:text-[#ed8936] ${
							pathname === link.href ? "activeLink" : ""
						}`}
						href={link.href}
						key={link.title}
					>
						{link.title}
					</Link>
				))}

				<button
					onClick={() => setIsOpenPopUp(true)}
					className={isLogin ? "signOut" : "signIn"}
				>
					{isLogin ? "Выйти" : "Войти"}
				</button>
			</div>
			{/* Mobile Navigation */}
			<div className="sm:hidden flex relative">
				{isOpen ? (
					<Image
						src="/icons/close.png"
						width={40}
						height={40}
						alt="close"
						onClick={() => setIsOpen(false)}
						className="cursor-pointer"
					/>
				) : (
					<Image
						src="/icons/burgerMenu.png"
						width={40}
						height={40}
						alt="burgerMenu"
						onClick={() => setIsOpen(true)}
						className=" cursor-pointer"
					/>
				)}
				{isOpen && (
					<div className="absolute top-10 right-0 flex flex-col gap-4 py-6 px-5 bg-slate-200">
						{menuLink.map((link) => (
							<Link
								className={`transition-all hover:text-[#ed8936] ${
									pathname === link.href ? "activeLink" : ""
								}`}
								href={link.href}
								key={link.title}
							>
								{link.title}
							</Link>
						))}
						<button
							onClick={() => setIsOpenPopUp(true)}
							className={`mt-5 ${isLogin ? "signOut" : "signIn"}`}
						>
							{isLogin ? "Выйти" : "Войти"}
						</button>
					</div>
				)}
			</div>
			<PopUp isOpenPopUp={isOpenPopUp} setIsOpenPopUp={setIsOpenPopUp} />
		</nav>
	);
}
