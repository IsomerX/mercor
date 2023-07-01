import React, {FC} from 'react';
import Image from 'next/image';

const SignIn: FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <Image src="/images/mercer-logo.png" alt="Mercer Logo" width={200} height={200} />
            <h1>Sign In</h1>

        </div>
    )
}


export default SignIn;