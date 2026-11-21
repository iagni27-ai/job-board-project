"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks, siteName } from "@/data/site";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e4dc] bg-[#fbfaf7]/90 backdrop-blur-md">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[#1f1b16] transition-opacity hover:opacity-85 focus:outline-none"
          onClick={closeMenu}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1f1b16] font-mono text-xs font-medium text-[#fbfaf7]">
            JB
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-[#1f1b16]">
            {siteName}
          </span>
          <span className="hidden rounded bg-[#f3efe6] px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-[#7b7266] uppercase sm:inline-block">
            Arsip ID
          </span>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[13px] font-medium text-[#5e554a] transition-colors hover:text-[#1f1b16]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Tombol Akses Akun Desktop */}
        <div className="hidden items-center gap-2.5 md:flex">
          <Link
            href="/login"
            className="rounded-lg px-3.5 py-1.5 text-[13px] font-medium text-[#5e554a] transition-colors hover:text-[#1f1b16]"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="rounded-lg border border-[#1f1b16] bg-[#1f1b16] px-3.5 py-1.5 text-[13px] font-medium text-[#faf9f5] transition-colors hover:bg-[#38332b] active:scale-[0.98]"
          >
            Daftar Akun
          </Link>
        </div>

        {/* Hamburger mobile */}
        <button
          type="button"
          className="rounded-md p-1.5 text-[#5e554a] hover:bg-[#f3efe6] md:hidden focus:outline-none"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Menu mobile */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="border-b border-[#e8e4dc] bg-[#fbfaf7] px-4 pt-2 pb-5 md:hidden"
        >
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-[#5e554a] hover:bg-[#f3efe6] hover:text-[#1f1b16]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2 border-t border-[#e8e4dc] pt-4">
            <Link
              href="/login"
              onClick={closeMenu}
              className="flex-1 rounded-lg border border-[#e8e4dc] bg-white py-2 text-center text-xs font-medium text-[#1f1b16]"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              onClick={closeMenu}
              className="flex-1 rounded-lg bg-[#1f1b16] py-2 text-center text-xs font-medium text-[#faf9f5]"
            >
              Daftar Akun
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
