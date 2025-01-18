import { getSinglePostdata } from "@/components/actions";
import Modal from "@/components/Modal";
import Preloader from "@/components/Preloader";
import SinglePostContent from "@/components/SinglePostContent";
import { Suspense } from "react";

// Async function to await params
export default async function PostInModal({ params }: { params: { id: string } }) {
    const { id } = params; // Await params to get dynamic route parameters
    const {post, authorProfile, comments, commentsAuthors, myLike, myBookmark} = await getSinglePostdata(id);

  return (
    <Modal>
      <Suspense fallback={<Preloader />}>
         <SinglePostContent
                post={post}
                authorProfile={authorProfile}
                comments={comments}
                commentsAuthors={commentsAuthors}
                myLike={myLike}
               myBookmark={myBookmark}
        />
      </Suspense>
    </Modal>
  );
}

