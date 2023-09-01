"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function TheNavigation() {
	const menuLink = [
		{ title: "Главная", href: "/" },
		{ title: "Создать пост", href: "/createPost" },
		{ title: "Зарегистрироваться", href: "/register" },
	];
	const [isOpen, setIsOpen] = useState(false);

	let isLogin = false;
	return (
		<nav>
			{/* Desktop Navigation */}
			<div className="sm:flex hidden sm:gap-4 md:text-lg text-base">
				{menuLink.map((link) => (
					<Link
						className=" transition-all hover:text-[#2E00A6]"
						href={link.href}
						key={link.title}
					>
						{link.title}
					</Link>
				))}
				<Link href="/auth">{isLogin ? "Выйти" : "Войти"}</Link>
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
						className=" cursor-pointer"
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
								className=" transition-all text-[#000000] hover:text-[#8c5fff]"
								href={link.href}
								key={link.title}
							>
								{link.title}
							</Link>
						))}
						<Link href="/auth">{isLogin ? "Выйти" : "Войти"}</Link>
					</div>
				)}
			</div>
		</nav>
	);
}
