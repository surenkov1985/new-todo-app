import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiPlus } from "react-icons/hi";
import { cardDataUpdate } from "../stores/firebaseReducer";
import { useForm } from "react-hook-form";
// import {inputText} from "../stores/actions";

export default function Create({ modalOpen }) {
	const [isCreateCard, setIsCreateCard] = useState(false);
	const dispatch = useDispatch();
	const { cardData } = useSelector((state) => state.firebase);
	const [val, setVal] = useState("");
	const { handleSubmit, register, setValue } = useForm({ mode: "all" });
	// const val = useSelector(state => {
	// 	const { createItemReducer } = state;

	// 	return createItemReducer.text;
	// });
	// const val = null;


	function onKeyPress(e) {
		if (e.key === "Enter" && val) {
			e.preventDefault();
			const data = {};
			data[e.target.name] = val;
			setValue(e.target.name, "");
			setVal("");
			return handleSubmit(formSubmit(data));
		}
	}
	const formSubmit = (data) => {
		setIsCreateCard(false);
		setVal("");
		dispatch(cardDataUpdate(data));
	};

	function onHandler(e) {
		dispatch(cardDataUpdate());
	}

	return (
		<form className="todo__create-form" onSubmit={handleSubmit(formSubmit)}>
			<div className="todo__create-container">
				{!isCreateCard ? (
					<div
						className="todo__form-btn"
						onClick={() => {
							setIsCreateCard(true);
							setVal("");
							// modalOpen();
						}}
					>
						<span>
							<HiPlus />
						</span>
						<span>Добавить задачу</span>
					</div>
				) : (
					<label className="todo__create-label">
						<textarea
							autoFocus
							className="todo__input"
							placeholder="Введите название"
							rows="2"
							name="title"
							value={val}
							{...register("title", {
								defaultValue: val,
								onChange: (e) => {
									setVal(e.target.value);
								},
							})}
							onKeyPress={(e) => onKeyPress(e)}
							onBlur={() => {
								// setIsCreateCard(false);
							}}
						/>
						<button
							className="todo__form-btn"
							onClick={(e) => {
								e.preventDefault()
								setIsCreateCard(false);
							}}
						>
							Создать
						</button>
					</label>
				)}
			</div>
		</form>
	);
}
{
	/* <input type="checkbox" className="todo__check" checked={checked} onChange={onCheck}/> */
}
{
	/* <div className="todo__false-check">
					<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg>
				</div> */
}
