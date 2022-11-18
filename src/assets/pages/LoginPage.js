import React from "react";
import Button from "../components/Button";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";

export const LoginPage = () => {
	const { app, auth } = useSelector((state) => state.firebase);
	const [signInWithGoogle] = useSignInWithGoogle(auth);

	return (
		<div className="login">
			<div className="login__block">
				<Button classList={["login__btn"]} text="Войти с помощью Google" onClick={() => signInWithGoogle()} />
			</div>
		</div>
	);
};
