import React from "react";
import { getUserBlogsDb } from "@/actions/blog";
import { BlogType } from "@/utils/types";
import Link from "next/link";
import BlogCard from "@/components/blog/blog-card";
import BlogPagination from "@/components/blog/blog-pagination";

interface BlogsPageProps {
  searchParams: { page?: number };
}

export default async function DashboardPage({ searchParams }: BlogsPageProps) {
  const page = searchParams?.page
    ? parseInt(searchParams.page as unknown as string, 10)
    : 1;
  const limit = 3;

  const { blogs, totalCount } = await getUserBlogsDb(page, limit);
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="md:mt-0">
      <div className="p-5">
        <h1 className="text-2xl font-bold">Explore the latest blog posts</h1>

        <p className="text-sm text-gray-500">Total blog posts: {totalCount}</p>
        <br />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((blog: BlogType) => (
            <div
              key={blog._id}
              className="transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link href={`/dashboard/blog-automation?id=${blog._id}`}>
                <BlogCard blog={blog} />
              </Link>
            </div>
          ))}
        </div>

        {/* pagination */}
        <div className="flex justify-center mt-5">
          <BlogPagination page={page} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
