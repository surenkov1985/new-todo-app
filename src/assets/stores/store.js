import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import firebaseReducer from "./firebaseReducer";
import themeReducer from "./themeReducer";

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		firebase: firebaseReducer
	},
});
