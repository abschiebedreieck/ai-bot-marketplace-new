export default function Hero() {
  return (
    <section className="flex flex-col justify-center items-center text-center h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-6">Erstelle & Verkaufe deine eigenen AI Bots</h1>
      <p className="text-xl mb-8">Starte dein SaaS Business direkt ohne Programmierkenntnisse.</p>
      <a href="/marketplace" className="bg-blue-500 px-8 py-4 rounded text-white text-lg hover:bg-blue-600 transition">
        Jetzt starten
      </a>
    </section>
  )
}