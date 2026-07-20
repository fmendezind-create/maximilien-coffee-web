"use client";
import React from "react";

export function TrustBar() {
  return (
    <div className="bg-cream border-b border-cream-3 overflow-x-auto" role="complementary" aria-label="Garantías">
      <div className="flex items-center justify-start md:justify-around gap-6 md:gap-0 px-6 md:px-10 py-3.5 min-w-max md:min-w-0 max-w-[1100px] mx-auto">
        
        <TrustItem
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="1" y="8" width="6" height="8" rx="1"/>
            </svg>
          }
          text="Envío gratis +$80.000"
          sub="$5.000 en pedidos menores"
        />

        <Divider />

        <TrustItem
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          text="Garantía total"
          sub="Reembolso sin preguntas"
        />

        <Divider />

        <TrustItem
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 8v4l2 2"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
          }
          text="Tostado fresco"
          sub="Máximo 7 días antes"
        />

        <Divider />

        <TrustItem
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          }
          text="Pago 100% seguro"
          sub="Encriptado con SSL"
        />

        <Divider />

        <TrustItem
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity=".2"/>
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
    <div className="flex items-center gap-2.5 shrink-0">
      <span className="text-gold" aria-hidden="true">{icon}</span>
      <div>
        <div className="text-[11.5px] font-medium text-brown">{text}</div>
        <div className="text-[10px] text-brown-light">{sub}</div>
      </div>
    </div>
  );
}

function Divider() {
  return <span className="hidden md:block w-px h-6 bg-cream-3 shrink-0" aria-hidden="true" />;
}
