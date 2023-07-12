import { useState, useEffect } from 'react';  
import { Favor } from "@/types/type";
import FavorListSection from './FavorListSection';

interface FavorListProps {
  favorList: Favor[];
  setFavorList: React.Dispatch<React.SetStateAction<Favor[]>>;
}

const FavorList:React.FC<FavorListProps> = ({favorList, setFavorList}) => {
  const [high, setHigh] = useState<Favor[]>([]);
  const [middle, setMiddle] = useState<Favor[]>([]);
  const [low, setLow] = useState<Favor[]>([]);

  useEffect(() => {
    const highFilter = favorList.filter(favor => favor.status === "high");
    const middleFilter = favorList.filter(favor => favor.status === "middle");
    const lowFilter = favorList.filter(favor => favor.status === "low");

    setHigh(highFilter);
    setMiddle(middleFilter);
    setLow(lowFilter);
  },[favorList])

  const status = ["high", "middle", "low"]; 

  return (
    <div className='grid grid-cols-1 gap-16 justify-start w-4/5'>
      {status.map((stat, index) => 
        <FavorListSection 
          key={index} 
          stat={stat} 
          favorList={favorList}
          setFavorList={setFavorList}
          high={high}
          middle={middle}
          low={low}
        />)}
    </div>
  )
}

export default FavorList
