import { auth, signIn,  } from "@/auth";
import Preloader from "@/components/Preloader";
import UserHome from "@/components/UserHome";
import { prisma } from "@/db";
import { Suspense } from "react";
import {redirect} from "next/navigation"
export default async function Home() {
  const session = await auth();
  const profile = await prisma.profile.findFirst({
    where: {
     email: session?.user?.email as string 
    }
  })
  if(!profile && session) return redirect('/settings')
  return (
    <div className="">
      {session?.user?.email? (
        <Suspense fallback={<Preloader />}>
       <UserHome  /> 
       </Suspense>
      ):(
      (
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button
            className="border px-4 py-2 bg-ig-red text-white rounded-lg"
            type="submit"
          >
            Login with google
          </button>
        </form>
      )

      )}
         </div>
  );
}
