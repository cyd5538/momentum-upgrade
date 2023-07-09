import { Todo } from '@/types/type';
import React, { useEffect, useState } from 'react'
import ListSection from './ListSection';

interface ListTodoProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const ListTodo:React.FC<ListTodoProps> = ({todos,setTodos}) => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [progress, setProgress] = useState<Todo[]>([]);
  const [complete, setCompelte] = useState<Todo[]>([]);

  useEffect(() => {
    const todoFilter = todos.filter(task => task.status === "todo");
    const progressFilter = todos.filter(task => task.status === "progress");
    const completeFilter = todos.filter(task => task.status === "complete");

    setTodo(todoFilter);
    setProgress(progressFilter);
    setCompelte(completeFilter);
  },[todos])

  const status = ["todo", "progress", "complete"]; 

  return (
    <div className='flex gap-16'>
      {status.map((stat, index) => 
      <ListSection 
        key={index} 
        stat={stat} 
        todos={todos}
        setTodos={setTodos}
        todo={todo}
        progress={progress}
        complete={complete}
      />)}
    </div>
  )
}

export default ListTodo
