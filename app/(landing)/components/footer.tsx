export default function Footer() {
  return (
    <footer className="border-t border-blue-100 bg-white/90 py-10 backdrop-blur">
      <div className="container mx-auto flex flex-col gap-4 px-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-slate-900">
          <span className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 px-2 py-1 text-xs font-semibold text-white">
            Intervox
          </span>
          <span className="text-slate-500">(c) {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <div className="flex gap-4">
          <a href="#features" className="transition hover:text-slate-900">
            Features
          </a>
          <a href="#process" className="transition hover:text-slate-900">
            Flow
          </a>
          <a href="/dashboard" className="transition hover:text-slate-900">
            Dashboard
          </a>
        </div>
      </div>
    </footer>
  );
}
