import React, { useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

export const TextInput = ({ title, name, keyHandler, text }) => {
	const [val, setVal] = useState();
	const [isValue, setIsValue] = useState(false);
	const textRef = useRef(null);

	console.log(isValue);

	useEffect(() => {
		if (text) {
			setVal(text);
			setIsValue(true);
		} else if (!text && title) {
			setVal(title);
			setIsValue(true);
		}
	}, [title, text]);

	useEffect(() => {
		if (textRef.current) {
			textRef.current.selectionStart = val?.length;
		}
	}, [isValue]);

	return (
		<label className="modal__label">
			{isValue ? (
				<div className="modal__title-control">
					{title && (
						<>
							<h2 className="modal__title">{val}</h2>
							<button
								className="modal__title-btn"
								onClick={() => {
									// setVal(val);
									setIsValue(!isValue);
								}}
							>
								<AiFillEdit color="#97969B" size={20} />
							</button>
						</>
					)}
					{text && (
						<>
							<p className="modal__text">{val}</p>
							<button
								className="modal__title-btn"
								onClick={() => {
									// setVal(val);
									setIsValue(!isValue);
								}}
							>
								<AiFillEdit color="#97969B" size={20} />
							</button>
						</>
					)}
				</div>
			) : (
				<div className="modal__title-control">
					<textarea
						className="modal__input"
						// rows={2}
						placeholder="Добавьте название..."
						name={name}
						value={val}
						ref={textRef}
						onChange={(e) => setVal(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								keyHandler(name, val);
								setIsValue(!isValue);
							}
						}}
					/>
					<button
						className="modal__btn"
						onClick={() => {
							keyHandler(name, val);
							setIsValue(true);
						}}
					>
						ok
					</button>
				</div>
			)}
		</label>
	);
};
