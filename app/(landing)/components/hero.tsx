export default function Hero() {
  return (
    <section className="container mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 leading-tight">
        Analisis Bicara Berbasis AI
      </h1>

      <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
        Unggah video Anda dan dapatkan analisis kualitas komunikasi secara
        otomatis. Cepat, akurat, dan mudah digunakan.
      </p>

      <div className="mt-10">
        <a
          href="/grading"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Coba Sekarang
        </a>
      </div>
    </section>
  );
}
