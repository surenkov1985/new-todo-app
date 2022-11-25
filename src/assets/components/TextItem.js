import React, { useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

export const TextInput = ({ title, name, keyHandler, text }) => {
	const [val, setVal] = useState();
	const [titleVal, setTitleVal] = useState()
	const [isValue, setIsValue] = useState(false);
	const textRef = useRef(null);

	useEffect(() => {
		if (text) {
			setVal(text);
			setIsValue(true);
		} 
		if (title) {
			setTitleVal(title);
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
				<>
					{title && (
						<div className="modal__title-control">
							<h2 className="modal__title">{titleVal}</h2>
							<button
								className="modal__title-btn"
								onClick={() => {
									setIsValue(!isValue);
								}}
							>
								<AiFillEdit color="#97969B" size={20} />
							</button>
						</div>
					)}
					{text && (
						<div className="modal__title-control">
							<p className="modal__text">{val}</p>
							
						</div>
					)}
				</>
			) : (
				<div className="modal__title-control">
					<textarea
						className="modal__input"
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
