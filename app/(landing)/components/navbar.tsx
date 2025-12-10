"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold text-blue-600">
          BlueGrade
        </Link>

        <Link href="/grading">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Mulai Analisis
          </Button>
        </Link>
      </div>
    </header>
  );
}
