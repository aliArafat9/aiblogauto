import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPaginationProps {
  page: number;
  totalPages: number;
}

export default function BlogPagination({
  page,
  totalPages,
}: BlogPaginationProps) {
  return (
    <nav className="flex justify-center opacity-75 mb-10">
      <ul className="flex justify-center items-center space-x-2 mt-5">
        {page > 1 && (
          <li>
            <Link href={`?page=${page - 1}`}>
              <Button variant="outline">
                <ChevronLeft />
              </Button>
            </Link>
          </li>
        )}

        {Array.from({ length: totalPages }, (_, index) => {
          const p = index + 1;
          return (
            <li key={p}>
              <Link href={`?page=${p}`}>
                <Button variant={`${page === p ? "secondary" : "ghost"}`}>
                  {p}
                </Button>
              </Link>
            </li>
          );
        })}

        {page < totalPages && (
          <li>
            <Link href={`?page=${page + 1}`}>
              <Button variant="outline">
                <ChevronRight />
              </Button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
