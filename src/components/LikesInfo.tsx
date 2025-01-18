"use client"
import { Like, Post } from "@prisma/client";
import {HeartIcon} from "lucide-react";
import { likePost, removeLikeFromPost } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function LikesInfo({
  post,
  sessionLike,
  showText=true
}:{
    post: Post,
    sessionLike: Like | null;
    showText?: boolean
  }) {
  const router = useRouter();
  const [likedByMe, setLikedByMe] = useState(!! sessionLike);
  return(
      <form
      className="flex items-center gap-2"
      action={async(data:FormData)=>{
        setLikedByMe(prev => !prev)
        if(likedByMe){
          // remove like
          await removeLikeFromPost(data);
          router.refresh();
        }
        else{
        await likePost(data);
        router.refresh();
        }
      }}
      >
        <button
        className=""
        type="submit"
      >
        <input 
          type="hidden" 
          name="postId" 
          value={post.id} />
        <HeartIcon 
          className={likedByMe ? 'text-red-500 fill-red-500': ''} />
        </button>
      {showText && (
        <p>
        {post.likesCount} people like this
        </p>
      )}
      </form>

  )
}
