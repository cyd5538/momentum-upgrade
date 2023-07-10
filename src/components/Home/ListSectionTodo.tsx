import { Todo } from "@/types/type"
import { X } from "lucide-react";
import { toast } from 'react-hot-toast';
import { useDrag } from "react-dnd";

interface ListSectionTodoProps {
  todo : Todo
  todos: Todo[]
  setTodos : React.Dispatch<React.SetStateAction<Todo[]>>;
}

const ListSectionTodo:React.FC<ListSectionTodoProps> = ({todo, todos, setTodos}) => {

  const [{isDragging }, drag] = useDrag(() => ({
    type : "todo",
    item: {id: todo.id},
    collect : (monitor) => ({
      isDragging : !!monitor.isDragging()
    })
  }))

  const handleDelete = (id:string) => {
    const deleteTodo = todos.filter((a) => a.id !== id);

    localStorage.setItem("todos", JSON.stringify(deleteTodo));
    
    setTodos(deleteTodo);
    toast("삭제 성공😘")
  }

  return (
    <div 
    ref={drag} 
    className={`relative p-4 mt-4 shadow-md rounded-md ${isDragging ? "opacity-25" : "opacity-100"} cursor-grab`}>
      <p>{todo.name}</p>
      <button 
      className="absolute bottom-2 right-2"
      onClick={() => handleDelete(todo.id)}
      >
        <X />
      </button>
    </div>
  )
}

export default ListSectionTodo
