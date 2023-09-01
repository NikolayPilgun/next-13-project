"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	username: z
		.string()
		.min(3, { message: "Имя пользователя слишком короткое" })
		.max(20, "Имя пользователя слишком длинное")
		.transform((v) => v.toLowerCase().replace(/\s+/g, "_")),
	password: z.string().min(3, "Пароль слишком короткий"),
});
type FormSchema = z.infer<typeof formSchema>;

export default function TheFormReg() {
	const {
		register,
		handleSubmit,
		reset,
		setFocus,
		formState: { isDirty, isSubmitting, errors },
	} = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

	const onSubmit: SubmitHandler<FormSchema> = (data) => {
		console.log(data);
		reset();
	};

	useEffect(() => {
		setFocus("username");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
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
	);
}
