import { prisma } from "@/db";
import PostsGrid from "./PostGrid";

export default async function ProfilePosts({email}:{email:string}){
  const posts = await prisma.post.findMany({where:{author:email}})
  return (
  <PostsGrid posts={posts} />
  )
}
