import React, { useEffect, useState } from "react";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { getDatabase, ref, push, set, update, remove } from "firebase/database";
import { useList } from "react-firebase-hooks/database";
import uniqid from "uniqid";
import { useSelector } from "react-redux";
import { TextInput } from "./TextItem";
import { FileInput } from "./FileItem";

export const AddCard = ({ obj, closeModal }) => {
	const { app } = useSelector((state) => state.firebase);

	const database = getDatabase(app);
	const todosList = ref(database, "todos");
	const [snapshots] = useList(todosList);

	const [isListName, setIsListName] = useState(false);
	const [isListCreate, setIsListCreate] = useState(false);
	const [checkList, setCheckList] = useState({});
	const [checkListName, setCheckListName] = useState(obj?.val().checkList?.checkListName || "");
	const [listVal, setListVal] = useState("");

	const [data, setData] = useState(snapshots.find((item) => item.key == obj.key));
	const [pushData, setPushData] = useState(null);

	function dateTime() {
		let date = new Date();
		return date.getTime();
	}

	const pushList = (value) => {
		let pushData = { id: uniqid(), checked: false, completed: "", text: value };
		const newTodoList = ref(database, `todos/${data.key}/list`);
		const newList = push(newTodoList);
		set(newList, {
			...pushData,
		});
	};

	const checkedList = (e, id, checked) => {
		update(ref(database, `todos/${data.key}/list/` + id), {
			...{ checked: !checked },
		});
	};

	const removeList = (id) => {
		remove(ref(database, `todos/${data.key}/list/` + id));
	};

	const pushTodo = (name, value) => {
		let pushData = {};
		if (name === "file") {
			const reader = new FileReader();
			reader.readAsDataURL(value);
			reader.onload = () => {
				setPushData({ file: reader.result });
			};
		} else {
			pushData[name] = value ? value : "";
			setPushData(pushData);
		}
	};

	useEffect(() => {
		if (pushData) {
			update(ref(database, "todos/" + data.key), {
				...pushData,
			}).then(() => {
				setPushData(null);
			});
		}
	}, [pushData]);

	useEffect(() => {
		if (snapshots.length) {
			console.log("reffff", dateTime());
			setData(snapshots.find((item) => item.key === obj?.key));
		}
	}, [snapshots]);

	return (
		<div className="modal">
			<div className="modal__container">
				<div className="modal__form-container">
					<div className="modal__form">
						<TextInput title={data?.val().title} name="title" keyHandler={pushTodo} />

						<h3 className="modal__label-title">Подробности</h3>
						<TextInput text={data?.val().description} name="description" keyHandler={pushTodo} />

						<h3 className="modal__label-title">Вложение</h3>

						<FileInput value={data?.val().file} name="file" checkHandler={pushTodo} />

						<label className="modal__label">
							{data?.val().checkListName ? (
								<div className="modal__title-control">
									<h3 className="modal__label-title">{data?.val()?.checkListName}</h3>

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
										placeholder="Чек-лист"
										defaultValue="Чек-лист"
										autoFocus={true}
										name="checkListName"
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												pushTodo(e.target.name, e.target.value);
												setIsListName(false);
												setIsListCreate(true);
											}
										}}
									/>
									<button
										className="modal__btn"
										onClick={(e) => {
											e.preventDefault();
											setIsListCreate(true);
											pushTodo(e.target.name, e.target.value);
											setCheckList({ ...checkList, checkListName: checkListName });
											setIsListName(false);
											setIsListCreate(true);
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
										autoFocus={true}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												//
												pushList(listVal);
												setListVal("");
											}
										}}
									/>
									<button
										className="modal__title-btn"
										onClick={(e) => {
											e.preventDefault();
											pushList(listVal);
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
						<div>
							{data?.val().list &&
								Object.entries(data?.val().list).map(([key, item]) => {
									console.log(item.key);
									return (
										<div
											className="modal__list"
											key={key}
										>
											<label className="todo__create-container">
												<input
													type="checkbox"
													className="todo__check"
													checked={item.checked}
													onChange={(e) => checkedList(e, key, item.checked)}
												/>
												<div className="todo__false-check">
													<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
														<path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" />
													</svg>
												</div>
												<div className="todo__text">{item.text}</div>
												<button
													className="modal__delete-btn"
													onClick={(e) => {
														removeList(key);
													}}
												>
													<GrClose size={18} color="#ff0000" />
												</button>
											</label>
										</div>
									);
								})}
						</div>
					</div>
				</div>
				<button className="modal__close" onClick={(e) => closeModal()}>
					<GrClose size={20} color="#ff0000" />
				</button>
			</div>
		</div>
	);
};
