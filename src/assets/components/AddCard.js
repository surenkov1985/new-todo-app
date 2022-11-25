import React, { useContext, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { getDatabase, ref, push, set, update, remove, onValue } from "firebase/database";
import uniqid from "uniqid";
import { TextInput } from "./TextItem";
import { FileInput } from "./FileItem";
import { DateInput} from "./DateInput";
import { SelectBlock } from "./SelectBlock";
import { ClickItem } from "./CheckItem";
import { InputBlock } from "./InputItem";
import { ListCreate } from "./ListCreate";
import { Context } from "../..";

export const AddCard = ({ obj, closeModal, states }) => {
	const { app } = useContext(Context)

	const database = getDatabase(app);
	const todosList = ref(database, "todos/" + obj[0]);

	const [todo, setTodo] = useState();
	const [pushData, setPushData] = useState(null);
	const [error, setError] = useState("");
	const [isCreate, setIsCreate] = useState(false)

	useEffect(() => {
		onValue(todosList, (snapshot) => {
			setTodo(snapshot.val());
		});
	}, []);

	const pushList = (value) => {
		let pushData = { id: uniqid(), checked: false, completed: "", text: value };
		const newTodoList = ref(database, `todos/${obj[0]}/list`);
		const newList = push(newTodoList);
		set(newList, {
			...pushData,
		});
	};

	const checkedList = (e, id, checked) => {
		update(ref(database, `todos/${obj[0]}/list/` + id), {
			...{ checked: !checked },
		});
	};

	const removeList = (id) => {
		remove(ref(database, `todos/${obj[0]}/list/` + id));
	};

	const fileRead = (file) => {
		let type = file.type;
		const reader = new FileReader();

		if (type === "text/html" || type === "text/css" || type === "text/javascript") {
			setError("Данный формат файлов не поддерживается");
			setTimeout(() => {
				setError("");
			}, 1500);
			return;
		}

		type = type.replace(/\/.+/, "");
		if (type === "application" && file.type !== "application/pdf") {
			setError("Данный формат файлов не поддерживается");
			setTimeout(() => {
				setError("");
			}, 1500);
			return;
		}
		if (type === "text") {
			reader.readAsText(file, "windows-1251");
		} else {
			reader.readAsDataURL(file);
		}

		reader.onload = () => {
			setPushData({ file: reader.result, fileType: type });
		};
	};

	const pushTodo = (name, value) => {
		let pushData = {};
		if (name === "file") {
			fileRead(value);
		} else {
			pushData[name] = value ? value : "";
			setPushData(pushData);
		}
	};

	useEffect(() => {
		if (pushData) {
			update(ref(database, "todos/" + obj[0]), {
				...pushData,
			}).then(() => {
				setPushData(null);
			});
		}
	}, [pushData]);

	return (
		<div className="modal">
			<div
				className="modal__container"
				onDrop={(e) => {
					e.preventDefault();
					pushTodo("file", e.dataTransfer.files[0]);
				}}
			>
				<div className="modal__form-container">
					{todo && (
						<div className="modal__form">
							<TextInput title={todo.title} name="title" keyHandler={pushTodo} />

							<SelectBlock state={todo.state} states={states} clickHandler={pushTodo} />

							<TextInput text={todo.description} name="description" keyHandler={pushTodo} title="Описание" />

							<DateInput timestamp={todo.time} clickHandler={pushTodo} title="Дата Завершения" />
							<h3 className="modal__label-title">Вложение</h3>
							<FileInput value={todo.file} name="file" checkHandler={pushTodo} type={todo.fileType} />

							<label className="modal__label">
								<InputBlock
									value={todo.checkListName}
									name="checkListName"
									defaultValue="Чек-лист"
									pushHandler={pushTodo}
									listCreate={setIsCreate}
								/>
								{isCreate && <ListCreate listCreate={setIsCreate} pushListHandler={pushList} />}
							</label>

							<div className="modal__label">
								{todo.list &&
									Object.entries(todo.list).map(([key, item]) => {
										return (
											<ClickItem
												key={key}
												id={key}
												checked={item.checked}
												text={item.text}
												checkHandler={checkedList}
												removeHandler={removeList}
											/>
										);
									})}
							</div>
						</div>
					)}
				</div>
				{error && <div className="modal__error">{error}</div>}
				<button className="modal__close" onClick={(e) => closeModal()}>
					<GrClose size={20} color="#ff0000" />
				</button>
			</div>
		</div>
	);
};
