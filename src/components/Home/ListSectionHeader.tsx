interface ListSectionHeaderProps {
  text : string
  bg : string
  count : number
}

const ListSectionHeader:React.FC<ListSectionHeaderProps> = ({ text, count }) => {
  return (
    <div className={`bg-white dark:bg-zinc-950 dark:text-white flex items-center h-12 shadow-md rounded-md uppercase text-sm text-black pl-2`}>
      {text}
      <div className="ml-2 bg-black w-5 h-5 text-white dark:bg-white dark:text-black rounded-md p-2 flex items-center justify-center">{count}</div>
    </div>
  )
}
export default ListSectionHeader;