import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Todo } from "@/types/type";
import { useState } from "react";
import toast from "react-hot-toast";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { Smile } from "lucide-react";

interface CreateTodoProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const textColor = [
  "text-black",
  "text-white",
  "text-gray-300",
  "text-zinc-500",
  "text-red-500",
  "text-yellow-300",
  "text-orange-600",
  "text-green-500",
  "text-emerald-500",
  "text-sky-500",
  "text-violet-700",
  "text-purple-800",
]

const bgColor = [
  "bg-white",
  "bg-black",
  "bg-gray-300",
  "bg-zinc-500",
  "bg-red-500",
  "bg-yellow-300",
  "bg-orange-600",
  "bg-green-500",
  "bg-emerald-500",
  "bg-sky-500",
  "bg-violet-700",
  "bg-purple-800"
]



const CreateTodos: React.FC<CreateTodoProps> = ({ setTodos }) => {
  const [todo, setTodo] = useState<Todo>({
    id: "",
    name: "",
    status: "todo",
    bg : bgColor[0],
    text : textColor[0]
  });
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
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
      status: "todo",
      bg : bgColor[0],
      text : textColor[0]
    });

  };

  const onEmojiClick = (event : EmojiClickData) => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      name: prevTodo.name += event.emoji
    }));
    setShowPicker(false);
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="shadow-md bg-violet-500 hover:bg-violet-600 hover:text-white text-white">할일 추가히기</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid justify-center items-center gap-4 relative">
            <Label htmlFor="name" className="text-left">
              할일
            </Label>
            <Input
              className={`w-72 h-12 shadow-md ${todo.bg} ${todo.text}`}
              onChange={handleInputChange}
              value={todo.name}
            >
            </Input>
            <div className="absolute right-14 bottom-3 cursor-pointer rounded-md shadow-sm shadow-zinc-500 p-[1px]" onClick={() => setShowPicker((val) => !val)}>
              <Smile />
            </div>
            <div className="absolute top-6">
              {showPicker && (
                <Picker onEmojiClick={onEmojiClick}/>
              )}
            </div>
          </div>
          <div className="grid justify-center items-center gap-4">
            <Label htmlFor="username" className="text-left">
              글씨 색상
            </Label>
            <div className="grid grid-cols-6 gap-2 w-full">
              {textColor.map((a) => {
                const modifiedClass = a.replace(/text/, "bg");
                return (
                <div
                  key={a}
                  className={`${todo.text === a ? "dark:border-white border-black border-[4px]" : "border-[1px] border-black dark:border-white"
                    } w-10 h-10 rounded-full font-bold cursor-pointer ${modifiedClass}`}
                  onClick={() => setTodo({
                    ...todo,
                    text: a,
                  })}
                >
                </div>
                );
              })}
            </div>
          </div>
          <div className="grid justify-center items-center gap-4">
            <Label htmlFor="username" className="text-left">
              배경 색상
            </Label>
            <div className="grid grid-cols-6 gap-2 w-full">
              {bgColor.map((a) => {
                return <div
                  key={a}
                  className={`${todo.bg === a ? "dark:border-white border-black border-[4px]" : "border-[1px] border-black dark:border-white"}  w-10 h-10 rounded-full  cursor-pointer ${a}`}
                  onClick={() => setTodo({
                    ...todo,
                    bg: a,
                  })}
                ></div>
              })}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Todo</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTodos;