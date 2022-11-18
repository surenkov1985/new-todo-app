import React from "react";
import { themeToggle } from "../stores/themeReducer";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import Button from "./Button";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {
	const { theme } = useSelector((state) => state.theme);
	const dispatch = useDispatch()
	const { app, auth } = useSelector((state) => state.firebase);
	const [signOut] = useSignOut(auth);
	const [user] = useAuthState(auth);

	function buttonHandler() {
		document.body.classList.toggle("dark");
		dispatch(themeToggle());
	}

	return (
		<div className="todo__head">
			<div className="todo__title">
				<h1>TODO</h1>
			</div>
			<div className="todo__head-control">
				<Button
					classList={["todo__theme-btn"]}
					text={theme === "light" ? <BsMoonFill size={26} color="#FFFFFF" /> : <BsSunFill size={26} color="#FFFFFF" />}
					onClick={() => {
						buttonHandler();
					}}
				/>
				{user ? (
					<>
						<Button classList={["todo__link"]} text="Выйти" onClick={() => signOut()} />
						<div style={{ width: "26px" }}>
							<img src={user.photoURL} alt="userPhoto" />
						</div>
					</>
				) : (
					<Button classList={["todo__link"]} text="Войти" />
				)}
			</div>
		</div>
	);
};
