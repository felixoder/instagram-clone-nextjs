import {auth} from "@/auth";
import ProfilePageContent from "@/components/ProfilePageContent";
import {prisma} from "@/db";

export default async function ProfilePage() {
  const session = await auth();
  const profile = await prisma.profile
    .findFirst({where:{email:session?.user?.email as string}});
  if (!profile) {
    return 'not logged in'
  }
  return (
    <ProfilePageContent
      ourFollow={null}
      profile={profile}
      isOurProfile={true} />
  );
}
