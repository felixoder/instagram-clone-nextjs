import {auth, signIn} from "@/auth";
import Preloader from "@/components/Preloader";
import UserHome from "@/components/UserHome";
import { prisma } from "@/db";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {Suspense} from "react";

export default async function Home() {
  const session = await auth();
  const profile = await prisma.profile.findFirst({
    where: {email: session?.user?.email as string}
  })
  if(!profile){
    return redirect('/settings')
  }
  return (
    <div className="">
      {session && (
        <Suspense fallback={<Preloader />}>
          <UserHome />
        </Suspense>
      )}
      {!session && (
        <form action={async () => {
          'use server';
          await signIn('google');

        }}
          className="flex flex-col justify-center items-center"
        >
          <h1 className="text-center text-bold text-xl font-bold">Instagram Clone</h1>

          <button
            className="border px-4 py-2 bg-ig-red text-white rounded-lg mb-5 mt-2"
            type="submit">Login with google
          </button>
          <h3 className="text-gray-800 font-semibold text-center mt-2 mb-2">The landing page is coming soon!</h3>
          <p>Created by<Link href="https://github.com/felixoder" className="flex">Debayan<HeartIcon className="fill-ig-red text-ig-red" /></Link></p>
        </form>
      )}
    </div>
  );
}
