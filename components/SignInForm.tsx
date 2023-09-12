"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface IProps {
	setIsOpenPopUp?: Dispatch<SetStateAction<boolean>>;
}

const formSchema = z.object({
	username: z
		.string()
		.regex(/^[a-zA-Z]+$/, {
			message: "Только латинские буквы",
		})
		.min(3, { message: "Имя пользователя слишком короткое" })
		.max(20, "Имя пользователя слишком длинное")
		.transform((v) => v.toLowerCase().replace(/\s+/g, "_")),
	password: z
		.string()
		.regex(/^[a-zA-Z0-9]+$/, {
			message: "Только латинские буквы и цифры",
		})
		.min(3, "Пароль слишком короткий")
		.max(7, "Пароль слишком длинное"),
});
type FormSchema = z.infer<typeof formSchema>;

export default function SignInForm(props: IProps) {
	const [isError, setIsError] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const { setIsOpenPopUp } = props;

	const {
		register,
		handleSubmit,
		formState: { isDirty, isSubmitting, errors },
	} = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

	async function handleSubmitUser(data: FormSchema) {
		const res = await signIn("credentials", {
			username: data.username,
			password: data.password,

			redirect: false,
		});

		if (res && !res.error) {
			console.log("ok");
			if (pathname === "/userSignIn") {
				router.refresh();
				router.push("/");
			}
			if (setIsOpenPopUp != undefined) {
				setIsOpenPopUp(false);
				router.refresh();
			}
		} else {
			setIsError(true);
			console.log(res);
		}
	}

	const onSubmit: SubmitHandler<FormSchema> = (data) => {
		handleSubmitUser(data);
	};

	return (
		<>
			{isError ? (
				<h2 className="text-2xl w-full text-center text-red-500 px-2">
					Неправильный логин или пароль
				</h2>
			) : (
				<h2 className="text-2xl w-full text-center px-2">Войти в аккаунт</h2>
			)}

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="my-10 w-10/12 mx-auto">
					{errors.username ? (
						<span role="alert" className="error mb-4">
							{errors.username?.message}
						</span>
					) : (
						<label htmlFor="username" className="label_form mb-4">
							Имя пользователя
						</label>
					)}

					<input
						{...register("username")}
						type="text"
						id="username"
						name="username"
						placeholder="Ваше имя"
						className="input_form"
						aria-invalid={errors.username ? "true" : "false"}
					/>
				</div>
				<div className="my-10 w-10/12 mx-auto">
					{errors.password ? (
						<span role="alert" className="error mb-4">
							{errors.password?.message}
						</span>
					) : (
						<label htmlFor="password" className="label_form mb-4">
							Пароль
						</label>
					)}
					<input
						{...register("password")}
						type="password"
						id="password"
						name="password"
						placeholder="Ваш пароль"
						className="input_form"
						aria-invalid={errors.password ? "true" : "false"}
					/>
				</div>
				<div className="my-10 flex justify-center">
					<button
						type="submit"
						className="btn_form btn_primary"
						disabled={!isDirty || isSubmitting}
					>
						Войти
					</button>
				</div>
			</form>
		</>
	);
}
