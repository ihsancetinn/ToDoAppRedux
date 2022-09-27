import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Error from "./Error";
import {
  selectFilteredTodos,
  getTodoAsync,
  toogleTodoAsync,
  removeTodoAsync,
} from "../redux/todos/todosSlice";

const ContentList = () => {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(getTodoAsync());
  }, [dispatch]);

  const handleDestroy = async (id) => {
    if (window.confirm("Are You Sure?")) {
      await dispatch(removeTodoAsync(id));
    }
  };

  const handleToggle = async (id, completed) => {
    await dispatch(toogleTodoAsync({ id, data: { completed } }));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <>
      <ul className="todo-list">
        {filteredTodos.map((item, id) => (
          <li key={id} className={item.completed ? "completed" : ""}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={item.completed}
                onChange={() => handleToggle({ id: item.id })}
              />
              <label>{item.title}</label>
              <button
                className="destroy"
                onClick={() => handleDestroy(item.id, !item.completed)}
              ></button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContentList;
