export default function Features() {
  return (
    <section className="bg-white text-black py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div>
          <h3 className="text-2xl font-bold mb-4">Einfacher Bot Upload</h3>
          <p>Stelle deine eigenen API-Bots innerhalb von Minuten online.</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Monatliche Einnahmen</h3>
          <p>Verdiene passiv durch Abonnenten deiner Bots.</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">PayPal & Stripe integriert</h3>
          <p>Direkte Zahlung und automatische Freischaltung für Kunden.</p>
        </div>
      </div>
    </section>
  )
}