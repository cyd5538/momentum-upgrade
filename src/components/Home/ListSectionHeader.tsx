interface ListSectionHeaderProps {
  text : string
  bg : string
  count : number
}

const ListSectionHeader:React.FC<ListSectionHeaderProps> = ({ text, bg, count }) => {
  return (
    <div className={`${bg} flex items-center h-12 shadow-md rounded-md uppercase text-sm text-white pl-2`}>
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-md p-2 flex items-center justify-center">{count}</div>
    </div>
  )
}
export default ListSectionHeader;