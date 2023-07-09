import { useState } from "react";
import { Todo } from "@/types/type";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface CreateTodoProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const CreateTodo = ({ setTodos }: CreateTodoProps) => {
  const [todo, setTodo] = useState<Todo>({
    id: "",
    name: "",
    status: "todo"
  });

  const handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    const uniqueId = Math.random().toString(16).slice(2);
    setTodo({
      ...todo,
      id: uniqueId,
      name: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todo.name.length < 3) {
      return toast.error("3글자 이상 작성해주세요.");
    }

    setTodos((prev) => {
      const list = [...prev, todo];
      localStorage.setItem("todos", JSON.stringify(list));
      return list;
    });

    toast.success("Success");

    setTodo({
      id: "",
      name: "",
      status: "todo"
    });
  };

  return (
    <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
      <Textarea
        className="w-72"
        onChange={handleInputChange}
        value={todo.name}
      />
      <Button type="submit" className="bg-violet-700 rounded-md px-4 h-12 text-white">
        만들기
      </Button>
    </form>
  );
};

export default CreateTodo;
