import { CheckIcon, CogIcon } from "lucide-react";
import FollowButton from "./FollowButton";
import { Follower, Profile } from "@prisma/client";
import Link from "next/link";
import BackNav from "./BackNav";
export default function ProfilePageInfo({
  profile,
  isOurProfile,
  ourFollow
}:{
    profile: Profile,
    isOurProfile:boolean,
    ourFollow: Follower | null
   }){
  return(
  <div>
      <section className="flex justify-between items-center">
       <BackNav /> 
          <div className="font-bold flex items-center gap-2">{profile.username}
            <div
            className="size-5 rounded-full bg-ig-red inline-flex justify-center items-center text-white">
                <CheckIcon size={16}/>
            </div>
          </div>
       <div> 
          {isOurProfile &&(
        <Link href={'/settings'}>
          <CogIcon />
        </Link>
          )}
        </div>
      </section>
      <section className="mt-8 flex justify-center">
        <div className="size-48 p-2 bg-gradient-to-tr from-ig-orange to-ig-red rounded-full">
          <div className="size-44 p-2 bg-white rounded-full dark:bg-black">
              <div className="size-40 aspect-square overflow-hidden rounded-full">
                  <img
                    className=""
                    src={profile.avatar || ''}
                  />
              </div>
          </div>
        </div>
      </section>

      <section className="text-center mt-4">
        <h1 className="text-xl font-bold">{profile.name}</h1>
        <p className="text-gray-500 mt-1 mb-1">{profile.subtitle}</p>
        <p className="">
          {profile.bio}
          <br/>
          
        </p>
      </section>
        {!isOurProfile && (
          <section className="flex justify-center my-3 ">
          <FollowButton
            ourFollow={ourFollow}
            profileIdToFollow={profile.id} 
          /> 
          </section>)
      }

  </div>
  )
}
