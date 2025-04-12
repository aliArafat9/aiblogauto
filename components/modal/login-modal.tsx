"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/auth";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";

export default function LoginModal() {
  const {
    user,
    setUser,
    loading,
    loginModalOpen,
    setLoginModalOpen,
    handleLoginSubmit,
  } = useAuthContext();

  return (
    <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <Input
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                id="email"
                type="email"
                placeholder="Enter your email"
                className="col-span-3"
                required
              />
              <Input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                id="password"
                type="password"
                placeholder="Enter your password"
                className="col-span-3"
                required
              />

              <DialogFooter>
                <Button disabled={!user.email || loading} type="submit">
                  {loading && <Loader2Icon className="animate-spin" />}Submit
                </Button>
              </DialogFooter>
            </form>

      </DialogContent>
    </Dialog>
  );
}
