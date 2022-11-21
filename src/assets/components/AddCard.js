import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { cardDataUpdate } from "../stores/firebaseReducer";
import { GrClose } from "react-icons/gr";
import { getDatabase, ref, push, set, update } from "firebase/database";

export const AddCard = ({ obj, closeModal }) => {
	const { app, auth, cardData } = useSelector((state) => state.firebase);
	const database = getDatabase(app);
	const todosList = ref(database, "todos");
	const { handleSubmit, register } = useForm();
	const dispatch = useDispatch();

	const [file, setFile] = useState();
	const [formData, setFormdata] = useState();

	useEffect(() => {
		console.log(file);
		if (file) {
			if (!obj) {
				console.log(111);
				const todoData = { ...formData, file: file };
				console.log(todoData, formData);
				const todoList = ref(database, "todos");
				const newTodo = push(todoList);
				set(newTodo, {
					...todoData,
				});
			} else {
				// update(ref(database, "todos/" + obj.key), {
				// });
			}
			closeModal();
		}
	}, [file]);

	const formSubmit = (data) => {
		console.log(data);
		let reader = new FileReader();
		reader.readAsDataURL(data.file[0]);
		reader.onload = () => {
			setFile(reader.result);
		}
		setFormdata(data);
	};

	return (
		<div className="modal">
			<div className="modal__container">
				<form className="modal__form" encType="multipart/form-data" onSubmit={handleSubmit(formSubmit)}>
					<h2></h2>
					<label className="modal__label">
						<span className="modal__label-title">{obj ? obj.val().title : "Название"}</span>
						{!obj && <textarea className="modal__input" rows={2} placeholder="Добавьте название..." {...register("title")} />}
					</label>
					<label className="modal__label">
						<span className="modal__label-title">Подробности</span>
						{!obj ? (
							<textarea className="modal__input" rows={2} placeholder="Добавьте описание..." {...register("description")} />
						) : (
							<p>{obj.val().description}</p>
						)}
					</label>

					{!obj ? (
						<label className="modal__label">
							<span className="modal__label-title">Прикрепить файл</span>
							<input type="file" className="modal__input" rows={2} placeholder="Добавьте файл" {...register("file")} />
						</label>
					) : (
						<img src={obj.val().file} alt="" />
					)}

					{!obj ? (
						<button className="modal__btn">Добавить чек-лист</button>
					) : (
						<div>
							{obj.val().checkList?.map((item) => {
								return <div>{item}</div>;
							})}
						</div>
					)}

					<input className="modal__btn" type="submit" value={!obj ? "Добавить" : "Редактировать"} />
				</form>
				{/* {file && <img src={file} />} */}
				<button className="modal__close" onClick={(e) => closeModal()}>
					<GrClose size={20} />
				</button>
			</div>
		</div>
	);
};
