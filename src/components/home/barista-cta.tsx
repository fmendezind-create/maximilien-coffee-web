export function BaristaCTA() {
  return (
    <div
      className="bg-cream py-12 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-b border-cream-3 text-center md:text-left"
      role="complementary"
      aria-labelledby="barista-title"
    >
      <div className="flex flex-col md:flex-row items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-ink flex items-center justify-center text-[26px] shrink-0 border border-gold/30" aria-hidden="true">
          ☕
        </div>
        <div>
          <h2 id="barista-title" className="font-display text-[22px] md:text-[26px] font-normal text-ink mb-1.5">
            ¿No sabes cuál elegir?
          </h2>
          <p className="text-sm font-light text-brown-light max-w-[380px]">
            Nuestro Barista IA te guía al café perfecto en 3 preguntas. Gratis, sin registro.
          </p>
        </div>
      </div>
      <button
        className="w-full md:w-auto px-8 py-4 bg-ink text-gold-pale text-[11px] font-semibold tracking-[0.16em] uppercase whitespace-nowrap hover:bg-gold hover:text-ink transition-colors active:scale-[0.98]"
        aria-label="Abrir chat con el Barista IA de Maximilien Coffee"
      >
        Hablar con el Barista →
      </button>
    </div>
  );
}
