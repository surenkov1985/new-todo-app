import React, { useState } from "react";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";

/**
 * Компонент React, добавляет/редактирует название чек-листа
 *
 * @component
 * @param {string} value название чек-листа если оно было добавлено
 * @param {string} name поле name инпута
 * @param {string} defaultValue дефолтное название чек-листа
 * @param {void} pushHandler функция, добавляющая/меняющее название чек-листа в БД
 * @param {void} listCreate функция включающая компонент для добавления записей чек-листа
 */

export const InputBlock = ({ value, name, defaultValue, pushHandler, listCreate }) => {
	const [isValue, setIsValue] = useState(false);
	const [val, setVal] = useState(value ? value : defaultValue);

	return (
		<>
			{value ? (
				<div className="modal__title-control">
					<h2 className="modal__title">{value}</h2>

					<button
						className="modal__title-btn"
						onClick={(e) => {
							setIsValue(!isValue);
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
								listCreate(true);
							}}
						/>
					</button>
				</div>
			) : (
				<button
					className="modal__btn"
					onClick={(e) => {
						e.preventDefault();
						setIsValue(!isValue);
					}}
				>
					Добавить чек-лист
				</button>
			)}
			{isValue && (
				<label className="modal__label-checkname">
					<input
						type="text"
						className="modal__input"
						defaultValue={defaultValue}
						autoFocus={true}
						name={name}
						value={val}
						onChange={(e) => {
							setVal(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								pushHandler(name, val);
								setIsValue(!isValue);
								listCreate(true);
							}
						}}
					/>
					<button
						className="modal__btn"
						onClick={(e) => {
							e.preventDefault();
							pushHandler(name, val);
							setIsValue(!isValue);
							listCreate(true);
						}}
					>
						Добавить
					</button>
				</label>
			)}
		</>
	);
};
