import React, { useEffect, useState } from "react";
import { FileElem } from "./FileElem";

/**
 * Компонент React, добавляет/изменяет файл в базе данных, выводит файл или инпут в зависимости от того был добавлен файл в БД или нет
 * 
 * @component
 * @param {string} value url или текст файла
 * @param {string} name значение name инпута
 * @param {void} checkHandler функция обработки выбранного файла
 * @param {string} type тип файла(если он записан в БД)
 */

export const FileInput = ({ value, name, checkHandler, type }) => {
	const [file, setFile] = useState();
	const [isValue, setIsValue] = useState(false);

	useEffect(() => {
		if (value) {
			setFile(value);
			setIsValue(true);
		} else {
			setIsValue(false);
		}
	}, [value]);

	return (
		<>
			{!isValue && (
				<label className="modal__label">
					<span>Выберите файл или перетащите файл на карточку</span>
					<input
						type="file"
						className="modal__input"
						placeholder="Добавьте файл"
						name={name}
						onChange={(e) => {
							checkHandler(name, e.target.files[0]);
							setIsValue(!isValue);
						}}
					/>
				</label>
			)}
			{isValue && <FileElem file={file} type={type} />}
		</>
	);
};
