import React, { useState } from "react";

export const useFileReader = () => {
	const [newData, setNewData] = useState({});

	const setDataFile = (data) => {
		const reader = new FileReader();
		reader.readAsDataURL(data.file[0]);
		reader.onload = () => {
			setNewData({ ...data, file: reader.result });
		};
	};

    return {setDataFile, newData}
};
