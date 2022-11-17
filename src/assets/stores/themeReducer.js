import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
	name: "theme",
	initialState: {
		theme: "light",
	},
	reducers: {
		themeToggle(state) {
			if (state.theme == "light") {
				state.theme = "dark";
			} else {
				state.theme = "light";
			}
		},
	},
});

export const { themeToggle } = themeSlice.actions;
export default themeSlice.reducer;
