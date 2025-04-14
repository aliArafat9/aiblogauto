"use client";
import React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import Breadcrumbs from "@/components/nav/breadcrumbs";
import { useAuthContext } from "@/context/auth";
import { Button } from "@/components/ui/button";
import LoginModal from "@/components/modal/login-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TopNav() {
  const { loginModalOpen, setLoginModalOpen, user, loggedIn, logout } =
    useAuthContext();

  return (
    <div>
      <nav className="flex justify-between items-center m-2 pb-2 border-b-2">
        <Toaster />
        <Link href="/">
          <Image src="/logo.png" width={50} height={50} alt="logo" />
        </Link>

        <Link href="/blogs">
          <Button variant="outline">Blogs</Button>
        </Link>

        <Link href="/search">
          <Button variant="outline">Search</Button>
        </Link>

        {/* <pre>
          {JSON.stringify(user, null, 2)}
          {JSON.stringify(loggedIn, null, 2)}
        </pre> */}

        {loggedIn ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className="relative border p-2 rounded-md capitalize">
                  {user.name}
                  <span className="absolute top-0.4 right-0.5 h-2 w-2 bg-green-500 rounded-full"></span>
                </span>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <Link href="/dashboard">
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button
              onClick={() => setLoginModalOpen(!loginModalOpen)}
              variant="outline"
            >
              Login
            </Button>
          </>
        )}

        <a href="/dashboard/blog-automation">
          <Button variant="outline">Blog Automation</Button>
        </a>
        <ModeToggle />
      </nav>
      <nav>
        <Breadcrumbs />
        <LoginModal />
      </nav>
    </div>
  );
}
