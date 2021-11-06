import { Stack } from "@mui/material";
import axios from "axios";
import produce from "immer";
import type { NextPage } from "next";
import { useState } from "react";
import { MakeTodo, Todo } from "../components/MakeTodo";
import { PresentTodo } from "../components/PresentTodo";
import { getDB } from "../db/getDB";
import { hydrateTodo } from "../hydrate/todo";

const Home: NextPage = ({ todos: todosServer }: any) => {
  const [todos, setTodos] = useState(todosServer.map(hydrateTodo) as Todo[]);
  return (
    <Stack spacing={1}>
      <MakeTodo
        onMake={(todo) => {
          setTodos(todos.concat(todo));
          axios.post("/api/todo/save", { todo }).catch(console.log);
        }}
      />
      {todos.map((todo, index) => (
        <PresentTodo
          key={todo.id}
          todo={todo}
          onChange={(newTodo) => {
            setTodos(
              produce((draft) => {
                draft[index] = newTodo;
              })
            );
            axios
              .post("/api/todo/update", { todo: newTodo })
              .catch(console.log);
          }}
        />
      ))}
    </Stack>
  );
};

export async function getServerSideProps() {
  const dbTodos = await (await getDB()).collection("todos").find();
  const todos = await dbTodos.toArray();

  return {
    props: {
      todos: todos.map((t) => ({ ...t, _id: "" })),
    }, // will be passed to the page component as props
  };
}

export default Home;
