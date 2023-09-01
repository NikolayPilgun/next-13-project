"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	author: z
		.string()
		.min(3, { message: "Имя автора слишком короткое" })
		.max(20, "Имя автора слишком длинное"),
	bookTitle: z
		.string()
		.min(3, { message: "Название книги слишком короткое" })
		.max(20, "Название книги слишком длинное"),
	fullDescription: z
		.string()
		.min(10, { message: "Описание книги слишком короткое" })
		.max(1000, "Описание книги слишком длинное"),
});
type FormSchema = z.infer<typeof formSchema>;

export default function TheCreatePost() {
	const [selectedBook, setSelectedBook] = useState("/pictures/books/book1.jpg");
	const {
		register,
		handleSubmit,
		reset,
		formState: { isDirty, isSubmitting, errors },
	} = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

	async function createUserBook(data: FormSchema) {
		console.log(data);
		await fetch("http://localhost:3004/posts", {
			method: "POST",
			body: JSON.stringify({
				author: data.author,
				title: data.bookTitle,
				fullDescription: data.fullDescription,
				picture: selectedBook,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		});
	}
	const onSubmit: SubmitHandler<FormSchema> = (data) => {
		createUserBook(data);
		reset();
	};

	return (
		<form
			className=" md:w-2/3 w-11/12 h-auto bg-[#ffffff] rounded-xl p-5"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex flex-wrap justify-around gap-3">
				<div className="flex_center my-5 sm:w-[400px] w-[300px]">
					{errors.author ? (
						<span role="alert" className="error mb-2">
							{errors.author?.message}
						</span>
					) : (
						<label htmlFor="author" className="label_form mb-2">
							Имя автора
						</label>
					)}
					<input
						{...register("author")}
						type="text"
						id="author"
						placeholder="Имя автора"
						aria-invalid={errors.author ? "true" : "false"}
						className="input_form"
					/>
				</div>
				<div className="flex_center my-5 sm:w-[400px] w-[300px]">
					{errors.bookTitle ? (
						<span role="alert" className="error mb-2">
							{errors.bookTitle?.message}
						</span>
					) : (
						<label htmlFor="bookTitle" className="label_form mb-2">
							Название книги
						</label>
					)}
					<input
						{...register("bookTitle")}
						type="text"
						id="bookTitle"
						placeholder="Название книги"
						className="input_form"
						aria-invalid={errors.bookTitle ? "true" : "false"}
					/>
				</div>
			</div>

			<div>
				{errors.fullDescription ? (
					<span role="alert" className="error mb-2">
						{errors.fullDescription?.message}
					</span>
				) : (
					<label htmlFor="fullDescription" className="label_form mb-2">
						Краткое описание или краткое содержание книги:
					</label>
				)}

				<textarea
					{...register("fullDescription")}
					className="input_form  h-[200px]"
					id="fullDescription"
					aria-invalid={errors.bookTitle ? "true" : "false"}
				/>
			</div>
			<div className="mt-5">
				<label htmlFor="picture" className="label_form mb-2">
					Выберите обложку
				</label>
				<select
					id="picture"
					value={selectedBook}
					className="input_form"
					onChange={(e) => setSelectedBook(e.target.value)}
				>
					<option value="/pictures/books/book1.jpg">Обложка №1</option>
					<option value="/pictures/books/book2.jpg">Обложка №2</option>
					<option value="/pictures/books/book3.jpg">Обложка №3</option>
				</select>
			</div>
			<div className="my-10 flex justify-center items-center gap-5 flex-wrap ">
				<button
					type="submit"
					className="btn_form btn_primary"
					disabled={!isDirty || isSubmitting}
				>
					Добавить книгу
				</button>
				<button
					type="button"
					className="btn_form btn-error"
					disabled={!isDirty || isSubmitting}
					onClick={() => reset()}
				>
					Очистить поля
				</button>
			</div>
		</form>
	);
}
