import { NextPage } from "next";
import { signOut } from "next-auth/react";

const SignOut: NextPage = () => {
  signOut({ callbackUrl: '/' });
  return <div>Redirecting...</div>;
};

export default SignOut;