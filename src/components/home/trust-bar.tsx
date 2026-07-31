"use client";

export function TrustBar() {
  return (
    <div className="bg-ink border-b border-white-warm/10 overflow-x-auto">
      <div className="flex items-center justify-start md:justify-center gap-0 px-0 min-w-max md:min-w-0 max-w-[1100px] mx-auto divide-x divide-white-warm/10">
        <TrustItem
          icon={
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 2L2 6v4c0 4.418 3.582 7.418 8 8 4.418-.582 8-3.582 8-8V6l-8-4z"/>
              <path d="M7 10l2 2 4-4"/>
            </svg>
          }
          text="Envío gratis"
          sub="+$60.000"
        />
        <TrustItem
          icon={
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10h14M10 3l7 7-7 7"/>
            </svg>
          }
          text="Garantía total"
          sub="Reembolso sin preguntas"
        />
        <TrustItem
          icon={
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="8" width="14" height="10" rx="2"/>
              <path d="M7 8V6a3 3 0 016 0v2"/>
            </svg>
          }
          text="Pago 100% seguro"
          sub="Encriptado con SSL"
        />
        <TrustItem
          icon={
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="10" cy="10" r="8"/>
              <path d="M10 6v4l2 2"/>
            </svg>
          }
          text="Tostado fresco"
          sub="Máximo 7 días antes"
        />
        <TrustItem
          icon={
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z"/>
              <path d="M10 6c2.209 0 4 .895 4 2s-1.791 2-4 2-4-.895-4-2 1.791-2 4-2z"/>
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
    <div className="flex items-center gap-3 px-6 py-3.5 shrink-0">
      <span className="text-gold" aria-hidden="true">{icon}</span>
      <div>
        <div className="text-[12px] font-semibold text-cream tracking-[0.04em]">{text}</div>
        <div className="text-[10px] text-cream/50 mt-0.5">{sub}</div>
      </div>
    </div>
  );
}
