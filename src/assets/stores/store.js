import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import themeReducer from "./themeReducer";

export const store = configureStore({
	reducer: {
		theme: themeReducer,
	},
});
