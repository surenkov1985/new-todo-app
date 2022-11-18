import React, { useEffect, useState } from "react";
import Create from "../components/Create";
import { getDatabase, ref, set, onValue, push, query } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { useList } from "react-firebase-hooks/database";

export const ContentPage = () => {
	const { app, auth, cardData } = useSelector((state) => state.firebase);
	const [user] = useAuthState(auth);
	const [data, setData] = useState(null);
	// const data = null;
	// const { cardData } = useSelector((state) => state.firebase);

	const database = getDatabase(app);
	const todosList = ref(database, "todos");

	const [snapshots, loading, error] = useList(todosList);

	const setCard = (data) => {
		const newTodo = push(todosList);
		set(newTodo, {
			...data,
		});
	};

	useEffect(() => {
		if (cardData) {
			setCard(cardData);
		}
	}, [cardData]);

	useEffect(() => {
		const todosBase = ref(database, "todos");
		setData(query(todosBase));
	}, []);

	console.log(snapshots, 111);
	return (
		<div className="todo__main">
			<div className="todo__create">
				{snapshots &&
					snapshots.map((item) => {
						console.log(item.val());
						return (
							<article key={item.key}>
								<h2>{item.val().title}</h2>
							</article>
						);
					})}
				<Create />
			</div>
			{/* <button onClick={setCard}>ok</button> */}
			{/* <div className="todo__foot">Drag and drop to reorder list</div> */}
		</div>
	);
};

{
	/* <div className="todo__content"> */
}
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
