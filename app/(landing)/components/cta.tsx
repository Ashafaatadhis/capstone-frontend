import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function Cta() {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-6">
        <div className="overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 shadow-xl">
          <div className="relative grid items-center gap-10 px-8 py-12 sm:px-12 lg:grid-cols-[1.2fr,1fr] lg:py-14">
            <div className="space-y-4 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Ready when you are
              </div>
              <h3 className="text-3xl font-semibold sm:text-4xl">Ship clearer speech, faster.</h3>
              <p className="max-w-2xl text-white/80">
                Intervox gives you actionable scores and transcripts within seconds. Launch a question, upload your
                recording, and hand teammates a share-ready JSON + visual grade.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2">
                  <ShieldCheck className="h-4 w-4" />
                  Enterprise-grade security
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  Realtime scoring
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div className="rounded-2xl bg-white p-5 shadow-lg shadow-blue-900/10">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-blue-700">Delivery preview</span>
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700">
                    Ready
                  </span>
                </div>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400" />
                    <div>
                      <p className="font-semibold text-slate-900">Score: 87</p>
                      <p className="text-slate-600">Clarity up, filler words down 12% vs. last run.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-slate-100 px-3 py-2">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                    <div>
                      <p className="font-semibold text-slate-900">Transcript</p>
                      <p className="text-slate-600">Auto-cleaned with highlighted pauses and emphasis markers.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-slate-100 px-3 py-2">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-400" />
                    <div>
                      <p className="font-semibold text-slate-900">Speech analysis</p>
                      <p className="text-slate-600">WPM: 88 · Pauses: 4 · Avg pause: 0.85s · Pacing trend: stable.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <a
                  href="/grading"
                  className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-blue-700 font-semibold shadow-md shadow-blue-900/10 transition hover:-translate-y-0.5"
                >
                  Try Intervox
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#features"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-4 py-3 text-white transition hover:-translate-y-0.5"
                >
                  View features
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
