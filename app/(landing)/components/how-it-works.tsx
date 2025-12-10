const steps = [
  { step: "1", title: "Upload Video" },
  { step: "2", title: "Pilih Question" },
  { step: "3", title: "Dapatkan Analisis" },
];

export default function HowItWorks() {
  return (
    <section className="bg-white border-t py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Cara Kerja BlueGrade
        </h2>

        <div className="grid sm:grid-cols-3 gap-10">
          {steps.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-blue-600 text-4xl font-bold mb-4">
                {s.step}
              </div>
              <h3 className="text-xl font-semibold">{s.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
