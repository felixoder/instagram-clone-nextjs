import PostsGrid from "@/components/PostGrid"
import { prisma } from "@/db"

export default async function BrowsePage() {
  const posts = await prisma.post.findMany({
    orderBy: {createdAt: 'desc'},
    take: 100
  })
  return(
  <div>
      <div className="mb-4">
        <PostsGrid posts={posts}/>
      </div>
    </div>
  )
}
