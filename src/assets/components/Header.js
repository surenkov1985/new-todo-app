import React, { useContext } from "react";
import Button from "./Button";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Context } from "../..";

/**
 * Компонент React, header. Проверяет авторизван ли пользователь, выводит кновку "войти"/"выйти"
 * 
 * @component
 */

export const Header = () => {
	const {auth} = useContext(Context)
	const [signOut] = useSignOut(auth);
	const [user] = useAuthState(auth);


	return (
		<div className="todo__head">
			<div className="todo__title">
				<h1>TODO</h1>
			</div>
			<div className="todo__head-control">
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
