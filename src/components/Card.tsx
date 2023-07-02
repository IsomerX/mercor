import {NextPage} from 'next';
import {CiLocationOn, CiTimer} from 'react-icons/ci'

interface CardsProps {
  title: string, 

}
const Cards: NextPage = ({CardsProps}: Props) => {
  return(
    <div
    className="rounded-md shadow-md max-w-[300px] text-white"
    >
    <h1 className="p-3 text-xl bg-[#1E293B]">
      Title
      </h1>

      <div className="flex flex-col bg-white text-black p-3">
        <div className="py-1 flex">
          <CiLocationOn
          fontSize={25}
          className="mr-3"
          />
          Location
          </div>

          <div className="py-1 flex">
          <CiTimer
          fontSize={25}
          className="mr-3"
          />
          Time
          </div>
       </div> 


    </div>
  )
}

export default Cards;