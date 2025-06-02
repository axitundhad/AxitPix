"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ImageIcon, User } from "lucide-react";
import { useNotification } from "./Notification";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({redirect: false});
      showNotification("Signed out successfully", "success");
      router.push("/");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); 

  return (
    <header className="sticky top-0 z-50 bg-blue-200 shadow-xl border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-3xl font-extrabold text-indigo-900  hover:text-indigo-700  transition gap-2"
          onClick={() =>
            showNotification("Welcome to AxitPix ImageKit Shop", "info")
          }
        >
          <ImageIcon className="w-8 h-8" />
          AxitPix
        </Link>

        <div className="relative flex flex-row space-x-5" ref={dropdownRef}>
          <Link
            href="/aboutus"
            className="flex items-center text-2xl font-bold text-indigo-900  hover:text-indigo-700  transition gap-2"
            onClick={() =>
              showNotification(
                "Thank you for visiting – Here's more about who we are and why we created AxitPix.",
                "info"
              )
            }
          >
            About
          </Link>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="  px-5 py-2.5 font-medium  duration-300 ease-in-out transform cursor-pointer bg-indigo-200 rounded-full p-2 hover:bg-gray-100 transition"
          >
            <User className="w-5 h-5 text-white" />
          </button>

          {dropdownOpen && (
            <ul className="absolute right-0 mt-14 min-w-64 bg-blue-100  border border-indigo-300  rounded-lg shadow-lg z-50 overflow-hidden">
              {session ? (
                <>
                  <li className="px-4 py-2 text-sm text-gray-500 ">
                    {session.user?.email}
                  </li>
                  <hr className="border-t  my-1" />
                  {session.user?.role === "admin" && (
                    <li>
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-indigo-800 bg-blue-100 hover:bg-blue-200  transition"
                        onClick={() => {
                          showNotification(
                            "Welcome to Admin Dashboard",
                            "info"
                          );
                          setDropdownOpen(false);
                        }}
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  {session.user?.role === "admin" && (
                    <li>
                      <Link
                        href="/selling"
                        className="block px-4 py-2 text-sm text-indigo-800 bg-blue-100 hover:bg-blue-200  transition"
                        onClick={() => {
                          showNotification(
                            "Welcome to Total Selling Dashboard",
                            "info"
                          );
                          setDropdownOpen(false);
                        }}
                      >
                        Total Selling
                      </Link>
                    </li>
                  )}
                  {session.user?.role === "user" && (
                    <li>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-indigo-800 bg-blue-100 hover:bg-blue-200  transition"
                        onClick={() => setDropdownOpen(false)}
                      >
                        My Orders
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setDropdownOpen(false);
                      }}
                      className="absolute opacity-0 block w-full text-left px-4 py-2 text-sm text-red-600   transition"
                    >
                      Sign Out
                    </button>
                    <label className="block w-full text-left px-4 py-2 text-sm text-red-600 bg-blue-100 hover:bg-blue-200  transition">
                      Sign Out
                    </label>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-sm font-semibold text-indigo-600 bg-blue-100  hover:bg-blue-200  transition"
                    onClick={() => {
                      showNotification("Please sign in to continue", "info");
                      setDropdownOpen(false);
                    }}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
