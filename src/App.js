import TodoList from "./components/TodoList";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";

const TODO_APP_STORAGE_KEY = "TODO_APP";

const App = () => {
  const [todoList, setTodoList] = useState([]); //array
  const [textInput, setTextInput] = useState(""); // string

  useEffect(() => {
    const storageTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storageTodoList) {
      setTodoList(JSON.parse(storageTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddTodoList = useCallback(() => {
    // them text input vao danh sach todo list
    setTodoList([
      { id: v4(), name: textInput, isCompleted: false },
      ...todoList,
    ]);
    setTextInput("");
  }, [textInput, todoList]);

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }, []);

  return (
    <>
      <h3>Danh sach viec can lam</h3>
      <Textfield
        name="add-todo"
        placeholder="Thêm việc cần làm ... "
        elemAfterInput={
          <Button
            isDisabled={!textInput}
            appearance="primary"
            onClick={onAddTodoList}
          >
            Thêm
          </Button>
        }
        css={{ padding: "4px 2px" }}
        textInput={textInput}
        onChange={onTextInputChange}
      ></Textfield>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} />
    </>
  );
};

export default App;
