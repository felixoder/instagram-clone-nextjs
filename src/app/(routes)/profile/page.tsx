import { auth } from "@/auth";
import ProfilePageContent from "@/components/ProfilePageContent";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.email) {
    return redirect('/');
  }

  const profile = await prisma.profile.findFirst({
    where: { email: session.user.email },
  });

  if (!profile) {
    return redirect('/settings');
  }

  const postCount = await prisma.post.count({
    where: { author: session.user.email },
  });

  const followerCount = await prisma.follower.count({
    where: { followedProfileId: profile.id },
  });

  const followingCount = await prisma.follower.count({
    where: { followingProfileId: profile.id },
  });

  return (
    <ProfilePageContent
      ourFollow={null}
      profile={profile}
      isOurProfile={true}
      postCount={postCount}
      followerCount={followerCount}
      followingCount={followingCount}
    />
  );
}

