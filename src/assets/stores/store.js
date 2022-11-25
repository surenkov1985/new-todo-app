import { configureStore } from "@reduxjs/toolkit";
import todoReduser from "./todoReduser";

export const store = configureStore({
	reducer: {
		todo: todoReduser
	},
});
