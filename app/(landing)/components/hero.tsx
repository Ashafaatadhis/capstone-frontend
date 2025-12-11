import { ArrowRight, Play, Sparkles } from "lucide-react";

const stats = [
  { value: "98%", label: "vocal analytics accuracy" },
  { value: "24/7", label: "always-on coaching" },
  { value: "3x", label: "faster to presentation-ready" },
];

const signals = [
  { title: "Clarity", pct: 92, accent: "from-cyan-400 to-blue-500" },
  { title: "Confidence", pct: 88, accent: "from-violet-400 to-fuchsia-500" },
  { title: "Pacing", pct: 76, accent: "from-amber-300 to-orange-400" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.16),transparent_32%)]" />
      <div className="absolute inset-x-0 -bottom-40 h-80 bg-gradient-to-t from-blue-200/40 via-transparent to-transparent blur-3xl" />

      <div className="container relative mx-auto px-6 py-24 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm text-blue-700 shadow-lg shadow-blue-200/50 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span>AI Speech Intelligence - 2025</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Next-Gen Speech Analysis
                </span>
              </h1>
              <p className="max-w-2xl text-lg text-slate-700">
                Intervox blends multimodal AI to read intonation, tempo, and gestures in one dashboard. Pick a question,
                upload a video, then receive the JSON response and visual grade in seconds.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/grading"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 px-6 py-3 text-white font-semibold shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5"
              >
                Start now
                <ArrowRight className="h-4 w-4 transition duration-200 group-hover:translate-x-0.5" />
              </a>

              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-6 py-3 text-blue-800 backdrop-blur transition hover:border-blue-300"
              >
                <Play className="h-4 w-4" />
                See flow
              </a>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-slate-600">
              {stats.map((item, index) => (
                <div key={index}>
                  <div className="text-3xl font-semibold text-slate-900">{item.value}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-16 -z-10 bg-gradient-to-br from-blue-200/60 via-white to-cyan-100/60 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-6 shadow-2xl shadow-blue-200/60 backdrop-blur">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                  <Sparkles className="h-4 w-4 text-cyan-300" />
                  Live coaching
                </div>
                <span>Realtime stream</span>
              </div>

              <div className="mt-6 space-y-4">
                {signals.map((signal) => (
                  <div key={signal.title} className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                    <div className="flex items-center justify-between text-sm text-slate-700">
                      <span>{signal.title}</span>
                      <span className="font-semibold text-slate-900">{signal.pct}%</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${signal.accent}`}
                        style={{ width: `${signal.pct}%` }}
                      />
                    </div>
                  </div>
                ))}

                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-transparent p-5 text-slate-700">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Quick insight</span>
                    <span className="text-emerald-500">+12s</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-700">
                    Volume steady, tempo up 6% in the final minute. Add micro-pauses and emphasize keywords to keep your
                    audience engaged.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
