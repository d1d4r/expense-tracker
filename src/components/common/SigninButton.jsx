"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const SigninButton = () => {
  const session = useSession();

  const user = session.data?.user;

  //   if (session && session.user) {
  //     return (
  //       <div className="flex gap-4 ml-auto">
  //         <p className="text-sky-600">{session.user.email}</p>
  //         <button onClick={() => signOut()} className="text-red-600">
  //           Sign Out
  //         </button>
  //       </div>
  //     );
  //   }
  return (
    <div>
      {user && (
        <button onClick={() => signIn()} className="ml-auto text-green-600">
          Sign In
        </button>
      )}
      {!user && session.status !== "loading" && (
        <button onClick={() => signOut()} className="text-red-600">
          Sign Out
        </button>
      )}
    </div>
  );
};

export default SigninButton;
