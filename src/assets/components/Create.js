import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { useForm } from "react-hook-form";

/**
 * Компонент React, используется для передачи данных для создания новой карточки или колонки в базе данных
 *
 * @component
 * @param {string} createText текст кнопки
 * @param {void} createHandler функция добавляющая новую запись в базу данных
 * @param {string} name имя инпута
 * @param {string} [state] название колонки(статус задачи)
 */

export const Create = ({ createText, createHandler, name, state }) => {
	const [isCreateCard, setIsCreateCard] = useState(false);
	const [val, setVal] = useState("");
	const { handleSubmit, register, setValue } = useForm({ mode: "all" });

	/**
	 * Обработка события нажатия клавиши Enter в инпуте
	 * @param {React.BaseSyntheticEvent} e
	 *
	 */

	function onKeyPress(e) {
		if (e.key === "Enter" && val) {
			e.preventDefault();
			const data = {};
			data[e.target.name] = val;
			setValue(e.target.name, "");
			setVal("");
			return handleSubmit(formSubmit(data));
		}
	}

	/**
	 * Отправка данных из формы
	 *
	 */
	const formSubmit = (data) => {
		setIsCreateCard(false);
		setVal("");
		createHandler(data, state);
	};

	return (
		<form className="todo__create-form" onSubmit={handleSubmit(formSubmit)}>
			<div className="todo__create-container">
				{!isCreateCard ? (
					<div
						className="todo__form-btn"
						onClick={() => {
							setIsCreateCard(true);
							setVal("");
						}}
					>
						<span>
							<HiPlus />
						</span>
						<span>{createText}</span>
					</div>
				) : (
					<label className="todo__create-label">
						<textarea
							autoFocus
							className="todo__input"
							placeholder="Введите название"
							rows="2"
							name="title"
							value={val}
							{...register(name, {
								defaultValue: val,
								onChange: (e) => {
									setVal(e.target.value);
								},
							})}
							onKeyPress={(e) => onKeyPress(e)}
						/>
						<button
							className="todo__form-btn"
							onClick={(e) => {
								e.preventDefault();
								setIsCreateCard(false);
							}}
						>
							Создать
						</button>
					</label>
				)}
			</div>
		</form>
	);
}
