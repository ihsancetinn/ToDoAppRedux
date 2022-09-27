import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodoAsync = createAsyncThunk("todos/getTodoAsync", async () => {
  const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
  return res.data;
});
export const addTodosAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (data) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`,
      data
    );
    return res.data;
  }
);
export const toogleTodoAsync = createAsyncThunk(
  "todos/toogleTodoAsync",
  async ({ id, data }) => {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`,
      data
    );
    return res.data;
  }
);
export const removeTodoAsync = createAsyncThunk(
  "todos/removeTodoAsync",
  async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`
    );
    return id;
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: localStorage.getItem("activeFilter"),
    addNewTodoIsLoading: false,
    addNewTodoError: null,
  },
  reducers: {
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    },
  },
  extraReducers: {
    //get todos
    [getTodoAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodoAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodoAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    //add todos
    [addTodosAsync.pending]: (state, action) => {
      state.addNewTodoIsLoading = true;
    },
    [addTodosAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewTodoIsLoading = false;
    },
    [addTodosAsync.rejected]: (state, action) => {
      state.addNewTodoIsLoading = false;
      state.error = action.error.message;
    },
    //toogle todo
    [toogleTodoAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index].completed = completed;
    },
    //removeTodo
    [removeTodoAsync.fulfilled]: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);
      state.items = filtered;
    },
  },
});

export const selectedTodos = (state) => state.todos.items;
export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }
  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active"
      ? todo.completed === true
      : todo.completed === false
  );
};

export const { changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
