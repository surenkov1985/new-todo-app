import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import { cardDataUpdate } from "../stores/firebaseReducer";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { getDatabase, ref, push, set, update } from "firebase/database";
import { createTodo } from "../stores/todoReduser";
import { useFileReader } from "./hooks/fileReaderHook";

export const AddCard = ({ obj, closeModal }) => {
	const { app, auth, cardData } = useSelector((state) => state.firebase);
	const { todoData } = useSelector((state) => state.todo);
	const database = getDatabase(app);
	// const todosList = ref(database, "todos");
	const { handleSubmit, register } = useForm();
	const dispatch = useDispatch();
	const [isListName, setIsListName] = useState(false);
	const [isListCreate, setIsListCreate] = useState(false);
	const [checkList, setCheckList] = useState({});
	const [checkListName, setCheckListName] = useState(obj?.val().checkList?.checkListName || "");
	const [list, setList] = useState(obj?.val().list || []);
	const [listVal, setListVal] = useState("");

	const [isEdit, setIsEdit] = useState(false);

	const { newData, setDataFile } = useFileReader();

	useEffect(() => {
		if (list.length) {
			// dispatch(createTodo({checkList: {...checkList, list: list}}))
			update(ref(database, "todos/" + obj.key), {
				...{ ...todoData, list: list },
			}).then(() => {
				// setIsEdit(false);
				// closeModal();
			});
			// setIsEdit(true)
		}
	}, [list]);

	useEffect(() => {
		if (obj) {
			let values = obj.val();
			dispatch(createTodo(values));
		}
	}, []);

	useEffect(() => {
		if (newData.file) {
			dispatch(createTodo(newData));
			setIsEdit(true);
		}
	}, [newData]);

	useEffect(() => {
		if (isEdit) {
			if (!obj) {
				console.log(333);

				const todoList = ref(database, "todos");
				const newTodo = push(todoList);
				set(newTodo, {
					...todoData,
				}).then(() => {
					setIsEdit(false);
					closeModal();
				});
			} else {
				console.log("udate");
				update(ref(database, "todos/" + obj.key), {
					...todoData,
				}).then(() => {
					setIsEdit(false);
					closeModal();
				});
			}
		}
	}, [isEdit]);

	const formSubmit = (data) => {
		console.log(data);
		if (data.file[0]) {
			setDataFile(data);
		} else {
			dispatch(createTodo(data));
			setIsEdit(true);
		}
	};
	console.log(list);

	const listFormSubmit = (data) => {
		console.log(data);
	};

	return (
		<div className="modal">
			<div className="modal__container">
				<form className="modal__form" encType="multipart/form-data" onSubmit={handleSubmit(formSubmit)}>
					<h2></h2>
					<label className="modal__label">
						<div className="modal__title-control">
							<h2 className="modal__title">{obj?.val().title ? obj.val().title : "Название"}</h2>
							{obj?.val().title && (
								<button className="modal__title-btn">
									<AiFillEdit color="#97969B" size={20} />
								</button>
							)}
						</div>
						{!obj?.val().title && (
							<textarea className="modal__input" rows={2} placeholder="Добавьте название..." {...register("title")} />
						)}
					</label>
					<label className="modal__label">
						<div className="modal__title-control">
							<h3 className="modal__label-title">Подробности</h3>
							{obj?.val().description && (
								<button className="modal__title-btn">
									<AiFillEdit color="#97969B" size={20} />
								</button>
							)}
						</div>

						{!obj?.val().description ? (
							<textarea className="modal__input" rows={5} placeholder="Добавьте описание..." {...register("description")} />
						) : (
							<p>{obj?.val().description}</p>
						)}
					</label>

					{!obj?.val().file ? (
						<label className="modal__label">
							<span className="modal__label-title">Вложение</span>
							<input type="file" className="modal__input" rows={2} placeholder="Добавьте файл" {...register("file")} />
						</label>
					) : (
						<img src={obj.val().file} alt="" />
					)}

					<label className="modal__label">
						{obj?.val().checkListName ? (
							<div className="modal__title-control">
								<h3 className="modal__label-title">{obj?.val().checkListName}</h3>

								<button
									className="modal__title-btn"
									onClick={(e) => {
										e.preventDefault();
									}}
								>
									<AiFillEdit color="#97969B" size={20} />
								</button>
								<button
									className="modal__title-btn"
									onClick={(e) => {
										e.preventDefault();
									}}
								>
									<AiOutlinePlus
										color="#97969B"
										size={20}
										onClick={(e) => {
											e.preventDefault();
											setIsListCreate(true);
										}}
									/>
								</button>
							</div>
						) : (
							<button
								className="modal__btn"
								onClick={(e) => {
									e.preventDefault();
									setIsListName(!isListName);
								}}
							>
								Добавить список дел
							</button>
						)}
						{isListName && (
							<label className="modal__label-checkname">
								<input
									type="text"
									className="modal__input"
									placeholder="Название спискa..."
									{...register("checkListName", {
										value: checkListName,
										onChange: (e) => {
											setCheckListName(e.target.value);
										},
									})}
								/>
								<button
									className="modal__btn"
									onClick={(e) => {
										e.preventDefault();
										setIsListCreate(true);
										setCheckList({ ...checkList, checkListName: checkListName });
									}}
								>
									Добавить
								</button>
							</label>
						)}
						{isListCreate && (
							<label className="todo__create-container">
								<input
									type="text"
									className="todo__input"
									placeholder="Добавить запись"
									value={listVal}
									onChange={(e) => {
										setListVal(e.target.value);
									}}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											setList([...list, listVal]);
											setListVal("");
										}
									}}
								/>
								<button
									className="modal__title-btn"
									onClick={(e) => {
										e.preventDefault();
										setList([...list, listVal]);
										setListVal("");
									}}
								>
									<AiOutlinePlus color="#97969B" size={20} />
								</button>
								<button
									className="modal__title-btn"
									onClick={(e) => {
										e.preventDefault();
										setIsListCreate(false);
									}}
								>
									<GrClose color="#97969B" size={20} />
								</button>
							</label>
						)}
					</label>

					{/* <div>
						{obj?.val().list?.length &&
							obj?.val().list?.map((item, index) => {
								return <div key={index}>{item}</div>;
							})}
					</div> */}
					<div>
						{list.length &&
							list.map((item, index) => {
								return <div key={index}>{item}</div>;
							})}
					</div>

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
