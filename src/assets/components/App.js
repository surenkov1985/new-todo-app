import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { LoginPage } from "../pages/LoginPage";
import { ContentPage } from "../pages/ContentPage";

export const App = () => {

	useEffect(()=>{
		document.addEventListener("dragover", (e)=>{e.preventDefault()})
		document.body.addEventListener("drop", (e) => {
			e.preventDefault();
		});
	},[])

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="login" element={<LoginPage />} />
					<Route path="content" element={<ContentPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
