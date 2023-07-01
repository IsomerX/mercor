import {NextPage} from 'next';


interface CardsProps {
  title: string, 

}
const Cards: NextPage = ({CardsProps}: Props) => {
  return(
    <div
    className="p-3 rounded-md shadow-md max-w-[300px] text-white bg-[#1E293B]"
    >
    <h1 className="text-xl ">
      Title
      </h1>


    </div>
  )
}

export default Cards;