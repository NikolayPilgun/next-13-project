import TheFooter from "@/components/TheFooter";
import TheHeader from "@/components/TheHeader";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Next Home",
	description: "First trial project on next.js 13.4.*",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru">
			<body className={inter.className}>
				<TheHeader />
				<main className="main">{children}</main>
				<TheFooter />
			</body>
		</html>
	);
}
