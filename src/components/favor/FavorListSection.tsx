import { Favor } from "@/types/type";
import { useDrop } from "react-dnd";
import FavorListHeader from "./FavorListSectionHeader";
import FavorListSectionList from "./FavorListSectionList";

interface FavorListSectionProps {
  stat : string
  favorList : Favor[]
  setFavorList : React.Dispatch<React.SetStateAction<Favor[]>>;
  high : Favor[]
  middle : Favor[]
  low : Favor[]
}

const FavorListSection:React.FC<FavorListSectionProps> = ({
  stat,
  setFavorList,
  high,
  middle,
  low
}) => {

  const [{isOver}, drop] = useDrop(() => ({
    accept : "favor",
    drop: (item : Favor) => addItemToSection(item.id),
    collect : (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  let text = "자주 사용하는";
  let ListMap = high;
  let count = high.length;

  if (stat === "middle") {
    text = "보통 사용하는";
    ListMap = middle;
    count = middle.length;
  }

  if (stat === "low") {
    text = "가끔 사용하는"; 
    ListMap = low;
    count = low.length;
  }

  const addItemToSection = (id : string) => {
    setFavorList(prev => {
      const favorFilter = prev.map(a => {
        if(a.id === id){
          return {...a,status: stat}
        }

        return a
      })

      localStorage.setItem("favor", JSON.stringify(favorFilter))
      
      return favorFilter
    })
  }

  return (
    <div ref={drop} className={`rounded-md p-2 shadow-md ${isOver ? "bg-violet-200" : "bg-white dark:bg-zinc-800 "}`}>
      <FavorListHeader text={text} count={count} /> 
      <div className="flex flex-wrap gap-x-2">
      {ListMap.map((list) => {
        return <FavorListSectionList key={list.id} list={list} setFavorList={setFavorList} high={high}/>
      })}
      </div>
    </div>
  )
}

export default FavorListSection
