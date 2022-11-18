import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Header } from "./Header";
import { useSelector } from "react-redux";

export const Layout = () => {
	const { app, auth } = useSelector((state) => state.firebase);
	const navigate = useNavigate();

	const [user] = useAuthState(auth);
	// console.log(user, auth);

	useEffect(() => {
		if (user) {
			navigate("content");
		} else {
			navigate("login");
		}
	}, [user]);

	return (
		<div className="container">
			<div className="background" />
			<Header />
			<div className="container__todo todo">
				<Outlet />
			</div>
		</div>
	);
};
// {/* <div className="todo__main"> */}
// 						{/* <div className="todo__create">
// 							{/* <Create createTodo={createTodo} onCheck={onCheck} checked={checked} /> */}
// 						</div>

// 						<div className="todo__content">
// 							{/* <TodoList classList="todo__item" data={data} category={category} onCheck={onItemCheck} deleteItem={deleteItem} /> */}
// 							<div className="todo__control">
// 								{/* <div className="todo__numb">{numbItems} items left</div> */}
// 								<div className="todo__sort">
// 									<Button classList={["todo__sort-all", "btn", onAllCategory]} text="All" onClick={setDataAll} />
// 									<Button classList={["todo__sort-active", "btn", onActiveCategory]} text="Active" onClick={setDataActive} />
// 									<Button
// 										classList={["todo__sort-completed", "btn", onCompletedCategory]}
// 										text="Completed"
// 										onClick={setDataCompleted}
// 									/>
// 								</div>
// 								<div className="todo__clear">
// 									<Button classList={["todo__clear-btn", "btn"]} text="Clear completed" onClick={clearCompletedItems} />
// 								</div>
// 							</div>
// 						</div>
// 						<div className="todo__control-false">
// 							<div className="todo__sort-false">
// 								<Button classList={["todo__sort-all", "btn", onAllCategory]} text="All" onClick={setDataAll} />
// 								<Button classList={["todo__sort-active", "btn", onActiveCategory]} text="Active" onClick={setDataActive} />
// 								<Button
// 									classList={["todo__sort-completed", "btn", onCompletedCategory]}
// 									text="Completed"
// 									onClick={setDataCompleted}
// 								/>
// 							</div>
// 						</div>
// 					</div>

// 					<div className="todo__foot">Drag and drop to reorder list</div> */}
