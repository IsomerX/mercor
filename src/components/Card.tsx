import {NextPage} from 'next';
import {CiLocationOn, CiTimer} from 'react-icons/ci'
import {AiOutlineUser} from 'react-icons/ai'
import Image from 'next/image'


// interface CardsProps {
//   title: string, 

// } {CardsProps}: Props
const Cards: NextPage = () => {
  return(
    <div
    className="rounded-xl shadow-md max-w-[300px] text-white"
    >

     
    <h1 className="p-3 text-xl bg-[#1E293B]">
      Title
      </h1>
      <div className="">
      <Image 
      src="/corpo_event.jpeg"
      alt="alt"
      width={300} 
      height={200}
      layout="responsive" 
      objectFit="contain"
      />
      </div>
      <div className="flex flex-col bg-white text-black p-3">
          
          <div className="py-1 flex">
            <AiOutlineUser
            fontSize={25}
            className="mr-3"
            />
            Organiser
          </div>

          <div className="py-1 flex">
          <CiTimer
          fontSize={25}
          className="mr-3"
          />
          Time
          </div>

          <div className="rounded-full px-3 bg-[#1E293B] text-white w-fit my-3">
             500 Seats left!
            </div>


       </div> 


    </div>
  )
}

export default Cards;