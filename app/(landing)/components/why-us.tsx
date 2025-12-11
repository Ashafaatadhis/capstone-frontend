import { Brain, Gauge, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    title: "Adaptive rubric",
    desc: "Dynamic rubrics for any scenario: pitch decks, customer calls, or interviews.",
    icon: Brain,
    tone: "from-indigo-400/25 via-sky-500/15 to-cyan-400/20",
  },
  {
    title: "Realtime AI coach",
    desc: "Feedback on intonation, pacing, filler words, and gestures without delay.",
    icon: Sparkles,
    tone: "from-cyan-400/25 via-blue-500/20 to-indigo-500/20",
  },
  {
    title: "Low latency",
    desc: "Sub-300ms streaming with share-ready summaries for your team.",
    icon: Gauge,
    tone: "from-amber-300/25 via-orange-400/15 to-pink-500/15",
  },
  {
    title: "Enterprise security",
    desc: "End-to-end encryption, auto-expiring data, and team access controls.",
    icon: ShieldCheck,
    tone: "from-emerald-400/25 via-cyan-500/15 to-blue-600/15",
  },
];

export default function WhyUs() {
  return (
    <section id="features" className="relative py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Why Intervox</p>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">AI that senses your speaking rhythm</h2>
          <p className="max-w-2xl text-slate-600">
            From elevator pitches to product demos, Intervox tracks what matters: vocal energy, clarity, and audience
            response.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br ${item.tone} p-6 shadow-lg shadow-blue-100/40`}
              >
                <div className="absolute inset-0 opacity-0 blur-3xl transition duration-500 group-hover:opacity-60" />
                <div className="relative flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-white text-blue-600 shadow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-blue-600">2025 ready</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
