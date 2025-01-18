import { getSinglePostdata } from "@/components/actions";
import SinglePostContent from "@/components/SinglePostContent";

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{ id: string }>;
    })
{
    const postId = (await params).id;
    const {post, authorProfile, comments, commentsAuthors, myLike, myBookmark} = await getSinglePostdata(postId); 

    return (
      
        <SinglePostContent
            post={post}
            authorProfile={authorProfile}
            comments={comments}
            commentsAuthors={commentsAuthors}
            myLike={myLike}
            myBookmark={myBookmark}


        />

    );
}
