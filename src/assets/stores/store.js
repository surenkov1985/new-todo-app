import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import firebaseReducer from "./firebaseReducer";
import themeReducer from "./themeReducer";
import todoReduser from "./todoReduser";

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		firebase: firebaseReducer,
		todo: todoReduser
	},
});
