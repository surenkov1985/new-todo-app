import React from "react";
import { BsCheck } from "react-icons/bs";
import { GrClose } from "react-icons/gr";

/**
 * Компонент React, записть в чек листе
 * 
 * @component
 * @param {boolean} checked статус записи(выполнена/не выполнена)
 * @param {void} checkHandler обработчик события клика, изменяет статус записи
 * @param {string} text текст записи
 * @param {void} removeHandler функция удаления записи из базы данных
 * @param {string} id идентификатор записи
 */

export const ClickItem = ({checked, checkHandler, text, removeHandler, id}) => {

    return (
		<div className="modal__list">
			<label className="todo__create-container">
				<input type="checkbox" className="todo__check" checked={checked} onChange={(e) => checkHandler(e, id, checked)} />
				<div className="todo__false-check">
                    <BsCheck size={15} color="#FFFFFF" strokeWidth={1}/>
				</div>
				<div className="todo__text">{text}</div>
				<button
					className="modal__delete-btn"
					onClick={(e) => {
						removeHandler(id);
					}}
				>
					<GrClose size={18} color="#ff0000" />
				</button>
			</label>
		</div>
	);
}