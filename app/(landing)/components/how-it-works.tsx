const steps = [
  {
    title: "Select question",
    desc: "Pick the right prompt/rubric or use a team template.",
    time: "~10s",
  },
  {
    title: "Upload video",
    desc: "Drag & drop the recording; language and noise are auto-detected.",
    time: "~30s",
  },
  {
    title: "AI analysis",
    desc: "Intonation, pacing, filler words, and expressions scored in one pass.",
    time: "Realtime",
  },
  {
    title: "Instant response",
    desc: "JSON payload + visual grade ready to preview, share, or iterate.",
    time: "Instant",
  },
];

export default function HowItWorks() {
  return (
    <section id="process" className="relative py-20">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[320px,1fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">How it works</p>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Lightweight flow, premium output.</h2>
            <p className="text-slate-600">
              Select a question, upload your video, and Intervox returns the same response you see in the dashboard:
              score, transcript, and wpm/pause metrics ready for the team.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-blue-400/40 via-cyan-300/20 to-transparent" />
            <div className="space-y-5">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="group relative rounded-2xl border border-blue-100 bg-white p-5 shadow-md shadow-blue-100/40 transition duration-300 hover:-translate-y-1 hover:border-blue-200"
                >
                  <div className="absolute left-0 top-5 -translate-x-1/2">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 text-white text-sm font-semibold shadow-md shadow-blue-400/30">
                      {index + 1}
                    </div>
                  </div>
                  <div className="ml-10">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1">{step.time}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-1 text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
