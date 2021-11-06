import { Todo } from "./../components/MakeTodo";
export function hydrateTodo(todo: any): Todo {
  return Object.assign(new Todo(""), todo);
}
