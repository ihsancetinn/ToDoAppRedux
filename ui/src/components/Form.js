import { useState } from "react";
import { addTodosAsync } from "../redux/todos/todosSlice";
import Loading from "./Loading";
import Error from "./Error";

import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.todos.addNewTodoIsLoading);
  const error = useSelector((state) => state.todos.addNewTodoError);

  const handleSubmit = async (e) => {
    if (!title) {
      return alert("This field cannot be empty!");
    }
    e.preventDefault();
    await dispatch(addTodosAsync({ title }));
    setTitle("");
  };
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center" }}
      >
        <input
          disabled={isLoading}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={title}
          onChange={handleChange}
        />
        {isLoading && <Loading />}
        {error && <Error message={error}/>}
      </form>
    </>
  );
};

export default Form;
