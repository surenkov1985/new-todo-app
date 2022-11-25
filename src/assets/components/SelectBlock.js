import classNames from "classnames";
import React, { useState } from "react";

export const SelectBlock = ({state, states , clickHandler}) => {

    const [stateClass, setStateClass] = useState("");

    return (
		<div className="modal__title-control">
			<span>В колонке</span>
			<button
				className="modal__state-btn"
				onClick={() => {
					setStateClass("active");
				}}
			>
				{state}
			</button>
			<ul className={classNames("modal__select", stateClass)}>
				{states.map(([key, res]) => {
					return (
						<li
							className="modal__option"
							key={key}
							onClick={() => {
								clickHandler("state", res.state);
								setStateClass("");
							}}
						>
							{res.state}
						</li>
					);
				})}
			</ul>
		</div>
	);
}