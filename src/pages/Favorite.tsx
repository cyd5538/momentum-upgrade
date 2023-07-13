import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Favor } from "@/types/type";
import CreateFavor from '@/components/favor/CreateFavor';
import FavorList from '@/components/favor/FavorList';
import useLocalStorage from '@/hooks/useLocalstorage';

const Favorite = () => {
  const [favorList, setFavorList] = useLocalStorage<Favor[]>('favor', []);

  useEffect(() => {
    localStorage.setItem('favor', JSON.stringify(favorList));
  }, [favorList]);
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='pb-16 flex flex-col items-center gap-16 pt-6'>
        <CreateFavor setFavorList={setFavorList} title="즐겨찾기 추가"/>
        <FavorList favorList={favorList} setFavorList={setFavorList} />
      </div>
    </DndProvider>
  ) 
}

export default Favorite
