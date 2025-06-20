"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Calendar,
  Contact,
  Flag,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  SquareStack,
  User,
  UserCog,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth-context";
import { Router } from "next/router";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { logout, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    if (!user?.email) return;

    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "subAdmins", user.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserRole(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, [user]);

  const routes = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      roles: ["admin"], // only for full admin
    },
    {
      name: "Users",
      path: "/users",
      icon: <User className="h-5 w-5" />,
      roles: ["admin"],
    },
    {
      name: "Events",
      path: "/events",
      icon: <Calendar className="h-5 w-5" />,
      roles: ["admin", "subAdmin"], // visible to both
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <Flag className="h-5 w-5" />,
      roles: ["admin"],
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings className="h-5 w-5" />,
      roles: ["admin"],
    },
    {
      name: "User's queries",
      path: "/userQueries",
      icon: <Contact className="h-5 w-5" />,
      roles: ["admin"],
    },
    {
      name: "Sub-Admins",
      path: "/admin",
      icon: <UserCog className="h-5 w-5" />,
      roles: ["admin"],
    },
    {
      name: "Category",
      path: "/category",
      icon: <SquareStack className="h-5 w-5" />,
      roles: ["admin"],
    },
  ];

  const filteredItems =
    userRole?.role === "admin"
      ? routes // show all items
      : routes.filter((item) => {
          if (item.roles) {
            return item.roles.includes(userRole?.role);
          }
          return true; // show if no restriction
        });

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="flex min-h-screen flex-col bg-black">
      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="border-gray-800 bg-gray-900 p-0">
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b border-gray-800 px-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-semibold text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                <span>Admin Panel</span>
              </Link>
            </div>
            <nav className="flex-1 overflow-auto py-4">
              <ul className="grid gap-1 px-2">
                {filteredItems.map((route) => (
                  <li key={route.path}>
                    <Link
                      href={route.path}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive(route.path)
                          ? "bg-gray-800 text-white"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      {route.icon}
                      {route.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-gray-800 p-4">
              <button
                onClick={() => setShowLogoutDialog(true)}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden border-r border-gray-800 bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex h-14 items-center border-b border-gray-800 px-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span>Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <ul className="grid gap-1 px-2">
            {filteredItems.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(route.path)
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {route.icon}
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-gray-800 p-4">
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-gray-800 bg-gray-900 px-4 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="flex flex-1 items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                    <AvatarFallback className="bg-gray-800 text-white">
                      AD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-gray-900 text-white"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem className="hover:bg-gray-800">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem className="hover:bg-gray-800">
                  <button
                    onClick={() => setShowLogoutDialog(true)}
                    className="flex w-full items-center"
                  >
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 inset-0 bg-[radial-gradient(#4b4b4b33_1px,transparent_1px)] [background-size:20px_20px] bg-[#121212]">
          {children}
        </main>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to logout from the admin panel?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setShowLogoutDialog(false)}
              className="hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                try {
                  await logout();
                  setShowLogoutDialog(false);
                  router.push("/");
                } catch (error) {
                  console.error("Logout failed:", error);
                }
              }}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
