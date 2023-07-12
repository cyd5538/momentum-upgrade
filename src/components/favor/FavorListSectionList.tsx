import { Favor } from "@/types/type"
import { X } from "lucide-react";
import { useDrag } from "react-dnd";

interface FavorListSectionListProps {
  list: Favor
  high: Favor[]
  setFavorList: React.Dispatch<React.SetStateAction<Favor[]>>;
}

const FavorListSectionList: React.FC<FavorListSectionListProps> = ({ list, high, setFavorList }) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "favor",
    item: { id: list.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const handleDelete = (id: string) => {
    const deleteTodo = high.filter((a) => a.id !== id);

    localStorage.setItem("favor", JSON.stringify(deleteTodo));

    setFavorList(deleteTodo);
  }

  return (
    <>
      <div
        ref={drag}
        className={`flex mt-4 gap-2 shadow-md p-2 dark:bg-zinc-900 rounded-md justify-center items-center ${isDragging ? "opacity-25" : "opacity-100"} cursor-grab`}>
        <img src={list.image} alt={list.title} className="w-4 h-4 md:w-10 md:h-10 shadow-md object-cover rounded-full"/>
        <a
          href={list.link}
          target="_blank"
        >
          <p className="text-blcak text-sm md:text-base font-sans font-bold underline">{list.title}</p>
        </a>
        <button
          className=""
          onClick={() => handleDelete(list.id)}
        > 
          <X />
        </button>
      </div>
    </>
  )
}

export default FavorListSectionList
