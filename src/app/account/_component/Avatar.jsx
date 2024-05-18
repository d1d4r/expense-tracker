"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Avatar() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full" size="icon" variant="secondary">
          <UserCircleIcon className="w-5 h-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {user && (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button
                onClick={() => signOut()}
                variant="destructive"
                className="w-full"
              >
                Sign Out
              </Button>
            </DropdownMenuItem>
          </>
        )}
        {!user && (
          <>
            <DropdownMenuItem asChild>
              <Button onClick={() => signIn()} className="w-full">
                Sign In
              </Button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
