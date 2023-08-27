"use client";
import Link from "next/link";
export default function TheNavigation() {
	const menuLink = [
		{ title: "Главная", href: "/" },
		{ title: "Создать пост", href: "/createPost" },
		{ title: "Зарегистрироваться", href: "/register" },
	];

	let isLogin = false;
	return (
		<nav className="sm:flex hidden sm:gap-4 md:text-lg text-base">
			{menuLink.map((link) => (
				<Link
					className="text-[#2E00A6] transition-all 
          hover:text-[#B200FF]"
					href={link.href}
					key={link.title}
				>
					{link.title}
				</Link>
			))}
			<Link href="/auth">{isLogin ? "Выйти" : "Войти"}</Link>
		</nav>
	);
}
