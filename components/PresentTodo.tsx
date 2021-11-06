import { Checkbox, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import { Todo } from "./MakeTodo";
import { produce } from "immer";
interface PresentTodoProps {
  todo: Todo;
  onChange?: (newTodo: Todo) => any;
}
export const PresentTodo: FC<PresentTodoProps> = ({
  todo,
  onChange = () => {},
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 2,
        px: 1,
      }}
    >
      <Typography>{todo.text}</Typography>
      <Checkbox
        checked={todo.completed}
        onClick={() => {
          onChange(
            produce(todo, (draft) => {
              draft.completed = !draft.completed;
            })
          );
        }}
      />
    </Box>
  );
};
