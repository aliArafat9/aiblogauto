"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search as SearchIcon, Loader2Icon } from "lucide-react";
import { BlogType } from "@/utils/types";
import Link from "next/link";
import { searchBlogsDb } from "@/actions/blog";

function SearchComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [text, setText] = useState(searchParams.get("query") || "");
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = searchParams.get("query") || "";
    // call server action
    searchBlogsDb(query).then((data) => setBlogs(data));
  }, [searchParams]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`?query=${text}`);
    setLoading(true);

    try {
      // call server action
      const result = await searchBlogsDb(text);
      setBlogs(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="flex gap-4 items-stretch" onSubmit={handleSearch}>
        <Input
          id="search"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search blogs..."
          className="flex-1"
          autoFocus
        />
        <Button
          type="submit"
          variant="outline"
          className="flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <Loader2Icon className="animate-spin" /> : <SearchIcon />}{" "}
          <span className="ml-2">Search</span>
        </Button>
      </form>

      <div className="mt-5">
        {loading ? (
          <div>Loading...</div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map((blog) => (
              <Link key={blog._id} href={`/blogs/${blog.slug}`}>
                <div className="border p-4 rounded-lg shadow-sm hover:shadow-md">
                  <h2 className="text-lg font-semibold">{blog.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div>No blogs found. Try searching for something else.</div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <Label htmlFor="search" className="block text-lg font-semibold">
        Search
      </Label>

      <Suspense fallback={<p>Loading search params...</p>}>
        <SearchComponent />
      </Suspense>
    </div>
  );
}
