interface FavorListHeaderProps {
  text : string
  count : number
}

const FavorListHeader:React.FC<FavorListHeaderProps> = ({text, count}) => {
  return (
    <div className="flex bg-violet-200 text-black dark:text-white dark:bg-zinc-950 gap-2 p-2 rounded-md shadow-md w-36">
      <div>{text}</div>
      <div>{count}</div>
    </div>
  )
}

export default FavorListHeader
