import SignInForm from "@/components/SignInForm";

export default async function UserSignIn() {
	return (
		<div className="flex justify-center items-center">
			<div className="mt-9 py-8 w-[400px] bg-[#ffffff]">
				<SignInForm />
			</div>
		</div>
	);
}
