import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { GrClose } from "react-icons/gr";

export const ListCreate = ({ pushListHandler, listCreate }) => {
	const [val, setVal] = useState("");

	return (
		<label className="todo__create-container">
			<input
				type="text"
				className="todo__input"
				placeholder="Добавить запись"
				value={val}
				onChange={(e) => {
					setVal(e.target.value);
				}}
				autoFocus={true}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						pushListHandler(val);
						setVal("");
					}
				}}
			/>
			<button
				className="modal__title-btn"
				onClick={(e) => {
					e.preventDefault();
					pushListHandler(val);
					setVal("");
				}}
			>
				<AiOutlinePlus color="#97969B" size={20} />
			</button>
			<button
				className="modal__title-btn"
				onClick={(e) => {
					e.preventDefault();
					listCreate(false);
				}}
			>
				<GrClose color="#97969B" size={20} />
			</button>
		</label>
	);
};
