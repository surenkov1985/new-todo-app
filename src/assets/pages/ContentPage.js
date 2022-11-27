import React, { useContext, useEffect, useState } from "react";
import {Create} from "../components/Create";
import { getDatabase, ref, set, onValue, push, remove, update } from "firebase/database";
import { useSelector } from "react-redux";
import { AddCard } from "../components/AddCard";
import { TodoCard } from "../components/TodoCard";
import { Context } from "../..";

/**
 * Страница с задачами
 * 
 * @component
 */

export const ContentPage = () => {
	const { app } = useContext(Context);
	const [obj, setObj] = useState(null);
	const [modalActive, setModalActive] = useState(false);
	const { dropItem } = useSelector((state) => state.todo);

	const database = getDatabase(app);
	const todosList = ref(database);

	const [todos, setTodos] = useState();
	const [states, setStates] = useState();

	/**
	 * Прослушивание изменений в БД
	 * Получение данных о карточках, статусах(колонках)
	 */

	useEffect(() => {
		onValue(todosList, (snapshot) => {
			setTodos(Object.entries(snapshot.val().todos));
			setStates(Object.entries(snapshot.val().states));
		});
	}, []);

	/**
	 * Добавление карточки
	 * @param {object} data обьект названия создаваемой карточки(ключ, значение)
	 * @param {string} state статус карточки(по умолчанию "Новые")
	 */

	const setCard = (data, state) => {
		const todosList = ref(database, "todos");
		const newTodo = push(todosList);
		set(newTodo, {
			...{ ...data, state: state },
		});
	};

	/**
	 * Изменение статуса карточки при перемещении drag'n'drop между колонками, обновление статуса в БД
	 *
	 * @param {React.BaseSyntheticEvent} e
	 * @param {string} state статус карточки
	 */

	const dropHandler = (e, state) => {
		e.preventDefault();

		update(ref(database, "todos/" + dropItem.id), {
			...{ state: state },
		});
	};

	/**
	 * Добавление колонки
	 * @param {object} data обьект с данными нового статуса
	 */

	const setState = (data) => {
		const statesList = ref(database, "states");
		const newState = push(statesList);
		set(newState, {
			...data,
		});
	};

	/**
	 * Удаление карточки
	 * @param {React.BaseSyntheticEvent} e
	 * @param {string} key идентификатор карточки
	 */

	const deleteCard = (e, key) => {
		e.preventDefault();
		e.stopPropagation();
		remove(ref(database, "todos/" + key));
	};

	/**
	 * Функция закрытия модального окна
	 */

	const closeModal = () => {
		setModalActive(false);
		setObj(null);
	};

	/**
	 * Функция открытия модального окна
	 */
	const modalOpen = () => {
		setModalActive(true);
	};

	/**
	 * вфбор карточки для редактирования, открытие модального окна
	 * 
	 * @param {object} data данные карточки
	 */

	const cardClickHandler = (data) => {
		setObj(data);
		modalOpen();
	};

	return (
		<div className="todo__main">
			<div className="todo__container">
				{states &&
					states.map(([key, item]) => {
						return (
							<div className="todo__create" key={key}>
								<h2 className="todo__title">{item.state}</h2>
								<div className="todo__list" onDrop={(e) => dropHandler(e, item.state)} onDragOver={(e) => dropHandler(e, item.state)}>
									{todos &&
										todos
											.filter(([key, obj]) => obj.state === item.state)
											.map(([key, item], index) => {
												console.log(index);
												return (
													<TodoCard data={item} key={key} id={key} cardClick={cardClickHandler} deleteCard={deleteCard} />
												);
											})}
								</div>
								<Create createHandler={setCard} createText="Добавить задачу" name="title" state={item.state} />
							</div>
						);
					})}

				<div className="todo__create">
					<Create createHandler={setState} createText="Добавить колонку" name="state" />
				</div>
				{modalActive && <AddCard obj={obj} closeModal={closeModal} states={states} />}
			</div>
		</div>
	);
};
