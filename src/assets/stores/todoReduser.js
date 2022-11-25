import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
	name: "todo",
	initialState: {
		dropItem: {},
	},
	reducers: {
		dragTodo(state, actions) {
			state.dropItem = actions.payload;
		},
	},
});

export default todoSlice.reducer;
export const { createTodo, dragTodo } = todoSlice.actions;
