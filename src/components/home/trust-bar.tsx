const ITEMS = [
  { icon: "🚚", text: "Envío gratis +$80.000" },
  { icon: "🔥", text: "Tostado esta semana" },
  { icon: "🏔️", text: "Origen único · Huila" },
  { icon: "↩️", text: "Garantía de satisfacción" },
  { icon: "🔒", text: "Pago seguro" },
];

export function TrustBar() {
  return (
    <div className="bg-cream border-b border-cream-3 overflow-x-auto" role="complementary" aria-label="Garantías">
      <div className="flex items-center justify-start md:justify-around gap-6 md:gap-0 px-6 md:px-10 py-3 min-w-max md:min-w-0 max-w-[1100px] mx-auto">
        {ITEMS.map((item, i) => (
          <div key={item.text} className="flex items-center gap-2 shrink-0">
            {i > 0 && <span className="hidden md:block w-px h-5 bg-cream-3 mx-1" aria-hidden="true" />}
            <span className="text-sm" aria-hidden="true">{item.icon}</span>
            <span className="text-[11px] md:text-xs text-brown whitespace-nowrap">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
