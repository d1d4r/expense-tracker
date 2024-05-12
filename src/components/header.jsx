import Link from "next/link";
import React from "react";
import { SheetContent, SheetTrigger, Sheet } from "./ui/sheet";
import {
  MenuIcon,
  Package2Icon,
  SearchIcon,
  UserCircleIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
  return (
    <header className="flex items-center h-16 gap-4 px-4 border-b bg-background md:px-6">
      <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          href="#"
        >
          <Package2Icon className="w-6 h-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          className="transition-colors text-foreground hover:text-foreground"
          href="/"
        >
          Dashboard
        </Link>
        <Link
          className="transition-colors text-muted-foreground hover:text-foreground"
          href="/transactions"
        >
          Transactions
        </Link>
        <Link
          className="transition-colors text-muted-foreground hover:text-foreground"
          href="/categories"
        >
          Category
        </Link>
        <Link
          className="transition-colors text-muted-foreground hover:text-foreground"
          href="/analytics"
        >
          Analytics
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="shrink-0 md:hidden" size="icon" variant="outline">
            <MenuIcon className="w-5 h-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              className="flex items-center gap-2 text-lg font-semibold"
              href="#"
            >
              <Package2Icon className="w-6 h-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link className="hover:text-foreground" href="/">
              Dashboard
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground"
              href="#"
            >
              Transactions
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground"
              href="/categories"
            >
              Category
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground"
              href="analytics"
            >
              Analytics
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="flex-1 ml-auto sm:flex-initial">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              placeholder="Search products..."
              type="search"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full" size="icon" variant="secondary">
              <UserCircleIcon className="w-5 h-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
