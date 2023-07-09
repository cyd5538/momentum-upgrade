import { Todo } from "@/types/type"

interface ListSectionProps {
  stat : string
  todos : Todo[]
  setTodos : React.Dispatch<React.SetStateAction<Todo[]>>;
  todo : Todo[]
  progress : Todo[]
  complete : Todo[]
}

const ListSection:React.FC<ListSectionProps> = ({stat}) => {
  return (
    <div>
      <h2>{stat}</h2>
    </div>
  )
}

export default ListSection
