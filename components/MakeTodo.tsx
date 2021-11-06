import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { immerable } from "immer";
import { FC, useState } from "react";
import { v4 } from "uuid";

export class Todo {
  constructor(text: string, completed: boolean = false) {
    this.id = v4();
    this.text = text;
    this.completed = completed;
  }
  [immerable] = true;
  id: string;
  text: string;
  completed: boolean;
}

interface MakeTodoProps {
  onMake: (todo: Todo) => any;
}

export const MakeTodo: FC<MakeTodoProps> = ({ onMake }) => {
  const [text, setText] = useState("");

  return (
    <Box sx={{ py: 1 }}>
      <TextField
        fullWidth
        placeholder="What do you want to do?"
        value={text}
        onChange={({ target: { value } }) => setText(value)}
        onKeyDown={({ key }) => {
          if (key === "Enter") {
            onMake(new Todo(text, false));
            setText("");
          }
        }}
      />
    </Box>
  );
};
