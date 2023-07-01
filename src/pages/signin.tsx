import React, {FC} from 'react';
import Image from 'next/image';


const SignIn: FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1100px] mx-auto justify-center min-h-screen max-h-fit">
            <Image 
            className="w-full h-full  aspect-auto"
            src="/auth.jpg" alt="Authentication" width={200} height={200} />
            <div className="my-8">
               <h1>
                Be a part of our Fam!
               </h1>

               <button className="flex rounded-md ">
                Sign in with Google
               </button>
            </div>

        </div>
    )
}


export default SignIn;