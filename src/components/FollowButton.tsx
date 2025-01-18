'use client';
import { UserMinusIcon, UserPlusIcon } from "lucide-react";
import { followProfile, unFollowProfile } from "./actions";
import {Follower} from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FollowButton({
  profileIdToFollow,
  ourFollow=null
}:{
  profileIdToFollow: string
  ourFollow: Follower | null
  }){
    
  const router = useRouter();
  const [isFollowed, setIsFollowed] = useState(!! ourFollow);

  return(
    <form action={async ()=>{
      setIsFollowed(prev => !prev);
      if(isFollowed){
        // unfollow
        await unFollowProfile(profileIdToFollow);
      }
      else {
       // follow
        await followProfile(profileIdToFollow);
        
      }
      router.refresh();
    }}>
     <button
            className={
          (isFollowed
          ? 'p-2 flex gap-2 text-white justify-center items-center rounded-md  bg-gradient-to-tr from-ig-orange to-ig-red from-50% '
          : "p-2 flex gap-2 text-white justify-center items-center rounded-md bg-gradient-to-tr from-ig-orange to-ig-red to-80%")
        }>
            {isFollowed ? <UserMinusIcon/> : <UserPlusIcon />}
            <p className="font-semibold text-md">
            {isFollowed ? 'Unfollow' : 'Follow'}
            </p>
          </button>
          </form>
  )
}
