"use client";
import Sidebar from "@/app/ui/backend/Sidebar";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DynamicBreadcrumb from "../ui/backend/Breadcrumb";

/* ------------------------------------------------------------------ */
/*  LAYOUT COMPONENT                                                   */
/* ------------------------------------------------------------------ */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-950 text-neutral-200">
      <Sidebar />

      {/* ============ MAIN AREA ============ */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* ---- NAVBAR ---- */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b border-neutral-800 bg-neutral-950/80 px-4 backdrop-blur-md">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <DynamicBreadcrumb />

          <div className="flex-1" />

          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:border-neutral-700 hover:text-neutral-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden md:inline-flex h-5 items-center rounded border border-neutral-700 bg-neutral-800 px-1.5 text-[10px] font-mono text-neutral-500">
              CTRL + K
            </kbd>
          </button>

          {/* Notification */}
          <button className="relative flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500" />
          </button>

          {/* Avatar */}
          <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-500 to-cyan-400 ring-2 ring-neutral-800" />
        </header>

        {/* ---- PAGE CONTENT ---- */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* ============ SEARCH MODAL ============ */}
      {searchOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-[20vh]">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg rounded-xl border border-neutral-800 bg-neutral-900 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-neutral-800 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-neutral-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search books, authors, members..."
                className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <kbd
                onClick={() => setSearchOpen(false)}
                className="cursor-pointer rounded border border-neutral-700 bg-neutral-800 px-2 py-0.5 text-[10px] font-mono text-neutral-500 hover:text-neutral-300"
              >
                ESC
              </kbd>
            </div>
            <div className="px-4 py-8 text-center text-sm text-neutral-600">
              {searchQuery
                ? `No results found for "${searchQuery}"`
                : "Start typing to search..."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
