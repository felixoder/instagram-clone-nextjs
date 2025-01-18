import getSessionEmail from "@/components/actions"
import ProfilePageContent from "@/components/ProfilePageContent";
import {prisma} from "@/db";

export default async function UserProfilePage({
  params,
}:{
  params:Promise<{username:string}>;
}) {
  const username = (await params).username
  const sessionEmail = await getSessionEmail() || '';
  const profile = await prisma.profile.findFirstOrThrow({
    where:{username:username}
  });
  const postCount = await prisma.post.count({
    where: {author: profile.email}
  })

  const followingCount = await prisma.follower.count({
    where: {followingProfileId: profile.id}
  })

  const followerCount = await prisma.follower.count({
    where: {followingProfileEmail : sessionEmail}
  })
  const ourFollow = await prisma.follower.findFirst({
    where: {
      followingProfileEmail: sessionEmail,
      followedProfileId: profile.id,
    },
  });
  return (
    <ProfilePageContent
      isOurProfile={profile.email === sessionEmail}
      ourFollow={ourFollow}
      profile={profile}
      postCount={postCount}
      followerCount={followerCount}
      followingCount={followingCount}

    />
  );
}

