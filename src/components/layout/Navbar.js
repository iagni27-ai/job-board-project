"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks, siteName } from "@/data/site";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white">
            J
          </span>
          <span className="text-lg font-bold text-slate-900">{siteName}</span>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Tombol Login / Register desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Register
          </Link>
        </div>

        {/* Tombol hamburger (mobile) */}
        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
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
      <div
        id="mobile-menu"
        className={`${isOpen ? "block" : "hidden"} border-t border-slate-200 bg-white md:hidden`}
      >
        <ul className="mx-auto max-w-6xl space-y-1 px-4 py-3 sm:px-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mx-auto flex max-w-6xl gap-3 px-4 pb-4 sm:px-6">
          <Link
            href="/login"
            onClick={closeMenu}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Login
          </Link>
          <Link
            href="/register"
            onClick={closeMenu}
            className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
