import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Header } from "./Header";
import { Context } from "../..";

/**
 * Индексный компонент, проверяет авторизован ли пользователь, преренаправляет на страницы авторизации/записей todo
 *
 * @component
 *
 */

export const Layout = () => {
	const { auth } = useContext(Context);
	const navigate = useNavigate();

	const [user] = useAuthState(auth);

	useEffect(() => {
		if (user) {
			navigate("content");
		} else {
			navigate("login");
		}
	}, [user]);

	return (
		<div className="container">
			<div className="background" />
			<Header />
			<div className="container__todo todo">
				<Outlet />
			</div>
		</div>
	);
};
