"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatCOP } from "@/lib/products";

const COMBO_PRICE = 99000;
const COMBO_ORIGINAL = 114700;

const VARIETIES = [
  { slug: "bourbon-rosado", name: "Bourbon Rosado", sca: 92, notes: "Frutos amarillos, panela, jazmin", accent: "#C8A84A", image: "/images/Bourbon_1.webp" },
  { slug: "variedad-colombia", name: "Variedad Colombia", sca: 87, notes: "Citrico, durazno, chocolate blanco", accent: "#8B1A1A", image: "/images/Colombia_1.webp" },
  { slug: "blend", name: "Blend", sca: 82, notes: "Caramelo, avellana, chocolate", accent: "#9B2020", image: "/images/Blend_1.webp" },
];

const GRINDS = ["En grano", "Molido"];

export function ComboDetail() {
  const { addItem } = useCart();
  const [variety1, setVariety1] = useState(VARIETIES[0].slug);
  const [variety2, setVariety2] = useState(VARIETIES[1].slug);
  const [grind, setGrind] = useState("En grano");
  const [added, setAdded] = useState(false);

  const v1 = VARIETIES.find(v => v.slug === variety1)!;
  const v2 = VARIETIES.find(v => v.slug === variety2)!;

  function handleAdd() {
    // Agregar como item especial al carrito
    addItem({
      id: `combo-navidad-${variety1}-${variety2}-${grind}`,
      slug: "combo-navidad",
      name: `Combo Navidad — ${v1.name} + ${v2.name}`,
      accent: "bourbon",
      image: "/images/Combo_1.webp",
      weight: "2x250g + vaso",
      grind,
      unitPrice: COMBO_PRICE,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="max-w-[1100px] mx-auto px-5 md:px-12 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20">

        {/* Imagen */}
        <div className="space-y-3">
          <div className="relative aspect-square bg-ink overflow-hidden">
            <Image src="/images/Combo_1.webp" alt="Combo Navidad Maximilien Coffee" fill className="object-cover" />
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-gold text-ink text-[9px] font-bold tracking-[0.2em] uppercase">
              Edicion limitada
            </div>
          </div>
          {/* Mini fotos de las variedades seleccionadas */}
          <div className="grid grid-cols-2 gap-3">
            {[v1, v2].map((v, i) => (
              <div key={i} className="relative aspect-square overflow-hidden border-2" style={{ borderColor: v.accent }}>
                <Image src={v.image} alt={v.name} fill className="object-cover" />
                <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-ink/80">
                  <p className="text-[9px] font-semibold text-cream truncate">{v.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-[9px] font-semibold tracking-[0.24em] uppercase text-gold mb-3">Combo de temporada</p>
          <h1 className="font-display text-[clamp(28px,4vw,44px)] font-light text-ink leading-[1.1] mb-2">
            Combo Navidad
          </h1>
          <p className="font-display text-[13px] italic text-brown-light mb-6">
            2 bolsas 250g + vaso mezclador premium
          </p>

          {/* Precio */}
          <div className="flex items-end gap-4 mb-8 pb-8 border-b border-cream-3">
            <p className="font-display text-[36px] font-light text-ink leading-none">
              {formatCOP(COMBO_PRICE)}
            </p>
            <div className="mb-1">
              <p className="text-[12px] text-brown-light line-through">{formatCOP(COMBO_ORIGINAL)}</p>
              <p className="text-[10px] text-gold font-semibold">Ahorras 14%</p>
            </div>
          </div>

          {/* Selector variedad 1 */}
          <div className="mb-6">
            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-brown-light mb-3">
              Primera variedad
            </p>
            <div className="space-y-2">
              {VARIETIES.map(v => (
                <button key={v.slug} onClick={() => setVariety1(v.slug)}
                  className={`w-full text-left px-4 py-3 border transition-all flex items-center gap-3 ${
                    variety1 === v.slug ? "border-gold bg-cream" : "border-cream-3 bg-white-warm hover:border-gold/40"
                  }`}>
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: v.accent }} />
                  <div className="flex-1">
                    <span className="text-[12px] font-medium text-ink">{v.name}</span>
                    <span className="text-[10px] text-brown-light ml-2">{v.sca} SCA</span>
                  </div>
                  <span className="text-[10px] text-brown-light italic">{v.notes}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Selector variedad 2 */}
          <div className="mb-6">
            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-brown-light mb-3">
              Segunda variedad
            </p>
            <div className="space-y-2">
              {VARIETIES.map(v => (
                <button key={v.slug} onClick={() => setVariety2(v.slug)}
                  className={`w-full text-left px-4 py-3 border transition-all flex items-center gap-3 ${
                    variety2 === v.slug ? "border-gold bg-cream" : "border-cream-3 bg-white-warm hover:border-gold/40"
                  }`}>
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: v.accent }} />
                  <div className="flex-1">
                    <span className="text-[12px] font-medium text-ink">{v.name}</span>
                    <span className="text-[10px] text-brown-light ml-2">{v.sca} SCA</span>
                  </div>
                  <span className="text-[10px] text-brown-light italic">{v.notes}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Molido */}
          <div className="mb-8">
            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-brown-light mb-3">
              Presentacion
            </p>
            <div className="flex gap-2">
              {GRINDS.map(g => (
                <button key={g} onClick={() => setGrind(g)}
                  className={`flex-1 py-2.5 border text-[11px] font-medium transition-all ${
                    grind === g ? "border-gold bg-cream text-ink" : "border-cream-3 text-brown hover:border-gold/40"
                  }`}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Incluye */}
          <div className="mb-8 p-5 bg-cream border border-cream-3">
            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-brown-light mb-3">Incluye</p>
            <div className="space-y-2">
              {[
                `${v1.name} 250g ${grind}`,
                `${v2.name} 250g ${grind}`,
                "Vaso mezclador premium",
                "Presentacion especial de regalo",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-1 h-1 rounded-full bg-gold shrink-0" />
                  <span className="text-[12px] text-brown">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button onClick={handleAdd}
            className={`w-full py-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all ${
              added ? "bg-green-600 text-cream" : "bg-ink text-cream hover:bg-ink/90"
            }`}>
            {added ? "Agregado al carrito" : "Agregar al carrito — " + formatCOP(COMBO_PRICE)}
          </button>

          <p className="text-[11px] text-brown-light text-center mt-3">
            Envio gratis en pedidos superiores a $100.000
          </p>
        </div>
      </div>
    </div>
  );
}
