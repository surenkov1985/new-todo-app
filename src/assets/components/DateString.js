import classNames from "classnames";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import "dayjs/locale/ru";

export const DateString = ({ time }) => {
	const [timeStyle, setTimeStyle] = useState("");
	const [inputTime, setInputTime] = useState();

	useEffect(() => {
		if (time) {
			setInputTime(dayjs(time).locale("ru").format("DD MMM YYYY HH:mm"));
		}
	}, [time]);

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
