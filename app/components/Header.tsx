// "use client";

// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { Home, User } from "lucide-react";
// import { useNotification } from "./Notification";

// export default function Header() {
//   const { data: session } = useSession();
//   const { showNotification } = useNotification();

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       showNotification("Signed out successfully", "success");
//     } catch {
//       showNotification("Failed to sign out", "error");
//     }
//   };

//   return (
//     <div className="navbar bg-base-300 sticky top-0 z-40">
//       <div className="container mx-auto">
//         <div className="flex-1 px-2 lg:flex-none">
//           <Link
//             href="/"
//             className="btn btn-ghost text-xl gap-2 normal-case font-bold"
//             prefetch={true}
//             onClick={() => showNotification("Welcome to ImageKit Shop", "info")}
//           >
//             <Home className="w-5 h-5" />
//             ImageKit Shop
//           </Link>
//         </div>
//         <div className="flex flex-1 justify-end px-2">
//           <div className="flex items-stretch gap-2">
//             <div className="dropdown dropdown-end">
//               <div
//                 tabIndex={0}
//                 role="button"
//                 className="btn btn-ghost btn-circle"
//               >
//                 <User className="w-5 h-5" />
//               </div>
//               <ul
//                 tabIndex={0}
//                 className="dropdown-content z-[1] shadow-lg bg-base-100 rounded-box w-64 mt-4 py-2"
//               >
//                 {session ? (
//                   <>
//                     <li className="px-4 py-1">
//                       <span className="text-sm opacity-70">
//                         {session.user?.email?.split("@")[0]}
//                       </span>
//                     </li>
//                     <div className="divider my-1"></div>
//                     {session.user?.role === "admin" && (
//                       <li>
//                         <Link
//                           href="/admin"
//                           className="px-4 py-2 hover:bg-base-200 block w-full"
//                           onClick={() =>
//                             showNotification(
//                               "Welcome to Admin Dashboard",
//                               "info"
//                             )
//                           }
//                         >
//                           Admin Dashboard
//                         </Link>
//                       </li>
//                     )}
//                     <li>
//                       <Link
//                         href="/orders"
//                         className="px-4 py-2 hover:bg-base-200 block w-full"
//                       >
//                         My Orders
//                       </Link>
//                     </li>
//                     <li>
//                       <button
//                         onClick={handleSignOut}
//                         className="px-4 py-2 text-error hover:bg-base-200 w-full text-left"
//                       >
//                         Sign Out
//                       </button>
//                     </li>
//                   </>
//                 ) : (
//                   <li>
//                     <Link
//                       href="/login"
//                       className="px-4 py-2 hover:bg-base-200 block w-full"
//                       onClick={() =>
//                         showNotification("Please sign in to continue", "info")
//                       }
//                     >
//                       Login
//                     </Link>
//                   </li>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { Home, User } from "lucide-react";
// import { useNotification } from "./Notification";

// export default function Header() {
//   const { data: session } = useSession();
//   const { showNotification } = useNotification();

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       showNotification("Signed out successfully", "success");
//     } catch {
//       showNotification("Failed to sign out", "error");
//     }
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
//       <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//         <Link
//           href="/"
//           className="flex items-center text-xl font-semibold text-gray-800 hover:text-gray-900 transition gap-2"
//           onClick={() => showNotification("Welcome to ImageKit Shop", "info")}
//         >
//           <Home className="w-5 h-5" />
//           ImageKit Shop
//         </Link>

//         <div className="relative">
//           <div className="dropdown dropdown-end">
//             <button
//               tabIndex={0}
//               role="button"
//               className="btn btn-outline btn-sm rounded-full p-2 hover:bg-gray-100 transition"
//             >
//               <User className="w-5 h-5 text-gray-700" />
//             </button>
//             <ul
//               tabIndex={0}
//               className="dropdown-content right-0 mt-2 p-2 bg-white border border-gray-200 rounded-lg shadow-md w-64 z-50"
//             >
//               {session ? (
//                 <>
//                   <li className="px-4 py-1">
//                     <span className="text-sm text-gray-500">
//                       {session.user?.email?.split("@")[0]}
//                     </span>
//                   </li>
//                   <div className="border-t my-2"></div>
//                   {session.user?.role === "admin" && (
//                     <li>
//                       <Link
//                         href="/admin"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition"
//                         onClick={() =>
//                           showNotification("Welcome to Admin Dashboard", "info")
//                         }
//                       >
//                         Admin Dashboard
//                       </Link>
//                     </li>
//                   )}
//                   <li>
//                     <Link
//                       href="/orders"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition"
//                     >
//                       My Orders
//                     </Link>
//                   </li>
//                   <li>
//                     <button
//                       onClick={handleSignOut}
//                       className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left rounded-md transition"
//                     >
//                       Sign Out
//                     </button>
//                   </li>
//                 </>
//               ) : (
//                 <li>
//                   <Link
//                     href="/login"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition"
//                     onClick={() =>
//                       showNotification("Please sign in to continue", "info")
//                     }
//                   >
//                     Login
//                   </Link>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, ImageIcon, User } from "lucide-react";
import { useNotification } from "./Notification";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
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
    // <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
    //   <div className="container mx-auto px-4 py-3 flex items-center justify-between">
    //     <Link
    //       href="/"
    //       className="flex items-center text-2xl font-bold text-indigo-700 hover:text-indigo-800 transition gap-2"
    //       onClick={() => showNotification("Welcome to ImageKit Shop", "info")}
    //     >
    //       {/* <Home className="w-5 h-5" /> */}
    //       <ImageIcon className="w-6 h-6" />
    //       AxitPix
    //     </Link>

    //     <div className="relative" ref={dropdownRef}>
    //       <button
    //         onClick={() => setDropdownOpen((prev) => !prev)}
    //         className="px-5 py-2.5 font-medium  duration-300 ease-in-out transform cursor-pointer bg-gray-200 rounded-full p-2 hover:bg-gray-100 transition"
    //       >
    //         <User className="w-5 h-5  text-gray-700" />
    //       </button>

    //       {dropdownOpen && (
    //         <ul className="absolute right-0 mt-2 p-2 bg-white border border-gray-200 rounded-lg shadow-md w-64 z-50">
    //           {session ? (
    //             <>
    //               <li className="px-4 py-1">
    //                 <span className="text-sm text-gray-500">
    //                   {session.user?.email?.split("@")[0]}
    //                 </span>
    //               </li>
    //               <div className="border-t my-2"></div>
    //               {session.user?.role === "admin" && (
    //                 <li>
    //                   <Link
    //                     href="/admin"
    //                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition"
    //                     onClick={() => {
    //                       showNotification("Welcome to Admin Dashboard", "info");
    //                       setDropdownOpen(false);
    //                     }}
    //                   >
    //                     Admin Dashboard
    //                   </Link>
    //                 </li>
    //               )}
    //               <li>
    //                 <Link
    //                   href="/orders"
    //                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition"
    //                   onClick={() => setDropdownOpen(false)}
    //                 >
    //                   My Orders
    //                 </Link>
    //               </li>
    //               <li>
    //                 <button
    //                   onClick={() => {
    //                     handleSignOut();
    //                     setDropdownOpen(false);
    //                   }}
    //                   className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left rounded-md transition"
    //                 >
    //                   Sign Out
    //                 </button>
    //               </li>
    //             </>
    //           ) : (
    //             <li>
    //               <Link
    //                 href="/login"
    //                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition"
    //                 onClick={() => {
    //                   showNotification("Please sign in to continue", "info");
    //                   setDropdownOpen(false);
    //                 }}
    //               >
    //                 Login
    //               </Link>
    //             </li>
    //           )}
    //         </ul>
    //       )}
    //     </div>
    //   </div>
    // </header>
    <header className="sticky top-0 z-50 bg-blue-200 shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-3xl font-extrabold text-indigo-500  hover:text-indigo-700  transition gap-2"
          onClick={() => showNotification("Welcome to ImageKit Shop", "info")}
        >
          <ImageIcon className="w-8 h-8" />
          AxitPix
        </Link>

        <div className="relative" ref={dropdownRef}>
          
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="  px-5 py-2.5 font-medium  duration-300 ease-in-out transform cursor-pointer bg-indigo-200 rounded-full p-2 hover:bg-gray-100 transition"
          >
            <User className="w-5 h-5 text-white" />
          </button>

          {dropdownOpen && (
            <ul className="absolute right-0 mt-4 w-64 bg-blue-100  border border-indigo-300  rounded-lg shadow-lg z-50 overflow-hidden">
              {session ? (
                <>
                  <li className="px-4 py-2 text-sm text-gray-500 ">
                    {session.user?.email?.split("@")[0]}
                  </li>
                  <hr className="border-t  my-1" />
                  {session.user?.role === "admin" && (
                    <li>
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-indigo-500 bg-blue-100 hover:bg-blue-200  transition"
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
                  <li>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-indigo-500 bg-blue-100 hover:bg-blue-200  transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Orders
                    </Link>
                  </li>
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
                    <label className="block w-full text-left px-4 py-2 text-sm text-red-600 bg-blue-100 hover:bg-blue-200  transition">Sign Out</label>
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
