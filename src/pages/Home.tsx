import { useEffect, useState } from 'react';

import CreateTodo from '@/components/Home/CreateTodo';
import ListTodo from '@/components/Home/ListTodo';

import { Todo } from '@/types/type';

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // localstorage의 값이 있다면 가져오기
  useEffect(() => {
    const storedTodos: string | null = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos) as Todo[]);
    }
  },[])

  console.log(todos)

  return (
    <div className='w-screen h-screen flex flex-col items-center gap-16 pt-6'>
      <CreateTodo setTodos={setTodos}/>
      <ListTodo todos={todos} setTodos={setTodos}/>
    </div>
  )
}

export default Home
