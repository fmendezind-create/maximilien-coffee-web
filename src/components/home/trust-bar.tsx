export function TrustBar() {
  return (
    <div className="bg-white-warm border-b border-cream-3">
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-5 divide-x divide-cream-3">

        <TrustItem
          icon={
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
              <path d="M6 14h20M6 18h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <rect x="4" y="10" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 10V8a6 6 0 0112 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          }
          text="Pago seguro"
          sub="Wompi · SSL"
        />

        <TrustItem
          icon={
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
              <path d="M4 12h18M4 12l3-6h14l3 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 12v10a2 2 0 002 2h20a2 2 0 002-2V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="10" cy="26" r="2" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="22" cy="26" r="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 26h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          }
          text="Envío gratis"
          sub="En pedidos +$60.000"
        />

        <TrustItem
          icon={
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
              <path d="M16 4L4 9v8c0 6.627 5.373 10.627 12 12 6.627-1.373 12-5.373 12-12V9L16 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 16l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          text="Garantía total"
          sub="Reembolso sin preguntas"
        />

        <TrustItem
          icon={
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
              <path d="M8 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16 12V8M12 13l-2-3M20 13l2-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6 20h20M8 24h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          }
          text="Tostado fresco"
          sub="Máximo 7 días antes"
        />

        <TrustItem
          icon={
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
              <path d="M16 4c6.627 0 12 5.373 12 12s-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M16 10v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 4.5C8 6.5 7 9 7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          }
          text="Origen único"
          sub="Santa María · Huila"
        />

      </div>
    </div>
  );
}

function TrustItem({ icon, text, sub }: { icon: React.ReactNode; text: string; sub: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 px-6 py-6 text-center">
      <span className="text-ink/70" aria-hidden="true">{icon}</span>
      <div>
        <div className="text-[12px] font-semibold text-ink tracking-[0.04em]">{text}</div>
        <div className="text-[10px] text-brown-light mt-0.5">{sub}</div>
      </div>
    </div>
  );
}
