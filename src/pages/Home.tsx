import { useEffect, useState } from 'react';

import ListTodo from '@/components/Home/ListTodo';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Todo } from '@/types/type';
import CreateTodos from '@/components/Home/CreateTodos';

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // localstorage의 값이 있다면 가져오기
  useEffect(() => {
    const storedTodos: string | null = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos) as Todo[]);
    }
  }, [])

  console.log(todos)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='w-screen h-screen flex flex-col items-center gap-16 pt-6'>
        <CreateTodos setTodos={setTodos}/>
        <ListTodo todos={todos} setTodos={setTodos} />
      </div>
    </DndProvider>
  )
}

export default Home
