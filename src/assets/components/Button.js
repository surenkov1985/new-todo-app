import React from "react";

export default function Button({classList, text, onClick}) {

	return (
		<button className={classList.join(" ")} onClick={onClick}>{text}</button>
	)
}