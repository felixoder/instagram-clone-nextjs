import ProfilePosts from "@/components/ProfilePosts";
import ProfilePageInfo from "@/components/ProfilePageInfo";
import { Suspense } from "react";
import { Follower , Profile } from "@prisma/client";
import "@radix-ui/themes/styles.css";
import Preloader from "./Preloader";
import ProfileNav from "./ProfileNav";


export default async function ProfilePageContent({
  profile,
  isOurProfile=false,
  ourFollow=null,
  postCount,
  followerCount,
  followingCount

}:{
    profile: Profile,
    isOurProfile?: boolean
    ourFollow: Follower | null;
    postCount: number,
    followerCount: number,
    followingCount: number
  }){
  return(
   <main>  
      <ProfilePageInfo 
        profile={profile} 
        ourFollow={ourFollow} 
        isOurProfile={isOurProfile}
        postCount={postCount as number}
        followerCount={followerCount as number}
        followingCount={followingCount as number}
      />
    <ProfileNav isOurProfile={isOurProfile} username={profile.username || ''}/> 

      <section className="mt-4">
        <Suspense fallback={<Preloader />}>
          <ProfilePosts email={profile.email} />
        </Suspense>
       

      </section>
    </main>

  )
}
