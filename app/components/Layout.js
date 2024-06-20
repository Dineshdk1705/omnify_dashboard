"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const currentPath = usePathname();

  if (!hydrated) {
    return null;
  }

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen p-4 h-screen">
      {/* Sidebar */}
      <div
        className={`bg-[#F8FAFC] h-screen text-black transition-all duration-300 flex flex-col justify-between py-3 ${
          isCollapsed ? "w-16" : "w-60"
        }`}
      >
        <nav className={`p-2`}>
          <div className="flex justify-between p-2">
            <div className="flex items-center">
              <Image
                src="/assets/icons/logo.svg"
                alt="add"
                width={16}
                height={16}
                className="mr-3 font-bold bg-slate-300"
              />
              {!isCollapsed && <h2 className="font-bold">Front-Desk</h2>}
            </div>
            <button
              className="p-4 focus:outline-none"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                ">"
              ) : (
                <Image
                  src="/assets/icons/drawer.svg"
                  alt="add"
                  width={16}
                  height={16}
                  className="mr-3 font-bold"
                />
              )}
            </button>
          </div>
          <ul className="flex flex-col gap-3">
            <Link
              href="/"
              className={`${
                currentPath === "/"
                  ? "bg-white border-b-2 border-gray-200 rounded-md"
                  : ""
              } flex items-center h-7 p-2`}
            >
              <Image
                src="/assets/icons/inbox.svg"
                alt="add"
                width={16}
                height={16}
                className="mr-3 font-bold"
              />
              {!isCollapsed && <h3 className="text-[12px]">Orders</h3>}
            </Link>
            <Link
              href="/subscriptions"
              className={`${
                currentPath === "/subscriptions"
                  ? "bg-white border-b-2 border-gray-200 rounded-md"
                  : ""
              } flex items-center h-7 p-2`}
            >
              <Image
                src="/assets/icons/subscription.svg"
                alt="add"
                width={16}
                height={16}
                className="mr-3 font-bold"
              />
              {!isCollapsed && <h3 className="text-[12px]">Subscriptions</h3>}
            </Link>
            <Link
              href="/calendar"
              className={`${
                currentPath === "/calendar"
                  ? "bg-white border-b-2 border-gray-200 rounded-md"
                  : ""
              } flex items-center h-7 p-2`}
            >
              <Image
                src="/assets/icons/calendar.svg"
                alt="add"
                width={16}
                height={16}
                className="mr-3 font-bold"
              />
              {!isCollapsed && <h3 className="text-[12px]">Calendar</h3>}
            </Link>
            <Link
              href="/waitlist"
              className={`${
                currentPath === "/waitlist"
                  ? "bg-white border-b-2 border-gray-200 rounded-md"
                  : ""
              } flex items-center ml-1 h-7 p-2`}
            >
              <Image
                src="/assets/icons/waitlist.svg"
                alt="add"
                width={12}
                height={12}
                className="mr-3 font-bold"
              />
              {!isCollapsed && <h3 className="text-[12px]">Waitlist</h3>}
            </Link>
          </ul>
        </nav>

        <nav className={`p-2`}>
          <ul className="flex flex-col gap-3">
            <Link
              href="/dashboard"
              className={`${
                currentPath === "/dashboard"
                  ? "bg-white border-b-2 border-gray-200 rounded-md"
                  : ""
              } flex items-center h-7 p-2`}
            >
              <Image
                src="/assets/icons/dashboard.svg"
                alt="add"
                width={16}
                height={16}
                className="mr-3 font-bold"
              />
              {!isCollapsed && <h3 className="text-[12px]">Dashboard</h3>}
            </Link>
            <Link
              href="/user"
              className={`${
                currentPath === "/user"
                  ? "bg-white border-b-2 border-gray-200 rounded-md"
                  : ""
              } flex justify-between items-center ml-1 h-10 p-1`}
            >
              <div className="flex">
                <Image
                  src="/assets/icons/avatar.svg"
                  alt="add"
                  width={30}
                  height={30}
                  className="mr-3 font-bold"
                />
                {!isCollapsed && (
                  <div>
                    <h3 className="text-[12px]">Admin name</h3>
                    <h4 className="text-[12px] text-[#64748B]">
                      admin123@omnify.com
                    </h4>
                  </div>
                )}
              </div>
              {!isCollapsed && (
                <Image
                  src="/assets/icons/arrow-down.svg"
                  alt="add"
                  width={11}
                  height={11}
                  className="font-bold"
                />
              )}
            </Link>
            <Link
              href="/waitlist"
              className={`${
                currentPath === "/waitlist"
                  ? "bg-white border-b-2 border-gray-200 rounded-md"
                  : ""
              } flex items-center ml-1 h-10 p-2`}
            >
              <Image
                src="/assets/icons/help-circle.svg"
                alt="add"
                width={14}
                height={14}
                className="mr-3 font-bold"
              />
              {!isCollapsed && (
                <div>
                  <h3 className="text-[12px]">Help center</h3>
                  <h4 className="text-[12px] text-[#64748B]">
                    @2024 Omnify.Inc
                  </h4>
                </div>
              )}
            </Link>
          </ul>
        </nav>
      </div>

      <main className="flex-1 p-3 bg-white rounded-lg">{children}</main>
    </div>
  );
}
