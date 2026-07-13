"use client";

import { useState } from "react";
import Image from "next/image";
import { Product, ACCENT_COLORS, formatCOP } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

const GRIND_OPTS = ["Filtro", "Espresso", "Prensa francesa", "Moka"];

export function ProductDetail({ product }: { product: Product }) {
  const colors = ACCENT_COLORS[product.accent];
  const { addItem, openCart } = useCart();

  const [activeImg, setActiveImg] = useState(0);
  const [variantIdx, setVariantIdx] = useState(0);
  const [form, setForm] = useState<"grano" | "molido">("molido");
  const [grind, setGrind] = useState("Filtro");
  const [qty, setQty] = useState(1);
  const [heart, setHeart] = useState(false);
  const [openAcc, setOpenAcc] = useState<number | null>(null);
  const [added, setAdded] = useState(false);

  const images = [product.image, ...product.gallery];
  const variant = product.variants[variantIdx];

  function handleAdd() {
    addItem({
      id: `${product.slug}-${variant.weight}-${form === "molido" ? grind : "grano"}`,
      slug: product.slug, name: product.name, accent: product.accent,
      image: product.image, weight: variant.weight,
      grind: form === "molido" ? grind : "En grano",
      unitPrice: variant.price,
    }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    openCart();
  }

  const nameParts = product.name.split(" ");
  const nameFirst = nameParts.slice(0, -1).join(" ");
  const nameLast  = nameParts.slice(-1)[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] max-w-[1360px] mx-auto items-start">

      {/* ── GALERÍA ── */}
      <div
        className="relative h-[60vw] max-h-[500px] lg:h-[calc(100vh-64px)] lg:max-h-none lg:sticky lg:top-[64px] overflow-hidden"
        style={{ background: product.accent === "bourbon" ? "#F2E8D0" : product.accent === "colombia" ? "#1A0808" : "#120404" }}
        aria-label="Galería del producto"
      >
        <Image
          key={activeImg}
          src={images[activeImg]}
          alt={`${product.name} — Maximilien Coffee`}
          fill sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition-opacity duration-300"
          style={product.accent !== "bourbon" ? { filter: "brightness(0.88)" } : undefined}
          priority
        />

        {/* SCA badge */}
        <div
          className="absolute top-4 right-4 md:top-7 md:right-7 w-14 h-14 md:w-[68px] md:h-[68px] rounded-full flex flex-col items-center justify-center border-2 border-white-warm shadow-lg"
          style={{ background: colors.base }}
          aria-label={`${product.sca} puntos SCA`}
        >
          <span className="font-display text-lg md:text-[22px] font-semibold leading-none" style={{ color: product.accent === "bourbon" ? "#0A0704" : "#FDFAF2" }}>
            {product.sca}
          </span>
          <span className="text-[7px] font-semibold tracking-[0.1em]" style={{ color: product.accent === "bourbon" ? "rgba(10,7,4,.5)" : "rgba(255,255,255,.6)" }}>
            SCA pts
          </span>
        </div>

        {/* Badge texto */}
        <div className="absolute top-4 left-4 md:top-7 md:left-7 px-3 py-1 text-[9px] font-semibold tracking-[0.14em] uppercase" style={{ background: "rgba(10,7,4,0.7)", color: colors.pale }}>
          {product.badge}
        </div>

        {/* Thumbnails */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5" role="list">
          {images.map((img, i) => (
            <button
              key={i} onClick={() => setActiveImg(i)} role="listitem"
              aria-label={`Imagen ${i + 1}`}
              className="w-10 h-10 md:w-12 md:h-12 rounded-sm overflow-hidden border-[1.5px] shrink-0 transition-all"
              style={{ borderColor: activeImg === i ? colors.base : "transparent" }}
            >
              <Image src={img} alt="" width={48} height={48} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* ── INFO ── */}
      <div className="px-5 pt-8 pb-20 md:px-14 md:pt-[60px]">
        {/* Kicker */}
        <p className="flex items-center gap-2.5 text-[10px] font-medium tracking-[0.28em] uppercase mb-3" style={{ color: colors.base }}>
          <span className="w-[22px] h-px shrink-0" style={{ background: colors.base }} />
          Café de especialidad · Huila
        </p>

        {/* Título */}
        <h1 className="font-display font-light leading-[1.04] text-ink mb-2" style={{ fontSize: "clamp(36px,4.5vw,64px)" }}>
          {nameFirst ? <>{nameFirst}<br /></> : null}
          <em className="italic" style={{ color: colors.base }}>{nameLast}</em>
        </h1>

        <p className="font-display text-[14px] italic font-light text-brown-light tracking-[0.06em] mb-4">
          {product.variety} · Proceso {product.process.toLowerCase()}
        </p>

        <p className="text-[11px] tracking-[0.12em] uppercase text-brown-light flex flex-wrap items-center gap-[6px] mb-6">
          <span>{product.origin.split(",")[0]}</span>
          <Dot color={colors.base} />
          <span>Huila</span>
          <Dot color={colors.base} />
          <span>{product.altitude}</span>
        </p>

        <div className="flex items-center gap-2.5 mb-6">
          <span className="text-gold text-[13px] tracking-[2px]" aria-label={`${product.rating} estrellas`}>{"★".repeat(product.rating)}</span>
          <span className="text-xs text-brown-light">{product.reviewCount} reseñas</span>
        </div>

        <Hr />

        {/* Notas */}
        <p className="text-[10px] font-medium tracking-[0.24em] uppercase mb-3" style={{ color: colors.base }}>Perfil de taza</p>
        <div className="flex flex-wrap gap-2 mb-6" role="list">
          {product.notes.map(n => (
            <span key={n} className="px-3.5 py-1.5 border border-cream-3 bg-cream text-[11.5px] text-brown" role="listitem">{n}</span>
          ))}
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Spec label="Variedad" value={product.variety} />
          <Spec label="Proceso"  value={product.process} />
          <Spec label="Tostión"  value={product.roast} />
          <Spec label="Intensidad" value={product.intensity} />
        </div>

        <Hr />

        {/* Selectores */}
        <p className="text-[10px] font-medium tracking-[0.24em] uppercase mb-2.5" style={{ color: colors.base }}>Presentación</p>

        {/* Peso */}
        <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Peso">
          {product.variants.map((v, i) => (
            <SelBtn key={v.weight} active={variantIdx === i} onClick={() => setVariantIdx(i)}>{v.weight}</SelBtn>
          ))}
        </div>

        {/* Forma */}
        <div className="flex gap-2 mb-4" role="group" aria-label="Forma">
          <SelBtn active={form === "grano"}  onClick={() => setForm("grano")}>En grano</SelBtn>
          <SelBtn active={form === "molido"} onClick={() => setForm("molido")}>Molido</SelBtn>
        </div>

        {/* Tipo molido */}
        <div
          className="overflow-hidden transition-all duration-300 mb-1"
          style={{ maxHeight: form === "molido" ? "90px" : "0", opacity: form === "molido" ? 1 : 0 }}
        >
          <p className="text-[11px] text-brown-light mb-2 mt-0.5">¿Para qué cafetera?</p>
          <div className="flex flex-wrap gap-2">
            {GRIND_OPTS.map(g => (
              <SelBtnSm key={g} active={grind === g} onClick={() => setGrind(g)}>{g}</SelBtnSm>
            ))}
          </div>
        </div>

        <Hr />

        {/* Precio */}
        <div className="flex items-end gap-2.5 mb-5">
          <div className="font-display font-light text-ink leading-none" style={{ fontSize: "clamp(36px,5vw,46px)" }}>
            {formatCOP(variant.price * qty)}
          </div>
          <div>
            <div className="text-xs text-brown-light">/ {variant.weight}</div>
            <div className="text-xs text-brown-light">Envío gratis</div>
          </div>
        </div>

        {/* Botón de compra — stack en móvil muy pequeño */}
        <div className="flex gap-2 mb-4">
          {/* Qty */}
          <div className="flex items-center border border-cream-3 shrink-0" role="group" aria-label="Cantidad">
            <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Reducir"
              className="w-10 h-12 md:w-[38px] md:h-[50px] text-lg text-brown-light hover:bg-cream transition-colors flex items-center justify-center">−</button>
            <input type="number" value={qty} min={1} max={99}
              onChange={e => setQty(Math.max(1, Math.min(99, parseInt(e.target.value) || 1)))}
              className="w-10 text-center text-sm font-medium text-ink border-x border-cream-3 bg-transparent h-12 md:h-[50px]"
              aria-label="Cantidad" />
            <button onClick={() => setQty(q => Math.min(99, q + 1))} aria-label="Aumentar"
              className="w-10 h-12 md:w-[38px] md:h-[50px] text-lg text-brown-light hover:bg-cream transition-colors flex items-center justify-center">+</button>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            className="flex-1 h-12 md:h-[50px] text-[11px] font-semibold tracking-[0.14em] uppercase transition-all active:scale-[0.98]"
            style={{
              background: added ? "#0A0704" : colors.base,
              color: added ? "#FDFAF2" : product.accent === "bourbon" ? "#0A0704" : "#FDFAF2"
            }}
          >
            {added ? "✓ Añadido" : "Añadir al carrito"}
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setHeart(h => !h)}
            aria-label="Guardar en favoritos"
            className="w-12 h-12 md:w-[50px] md:h-[50px] border border-cream-3 text-lg flex items-center justify-center transition-colors shrink-0"
            style={{ color: heart ? colors.base : undefined, borderColor: heart ? colors.base : undefined }}
          >
            {heart ? "♥" : "♡"}
          </button>
        </div>

        {/* Upsell */}
        <div className="flex items-center justify-between gap-3 px-4 py-3.5 bg-ink mb-5">
          <p className="text-[12px] text-cream/65">
            Suscríbete · <strong className="font-medium" style={{ color: colors.pale }}>10% de ahorro</strong> permanente
          </p>
          <button className="px-3 py-1.5 border border-white-warm/20 text-cream/70 text-[10px] font-medium tracking-[0.1em] uppercase whitespace-nowrap hover:text-gold-light transition-colors shrink-0">
            Suscribirme
          </button>
        </div>

        {/* Trust */}
        <div className="flex flex-wrap gap-4 mb-6">
          <TrustItem icon="🚚" text="Envío gratis" />
          <TrustItem icon="↩️" text="Garantía" />
          <TrustItem icon="🔒" text="Pago seguro" />
        </div>

        <Hr />

        {/* Accordion */}
        <div>
          {[
            { title: product.storyTitle, body: product.storyBody },
            { title: product.processTitle, body: product.processBody },
            { title: "Envíos y devoluciones", body: "Despachamos en 24–48 horas hábiles. Bogotá: 1–2 días. Resto del país: 3–5 días. Guía por WhatsApp al despachar. Si el café no cumple tus expectativas, lo reemplazamos o reembolsamos sin preguntas." },
          ].map((acc, i) => (
            <AccItem
              key={i} title={acc.title} body={acc.body}
              isOpen={openAcc === i} onClick={() => setOpenAcc(openAcc === i ? null : i)}
              color={colors.base}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Dot({ color }: { color: string }) {
  return <span className="w-[3px] h-[3px] rounded-full shrink-0" style={{ background: color }} aria-hidden="true" />;
}
function Hr() {
  return <div className="h-px bg-cream-3 my-5 md:my-6" />;
}
function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.15em] uppercase text-brown-light mb-0.5">{label}</div>
      <div className="text-sm text-ink">{value}</div>
    </div>
  );
}
function SelBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-pressed={active}
      className={`px-4 py-2 border text-[12.5px] font-body transition-all active:scale-[0.97] ${
        active ? "border-gold bg-cream-2 text-ink font-medium" : "border-cream-3 bg-white-warm text-brown hover:bg-cream"
      }`}>
      {children}
    </button>
  );
}
function SelBtnSm({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-pressed={active}
      className={`px-3 py-1.5 border text-xs font-body transition-all ${
        active ? "border-brown bg-cream text-ink" : "border-cream-3 bg-white-warm text-brown-light hover:bg-cream"
      }`}>
      {children}
    </button>
  );
}
function TrustItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[11.5px] text-brown-light">
      <span className="text-sm" aria-hidden="true">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
function AccItem({ title, body, isOpen, onClick, color }: { title: string; body: string; isOpen: boolean; onClick: () => void; color: string }) {
  return (
    <div className="border-t border-cream-3 last:border-b">
      <button onClick={onClick} aria-expanded={isOpen}
        className="w-full py-4 flex justify-between items-center bg-transparent font-display text-[15px] md:text-base font-normal text-ink text-left hover:text-brown transition-colors">
        {title}
        <span className="text-lg shrink-0 transition-transform ml-3" style={{ color, transform: isOpen ? "rotate(45deg)" : "none" }} aria-hidden="true">+</span>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: isOpen ? "300px" : "0", opacity: isOpen ? 1 : 0 }}>
        <p className="text-[13px] md:text-[13.5px] font-light leading-[1.85] text-brown-light pb-4">{body}</p>
      </div>
    </div>
  );
}
