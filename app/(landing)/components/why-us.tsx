import { Gauge, Sparkles, Shield } from "lucide-react";

const features = [
  {
    title: "Cepat & Otomatis",
    desc: "Analisis selesai hanya dalam hitungan detik.",
    icon: Gauge,
  },
  {
    title: "Akurasi Tinggi",
    desc: "Ditenagai AI untuk hasil yang lebih konsisten.",
    icon: Shield,
  },
  {
    title: "Mudah Digunakan",
    desc: "Upload video → pilih question → selesai.",
    icon: Sparkles,
  },
];

export default function WhyUs() {
  return (
    <section className="container mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-12">
        Kenapa Memilih BlueGrade?
      </h2>

      <div className="grid sm:grid-cols-3 gap-8">
        {features.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <Icon className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
