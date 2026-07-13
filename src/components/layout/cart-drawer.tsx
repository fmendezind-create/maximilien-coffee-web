"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/cart-context";
import { formatCOP } from "@/lib/products";

export function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
  } = useCart();

  const shippingLeft = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingPct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  function goCheckout() {
    closeCart();
    router.push("/checkout");
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-[400] bg-ink/45 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Tu carrito"
        className={`fixed top-0 right-0 bottom-0 z-500 w-full sm:w-[440px] bg-white-warm flex flex-col shadow-[-4px_0_40px_rgba(10,7,4,0.12)] transition-transform duration-400 ease-brand ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cream-3 shrink-0">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-[22px] text-ink">Tu carrito</span>
            <span className="text-xs text-brown-light">
              {itemCount === 1 ? "1 producto" : `${itemCount} productos`}
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="w-9 h-9 rounded-full flex items-center justify-center text-brown-light text-xl hover:text-ink hover:bg-cream transition-colors"
          >
            ×
          </button>
        </div>

        {/* Shipping progress */}
        <div className="px-6 py-2.5 bg-cream border-b border-cream-3 shrink-0">
          <p className="text-xs text-brown text-center">
            {shippingLeft === 0 ? (
              <>🎉 <strong className="text-ink font-medium">¡Tienes envío gratis!</strong></>
            ) : (
              <>
                Te faltan <strong className="text-ink font-medium">{formatCOP(shippingLeft)}</strong> para envío gratis 🚚
              </>
            )}
          </p>
          <div className="h-[3px] bg-cream-3 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-[width] duration-400 ease-brand"
              style={{ width: `${shippingPct}%` }}
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-8 py-12 text-center gap-4">
              <div className="text-4xl opacity-30" aria-hidden="true">☕</div>
              <p className="font-display text-[22px] font-light text-ink">Tu carrito está vacío</p>
              <p className="text-sm text-brown-light font-light">Descubre nuestros cafés de especialidad</p>
              <Link
                href="/cafes"
                onClick={closeCart}
                className="mt-2 px-7 py-3 bg-gold text-ink text-[11px] font-semibold tracking-[0.14em] uppercase no-underline hover:bg-gold-light transition-colors"
              >
                Ver catálogo
              </Link>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[80px_1fr] gap-4 px-6 py-5 border-b border-cream-3 hover:bg-cream transition-colors relative"
                >
                  <span
                    className="absolute left-0 top-0 bottom-0 w-[3px]"
                    style={{
                      background:
                        item.accent === "bourbon"
                          ? "#C8A84A"
                          : item.accent === "colombia"
                          ? "#8B1A1A"
                          : "#9B2020",
                    }}
                    aria-hidden="true"
                  />
                  <div className="w-20 h-[100px] rounded-sm overflow-hidden bg-cream-2 shrink-0">
                    <Image src={item.image} alt={item.name} width={80} height={100} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between py-0.5">
                    <div>
                      <div className="font-display text-[17px] font-medium text-ink leading-tight mb-1">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-brown-light mb-3">
                        {item.weight} · {item.grind}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-display text-lg text-ink">
                        {formatCOP(item.unitPrice * item.quantity)}
                      </div>
                      <div className="flex items-center border border-cream-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Reducir cantidad"
                          className="w-[30px] h-[30px] flex items-center justify-center text-brown-light hover:bg-cream-2 hover:text-ink transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-[13px] font-medium text-ink border-x border-cream-3">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Aumentar cantidad"
                          className="w-[30px] h-[30px] flex items-center justify-center text-brown-light hover:bg-cream-2 hover:text-ink transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Eliminar ${item.name}`}
                    className="absolute top-4 right-5 text-cream-3 hover:text-brown-light transition-colors text-base leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Subscription upsell */}
              <div className="px-6 py-4 bg-ink-2">
                <p className="text-xs text-cream/65 mb-2">
                  Suscríbete y ahorra <strong className="text-gold-pale font-medium">10%</strong> en cada entrega — pausa cuando quieras
                </p>
                <Link
                  href="/suscripcion"
                  className="block w-full text-center py-2 border border-gold/35 text-cream/65 text-[11px] font-medium tracking-[0.1em] uppercase hover:border-gold hover:text-gold transition-colors no-underline"
                >
                  Ver suscripciones →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-cream-3 shrink-0">
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-xs text-brown-light uppercase tracking-[0.08em]">Subtotal</span>
              <span className="font-display text-[26px] text-ink">{formatCOP(subtotal)}</span>
            </div>
            <p className="text-[11px] text-brown-light mb-5">
              {subtotal >= FREE_SHIPPING_THRESHOLD ? "✓ Envío gratis incluido" : "Envío: calculado al pagar"}
            </p>
            <button
              onClick={goCheckout}
              className="w-full py-4 bg-gold text-ink text-xs font-semibold tracking-[0.16em] uppercase hover:bg-gold-light hover:-translate-y-px transition-all mb-2.5"
            >
              Proceder al pago
            </button>
            <button
              onClick={closeCart}
              className="w-full py-3 border border-cream-3 text-[11px] text-brown-light hover:border-brown-light hover:text-ink transition-colors"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
