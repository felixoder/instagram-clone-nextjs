'use client';
import {bookmarkPost, likePost, removeLikeFromPost, removebookmarkFromPost} from "@/components/actions";
import {Like, Post} from "@prisma/client";
import {BookmarkIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function BookmarkButton({
  post,
  sessionBookmark,
}:{
  post:Post;
  sessionBookmark:Like|null;
}) {
  const router = useRouter();
  const [bookmarkedByMe, setBookmarkedByMe] = useState(!!sessionBookmark);
  return (
    <form
      action={async (data:FormData) => {
        setBookmarkedByMe(prev => !prev);
        if (bookmarkedByMe) {
          // remove bookmark
          await removebookmarkFromPost(post.id);
        } else {
          // add bookmark
          await bookmarkPost(post.id);
        }
        router.refresh();
      }}
      className="flex items-center gap-2">
      <input type="hidden" name="postId" value={post.id}/>
      <button
        type="submit"
        className="">
        <BookmarkIcon className={bookmarkedByMe ? 'fill-gray-800 ' : 'fill-white'}/>
      </button>
    </form>
  );
}
