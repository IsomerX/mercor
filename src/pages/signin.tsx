import React, {FC} from 'react';
import Image from 'next/image';
import {FcGoogle} from 'react-icons/fc'



const SignIn: FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1100px] mx-auto justify-center min-h-screen max-h-fit">
            <Image 
            className="w-full h-full  aspect-auto"
            src="/auth.jpg" alt="Authentication" width={200} height={200} />
            <div className="my-8 mx-auto">

                {/* <Image 
                src=""
                /> */}
               <h1 className=" md:text-2xl text-xl font-bold">
                Be a part of our Fam!
               </h1>

               <button className="my-4 flex rounded-full outline-1 border-2 border-slate-100 mx-auto text-md p-2 px-4">
                <FcGoogle
                className="mr-2"
                fontSize={25}
                />
                Sign in with Google
               </button>
            </div>

        </div>
    )
}


export default SignIn;