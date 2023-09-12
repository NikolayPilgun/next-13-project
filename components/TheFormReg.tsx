"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	username: z
		.string()
		.regex(/^[a-zA-Z]+$/, {
			message: "Только латинские буквы",
		})
		.min(3, { message: "Имя пользователя слишком короткое" })
		.max(20, { message: "Имя пользователя слишком длинное" })
		.transform((v) => v.toLowerCase().replace(/\s+/g, "_")),
	password: z
		.string()
		.regex(/^[a-zA-Z0-9]+$/, {
			message: "Только латинские буквы и цифры",
		})
		.min(3, { message: "Пароль слишком короткий" })
		.max(7, { message: "Пароль слишком длинное" }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function TheFormReg() {
	const [isRegister, setIsRegister] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		setFocus,
		formState: { isDirty, isSubmitting, errors },
	} = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

	async function registerUser(data: FormSchema) {
		await fetch("http://localhost:3004/users", {
			method: "POST",
			body: JSON.stringify({
				username: data.username,
				password: data.password,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		});
	}

	const onSubmit: SubmitHandler<FormSchema> = (data) => {
		registerUser(data);
		reset();
		setIsRegister(true);
	};

	useEffect(() => {
		setFocus("username");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{isRegister ? (
				<div className="flex_center p-5">
					<h2 className="text-green-600 text-2xl text-center my-6 ">
						Вы успешно зарегистрировались
					</h2>
					<Link
						className="my-9 hover:text-orange-400 transition-all"
						href="/userSignIn"
					>
						Теперь вы можете войти в свой аккаунт
					</Link>
				</div>
			) : (
				<form className="flex_center" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex_center my-10">
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
							placeholder="Ваше имя"
							aria-invalid={errors.username ? "true" : "false"}
							className="input_form"
						/>
					</div>
					<div className="flex_center my-10">
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
							placeholder="Не менее 3 символов"
							className="input_form"
							aria-invalid={errors.password ? "true" : "false"}
						/>
					</div>
					<div className="my-10">
						<button
							type="submit"
							className="btn_form btn_primary"
							disabled={!isDirty || isSubmitting}
						>
							Создать аккаунт
						</button>
					</div>
				</form>
			)}
		</>
	);
}
