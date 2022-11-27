import React from "react";

/**
 * Компонент React, добавляет файл в зависимости от типа
 *
 * @component
 * @param {string} file url или текст файла
 * @param {string} type тип файла
 */

export const FileElem = ({ file, type }) => {
	return (
		<>
			{type === "image" && <img src={file} alt="image" />}
			{type === "application" && <iframe src={file} width="100%" />}
			{type === "text" && <p>{file}</p>}
			{type === "audio" && <audio controls src={file} />}
			{type === "video" && <video controls src={file} />}
		</>
	);
};
