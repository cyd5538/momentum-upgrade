import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Favor } from "@/types/type";
import CreateFavor from '@/components/favor/CreateFavor';
import FavorList from '@/components/favor/FavorList';

const Favorite = () => {
  const [favorList, setFavorList] = useState<Favor[]>([]);

  useEffect(() => {
    const storedFavor: string | null = localStorage.getItem('favor');
    if (storedFavor) {
      setFavorList(JSON.parse(storedFavor) as Favor[]);
    }
  }, [])
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='pb-16 flex flex-col items-center gap-16 pt-6'>
        <CreateFavor setFavorList={setFavorList}/>
        <FavorList favorList={favorList} setFavorList={setFavorList} />
      </div>
    </DndProvider>
  ) 
}

export default Favorite
