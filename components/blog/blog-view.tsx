import React from "react";
import { BlogType } from "@/utils/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import readingTime from "reading-time";

dayjs.extend(relativeTime);

interface BlogViewProps {
  blog: BlogType;
}

export default function BlogView({ blog }: BlogViewProps) {
  const timeToRead = readingTime(blog.content);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-col items-start pb-2">
        {/* blog image */}
        <div className="w-full h-96 relative overflow-hidden rounded-md">
          {blog?.imageUrl && (
            <div className="relative w-full h-full">
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                layout="fill"
                objectFit="cover"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <h1 className="text-white text-3xl md:text-4xl font-bold text-center">
                  {blog.title}
                </h1>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      {/* blog meta */}
      <div className="flex flex-wrap justify-center gap-4 mx-4 my-4 sm:mx-10 text-sm">
        {/* blog like */}

        {/* time to read */}
        <Button disabled variant="outline" className="rounded-full">
          {timeToRead.text}
        </Button>
        {/* word count */}
        <Button disabled variant="outline" className="rounded-full">
          {timeToRead.words} words
        </Button>

        {/* published date */}
        <Button disabled variant="outline" className="rounded-full">
          Published {blog?.createdAt ? dayjs(blog.createdAt).fromNow() : ""}
        </Button>
        {/* last updated (conditional) */}
        {blog?.updatedAt && blog.createdAt !== blog.updatedAt && (
          <Button disabled variant="outline" className="rounded-full">
            Updated {dayjs(blog.updatedAt).fromNow()}
          </Button>
        )}

        {/* author */}
        <Button disabled variant="outline" className="rounded-full">
          {blog?.user?.name || "Author"}
        </Button>

        {/* category */}
        <Button disabled variant="outline" className="rounded-full">
          {blog?.category || "Category"}
        </Button>
      </div>

      {/* blog content */}
      <CardContent className="prose prose-strong:text-gray-500 prose-headings:text-gray-500 max-w-none mt-12">
        <div className="text-lg leading-relaxed text-gray-500 space-y-6">
          {blog?.content && (
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
