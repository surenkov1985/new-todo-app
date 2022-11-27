import React from "react";
import { TiDelete } from "react-icons/ti";
import { BsUiChecks } from "react-icons/bs";
import { DateString } from "../components/DateString";
import { FileElem } from "./FileElem";
import { useDispatch } from "react-redux";
import { dragTodo } from "../stores/todoReduser";

/**
 * Компонент React, todo карточка, отображаемая в колонке
 * 
 * @component
 * @param {object} data данные из базы данных
 * @param {void} deleteCard функция, удаляет карточку из БД
 * @param {void} cardClick функция октрывающая модальное окно для редактирования карточки
 * @param {string} id идентификатор карточки
 */

export const TodoCard = ({ data, deleteCard, cardClick, id }) => {
	const dispatch = useDispatch();

	/**
	 * Начало перемещения карточки между колонками, запись в redux данных перемещаемой карточки
	 *
	 * @param {object} data данные карточки
	 * @param {string} id идентификатор карточки
	 */

	const dragStartHandler = (data, id) => {
		dispatch(dragTodo({ data, id }));
	};
	return (
		<article className="todo__card card" onClick={() => cardClick([id, data])} onDragStart={(e) => dragStartHandler(data, id)} draggable>
			<h2 className="card__title">{data.title}</h2>
			<div className="card__description">
				<p className="todo__text">{data.description}</p>
			</div>
			<div className="todo__time-container">{data.time && <DateString time={data.time} />}</div>
			<div className="card__file">
				<FileElem file={data.file} type={data.fileType} />
			</div>
			<div className="card__icons">{data.list && <BsUiChecks />}</div>

			<button className="card__delete">
				<TiDelete
					color="#ff0000"
					size={20}
					onClick={(e) => {
						deleteCard(e, id);
					}}
				/>
			</button>
		</article>
	);
};
