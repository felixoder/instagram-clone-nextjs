import {auth} from "@/auth";
import PostsGrid from "@/components/PostGrid";
import ProfileNav from "@/components/ProfileNav";
import ProfilePageInfo from "@/components/ProfilePageInfo";
import {prisma} from "@/db";
import {redirect} from "next/navigation";

export default async function BookmarkedPage() {
  const session = await auth();
  const profile = await prisma.profile
    .findFirst({where:{email:session?.user?.email as string}});
  if (!profile) {
    return redirect('/settings');
  }
  const bookmarks = await prisma.bookmark.findMany({
    where: {author:session?.user?.email as string},
  });
  const bookMarkCount = await prisma.bookmark.count({
    where: {author: session?.user?.email as string}
  })
  const posts = await prisma.post.findMany({
    where: {id: {in: bookmarks.map(b => b.postId)}},
  })
    const postCount = await prisma.post.count({
    where: {author: session?.user?.email as string}
  })

  const followerCount = await prisma.follower.count({
    where: {followedProfileId: session?.user?.id}
  })

  const followingCount = await prisma.follower.count({
    where: {followingProfileId: session?.user?.id}
  })
  return (
    <div>
      <ProfilePageInfo
        profile={profile}
        isOurProfile={true}
        ourFollow={null}
        postCount={postCount}
        followerCount={followerCount}
        followingCount={followingCount}
      />
      <ProfileNav
        username={profile.username || ''}
        isOurProfile={true} />
      {
        bookMarkCount < 1 ? 
        (
       <h1 className="font-semibold text-md text-gray-600 text-center mt-4">No Bookmark found</h1> 

        ): 
        (
          <div className="mt-4">
          <PostsGrid  posts={posts} />
        </div>
        )
      }
         </div>
  );
}
