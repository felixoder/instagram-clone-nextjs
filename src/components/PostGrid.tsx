"use client";
import { Post } from "@prisma/client";
import Masonry from "react-masonry-css";
import Link from "next/link";

export default function PostsGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="max-w-4xl mx-auto">
      <Masonry
        breakpointCols={{
          default: 4,
          860: 3,
          500: 2,
        }}
        className="flex -ml-4"
        columnClassName="pl-4"
      >
        {posts.map((post) => (
          <Link
            href={`/posts/${post.id}`}
            className="mb-6 block" // Added block class for spacing
            key={post.id}
          >
            <img
              src={post.image}
              alt="image"
              className="rounded-md shadow-md" // Optional styling
            />
          </Link>
        ))}
      </Masonry>
    </div>
  );
}

