import React, { useContext } from "react";
import Button from "../components/Button";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Context } from "../..";

export const LoginPage = () => {
	const { auth } = useContext(Context);
	const [signInWithGoogle] = useSignInWithGoogle(auth);

	return (
		<div className="login">
			<div className="login__block">
				<Button classList={["login__btn"]} text="Войти с помощью Google" onClick={() => signInWithGoogle()} />
			</div>
		</div>
	);
};
