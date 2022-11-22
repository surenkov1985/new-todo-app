import {createSlice} from "@reduxjs/toolkit"

export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todoData: {}
    },
    reducers: {
        createTodo(state,actions) {
            state.todoData = {...state.todoData, ...actions.payload}
        }
    }
})

export default todoSlice.reducer
export const {createTodo} = todoSlice.actions