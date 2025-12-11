"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="container relative mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner shadow-blue-100">
            <Sparkles className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="text-base font-semibold text-slate-900">
              Intervox
            </div>
            <p className="text-xs text-slate-500">AI Speech Studio</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          <Link href="#features" className="transition hover:text-slate-900">
            Features
          </Link>
          <Link href="#process" className="transition hover:text-slate-900">
            How it works
          </Link>
          <Link href="/dashboard" className="transition hover:text-slate-900">
            Dashboard
          </Link>
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <Link href="/grading">
            <Button className="rounded-full text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 font-semibold shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5">
              Try for free
            </Button>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div
          className={`md:hidden absolute left-0 right-0 top-16 border-b border-slate-200 bg-white shadow-lg transition-opacity ${
            open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="flex flex-col gap-3 px-6 py-4 text-sm text-slate-700">
            <Link href="#features" onClick={() => setOpen(false)} className="hover:text-slate-900">
              Features
            </Link>
            <Link href="#process" onClick={() => setOpen(false)} className="hover:text-slate-900">
              How it works
            </Link>
            <Link href="/dashboard" onClick={() => setOpen(false)} className="hover:text-slate-900">
              Dashboard
            </Link>
            <Link href="/grading" onClick={() => setOpen(false)}>
              <Button className="mt-1 w-full rounded-full text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 font-semibold shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5">
                Try for free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
