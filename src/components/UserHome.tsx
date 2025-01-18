import { Session } from "next-auth";
import HomeTopRow from "./HomeTopRow";
import { getSessionEmailOrThrow } from "./actions";
import { prisma } from "@/db";
import HomePosts from "./HomePosts";

export default async function UserHome({session}:{session: Session}){
  const follows = await prisma.follower.findMany({
    where: {
      followingProfileEmail: await getSessionEmailOrThrow(),
    }
  });
  const profiles = await prisma.profile.findMany({
    where: {
      id: {in: follows.map(f => f.followedProfileId)}
    }
  })
  return(
      <div className="flex flex-col gap-8">
        <HomeTopRow follows={follows} profiles={profiles}/>  
        <HomePosts follows={follows} profiles={profiles} />
      </div>

  )
}
