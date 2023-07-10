import { Todo } from "@/types/type"
import ListSectionHeader from "./ListSectionHeader";
import ListSectionTodo from "./ListSectionTodo";
import { useDrop } from "react-dnd";

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

  const [{isOver }, drop] = useDrop(() => ({
    accept : "todo",
    drop: (item : Todo) => addItemToSection(item.id),
    collect : (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

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

  const addItemToSection = (id : string) => {
    setTodos(prev => {
      const todoFilter = prev.map(a => {
        if(a.id === id){
          return {...a,status: stat}
        }

        return a
      })

      localStorage.setItem("todos", JSON.stringify(todoFilter))
      
      return todoFilter
    })
  }

  return (
    <div ref={drop} className={`w-72 rounded-md p-2 ${isOver ? "bg-violet-200" : "bg-white"}`}>
      <ListSectionHeader text={text} bg={bg} count={count} /> 
      {todoMap.map((todo) => (
        <ListSectionTodo key={todo.id} todo={todo} todos={todos} setTodos={setTodos}/>  
      ))}
    </div>
  );
};

export default ListSection

