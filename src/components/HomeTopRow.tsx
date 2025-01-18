import { Avatar } from "@radix-ui/themes";
import { PlusIcon } from "lucide-react";
import { Profile, Follower } from "@prisma/client";

export default async function HomeTopRow(
  {
    profiles, follows
  }:
  {
    profiles: Profile[],
    follows: Follower[]
  }
){
  
  return(
   <div className="flex gap-3 max-w-full overflow-x-auto">
      <div>
         <button className="size-[92px] rounded-full text-white bg-gradient-to-tr from-ig-orange to-ig-red flex items-center justify-center">
        <PlusIcon size="42" />
        </button>
        <p className="text-center text-gray-400 text-sm">New Story</p>
      </div>
        {profiles.map(profile => (
          <div
            className="flex justify-center flex-col"
            key={profile.id}>
          <div className="w-24 flex flex-col justify-center items-center">
          <div>
            <div className="inline-block p-1 bg-gradient-to-tr from-ig-orange to-ig-red rounded-full">
          <div className="inline-block p-1 bg-white dark:bg-black rounded-full">

          <Avatar
            size="6"
            radius="full"
            fallback={'avatar'}
            src={profile.avatar || ''}
          />

          </div>
          </div>
          <p className="text-center text-gray-400 text-sm">{profile.username}</p>

          </div>
          </div>
          </div>
        ))}
   </div>

  )
}
