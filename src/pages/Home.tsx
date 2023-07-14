import { useEffect } from 'react';

import ListTodo from '@/components/Home/ListTodo';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Todo } from '@/types/type';
import CreateTodos from '@/components/Home/CreateTodos';
import useLocalStorage from '@/hooks/useLocalStorage.tsx';

const Home = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='pb-16 flex flex-col items-center gap-16 pt-6'>
        <CreateTodos setTodos={setTodos}/>
        <ListTodo todos={todos} setTodos={setTodos} />
      </div>
    </DndProvider>
  )
}

export default Home
