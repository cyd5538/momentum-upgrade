import { Todo } from "@/types/type"
import ListSectionHeader from "./ListSectionHeader";
import ListSectionTodo from "./ListSectionTodo";

interface ListSectionProps {
  stat : string
  todos : Todo[]
  setTodos : React.Dispatch<React.SetStateAction<Todo[]>>;
  todo : Todo[]
  progress : Todo[]
  complete : Todo[]
}

const ListSection: React.FC<ListSectionProps> = ({
  stat,
  todos,
  setTodos,
  todo,
  progress,
  complete
}) => {
  let text = "시작전";
  let bg = "bg-violet-400";
  let todoMap = todo;
  let count = todo.length;

  if (stat === "progress") {
    text = "진행중";
    bg = "bg-violet-600";
    todoMap = progress;
    count = progress.length;
  }

  if (stat === "complete") {
    text = "완료";
    bg = "bg-violet-900";
    todoMap = complete;
    count = complete.length;
  }

  return (
    <div className="w-72">
      <ListSectionHeader text={text} bg={bg} count={count} /> 
      {todoMap.map((todo) => (
        <ListSectionTodo key={todo.id} todo={todo} todos={todos} setTodos={setTodos}/>  
      ))}
    </div>
  );
};

export default ListSection

