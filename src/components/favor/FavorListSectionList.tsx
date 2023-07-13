import { Favor } from "@/types/type"
import { ImageOff } from "lucide-react";
import { X } from "lucide-react";
import { useDrag } from "react-dnd";
import CreateFavor from "./CreateFavor";

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
        {list.image ?
          <img src={list.image} alt={list.title} className="w-4 h-4 md:w-10 md:h-10 shadow-md object-cover rounded-full" />
          : <ImageOff className="w-4 h-4 md:w-10 md:h-10 shadow-md rounded-full" />
        }
        <a
          href={list.link}
          target="_blank"
        >
          <p className="text-blcak text-sm md:text-base font-sans font-bold underline">{list.title}</p>
        </a>
        <div className="flex flex-row pl-2">
          <CreateFavor setFavorList={setFavorList} id={list.id} text={list.title} link={list.link} image={list.image}/>
          <button
            className="hover:bg-zinc-800 hover:text-white p-1 rounded-full"
            onClick={() => handleDelete(list.id)}
          >
            <X className="w-[16px] h-[16px]" />
          </button>
        </div>
      </div>
    </>
  )
}

export default FavorListSectionList
