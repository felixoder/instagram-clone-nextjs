import getSessionEmail from "@/components/actions";
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
      profile={profile} />
  );
}
