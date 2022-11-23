import React, { useEffect, useState } from "react";

export const FileInput = ({ value, name, checkHandler }) => {
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
					<input
						type="file"
						className="modal__input"
						rows={2}
						placeholder="Добавьте файл"
						name={name}
						onChange={(e) => {
							console.log(e.target.files);
							checkHandler(name, e.target.files[0]);
							setIsValue(!isValue);
						}}
					/>
				</label>
			)}
			{isValue && <img src={file} alt="" />}
		</>
	);
	// } else {
	// 	return <img src={file} alt="" />;
	// }
};
