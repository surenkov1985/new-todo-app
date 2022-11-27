import classNames from "classnames";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import "dayjs/locale/ru";

/**
 * Компонент React, преобразует время в миллисекундах в дату в текстовом формате, отсчитывает оставшееся время до завершения
 *
 * @component
 * @param {number} time
 */

export const DateString = ({ time }) => {
	const [timeStyle, setTimeStyle] = useState("");
	const [inputTime, setInputTime] = useState();

	/**
	 * Преобразование времени в строку
	 */
	useEffect(() => {
		if (time) {
			setInputTime(dayjs(time).locale("ru").format("DD MMM YYYY HH:mm"));
		}
	}, [time]);

	/**
	 * Отсчет времени до окончания срока выполнения задачи
	 */

	useEffect(() => {
		if (inputTime) {
			let int = setInterval(() => {
				let nowDate = dayjs().valueOf();
				let diffTime = 0;
				if (time > nowDate) {
					diffTime = time - nowDate;
				}

				if (diffTime <= 1000) {
					clearInterval(int);
					setTimeStyle("over");
				} else setTimeStyle("");
			}, 1000);
		}
	}, [inputTime]);

	return <div className={classNames("modal__time", timeStyle)}>{inputTime}</div>;
};
