import React, { ReactNode } from "react";
import Image from "next/image";
import { cn, formatDate } from "@/utils";
import { sourceSerif } from "@/utils/font";
import { twMerge } from "tailwind-merge";

type Blog = {
  id: string;
  title: string;
  content: string;
  author: Author;
  publishedAt: string;
  thumbnail: string;
  tags: string[];
};

type Author = {
  name: string;
  image: string;
};

interface Prop {
  blog: Blog;
}

const PostCard = ({ blog }: Prop) => {
  return (
    <article className="w-full p-4">
      <div className="flex items-center gap-2 w-full">
        <div className="flex items-center gap-3">
          <Image
            src={blog.author.image}
            width={32}
            height={32}
            alt="author"
            className="rounded-full w-8 h-8 object-contain ring-1 ring-gray-200"
          />
          <span className="text-sm text-black/80 font-medium">
            {blog.author.name}
          </span>
        </div>
        <span className="text-sm text-neutral-500">
          {formatDate(blog.publishedAt)}
        </span>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="w-2/3 lg:w-4/5">
          <h2 className="lg:text-2xl text-md my-1 font-bold text-black/90 font-openSans">
            {blog.title}
          </h2>

          <p
            className={twMerge(
              "line-clamp-2 text-sm lg:text-lg text-neutral-700 font-sourceSerif",
              sourceSerif.className
            )}
          >
            {blog.content}
          </p>
        </div>
        <div>
          <Image
            src={blog.thumbnail}
            width={150}
            height={150}
            alt="thumbnail"
            className="w-40 h-40 object-contain"
          />
        </div>
      </div>
      <div>
        {blog.tags.slice(0, 1).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </article>
  );
};

export default PostCard;

export const Tag = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "text-center bg-neutral-100 px-2 py-1 text-sm rounded-full capitalize text-black/80",
        className
      )}
    >
      {children}
    </span>
  );
};
