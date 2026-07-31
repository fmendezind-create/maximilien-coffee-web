"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("mc_cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("mc_cookie_consent", "accepted");
    setVisible(false);
    // Activar Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
      });
    }
  }

  function reject() {
    localStorage.setItem("mc_cookie_consent", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-ink border-t border-gold/20 px-5 py-4 md:py-5">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
        <p className="text-[12px] text-cream/70 leading-[1.7] flex-1">
          Usamos cookies técnicas necesarias para el funcionamiento del sitio y, con tu consentimiento, cookies analíticas para mejorar tu experiencia. Consulta nuestra{" "}
          <Link href="/legal/privacidad" className="text-gold hover:underline">
            Política de Privacidad
          </Link>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={reject}
            className="px-5 py-2 border border-cream/20 text-cream/50 text-[11px] font-medium hover:border-cream/40 hover:text-cream/70 transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 bg-gold text-ink text-[11px] font-semibold tracking-[0.12em] uppercase hover:bg-gold-light transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
