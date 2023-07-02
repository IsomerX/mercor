import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import type { NextPage } from "next";

const SignIn: NextPage = () => {
  const { data: session } = useSession();
  return (
    <div className="mx-auto grid max-h-fit min-h-screen w-full max-w-[1320px] grid-cols-1 justify-center md:grid-cols-2">
      <div className="h-full ">
        <Image
          src="/auth.jpg"
          alt="auth"
          height={500}
          width={500}
          className="floating"
        />
      </div>
      <div className="mx-auto my-8">
        <Image
          src="/logo.svg"
          alt="logo"
          width={200}
          height={200}
          className="mx-auto my-10"
        />
        <h1 className="font-primary text-xl md:text-3xl">
          Be a part of our Fam!
        </h1>

        {session?.user.id ? (
          <p className="text-slate-500">Welcome back, {session?.user.name}!</p>
        ) : (
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/discover",
              })
            }
            className="text-md mx-auto my-4 flex rounded-full border-2 border-slate-100 p-2 px-4 font-secondary outline-1"
          >
            <FcGoogle className="mr-2" fontSize={25} />
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default SignIn;
