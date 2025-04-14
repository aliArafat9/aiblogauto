import React from "react";
import Image from "next/image";
import { Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogType } from "@/utils/types";

interface BlogCardProps {
  blog: BlogType;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="w-full h-40 relative overflow-hidden rounded-md">
          {blog?.imageUrl && (
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>

        <CardTitle className="text-lg line-clamp-1 mt-2">
          {blog?.title || "Blog Title"}
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {blog?.category || "Category"}
        </p>
      </CardHeader>

      <CardContent>
        <div className="text-sm mb-4 line-clamp-3">
          {blog?.content && (
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          )}
        </div>

        <div className="space-y-2">
          <InfoItem icon={User} text={blog?.user?.name || "Author"} />
          <InfoItem
            icon={Clock}
            text={
              blog?.createdAt
                ? new Date(blog?.createdAt).toLocaleDateString()
                : "Date"
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

const InfoItem = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center text-sm">
    <Icon className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
    <span className="line-clamp-1">{text}</span>
  </div>
);
