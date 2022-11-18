import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { LoginPage } from "../pages/LoginPage";
import { ContentPage } from "../pages/ContentPage";

export const App = () => {
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
