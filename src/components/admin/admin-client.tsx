"use client";

import { useState, useEffect, useCallback } from "react";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "https://web-production-aa93f.up.railway.app";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:    { label: "Pendiente",   color: "#f59e0b" },
  paid:       { label: "Pagado",      color: "#3b82f6" },
  processing: { label: "En proceso",  color: "#8b5cf6" },
  shipped:    { label: "Despachado",  color: "#06b6d4" },
  delivered:  { label: "Entregado",   color: "#22c55e" },
  cancelled:  { label: "Cancelado",   color: "#ef4444" },
  declined:   { label: "Rechazado",   color: "#ef4444" },
};

function formatCOP(n: number) { return "$" + n.toLocaleString("es-CO"); }
function formatDate(d: string) {
  return new Date(d).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function AdminClient() {
  const [key, setKey]         = useState("");
  const [authed, setAuthed]   = useState(false);
  const [tab, setTab]         = useState<"orders" | "inventory" | "stats">("orders");
  const [orders, setOrders]   = useState<any[]>([]);
  const [stats, setStats]     = useState<any>(null);
  const [inventory, setInv]   = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [error, setError]     = useState("");

  const api = useCallback(async (path: string, opts?: RequestInit) => {
    const res = await fetch(`${BACKEND}${path}`, {
      ...opts,
      headers: { "X-Admin-Key": key, "Content-Type": "application/json", ...opts?.headers },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }, [key]);

  async function login() {
    setLoading(true); setError("");
    try {
      await api("/admin/stats");
      setAuthed(true);
    } catch {
      setError("Llave incorrecta");
    } finally { setLoading(false); }
  }

  const loadData = useCallback(async () => {
    if (!authed) return;
    setLoading(true);
    try {
      const [o, s, i] = await Promise.all([
        api(`/admin/orders${filterStatus ? `?status=${filterStatus}` : ""}`),
        api("/admin/stats"),
        api("/admin/inventory"),
      ]);
      setOrders(o.orders || []);
      setStats(s);
      setInv(i);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [authed, api, filterStatus]);

  useEffect(() => { loadData(); }, [loadData]);

  async function updateStatus(reference: string, status: string) {
    await api(`/admin/orders/${reference}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    loadData();
    if (selected?.reference === reference) setSelected({ ...selected, status });
  }

  async function updateStock(slug: string, field: string, value: number) {
    const item = inventory.find(i => i.slug === slug);
    if (!item) return;
    await api(`/admin/inventory/${slug}`, {
      method: "PATCH",
      body: JSON.stringify({ ...item, [field]: value }),
    });
    loadData();
  }

  // ── LOGIN ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center px-6">
        <div className="bg-white-warm w-full max-w-[380px] p-10">
          <div className="text-center mb-8">
            <div className="text-3xl mb-3">☕</div>
            <h1 className="font-display text-2xl font-normal text-ink">Panel Admin</h1>
            <p className="text-sm text-brown-light mt-1">Maximilien Coffee</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold tracking-[0.18em] uppercase text-brown-light mb-1.5">
                Llave de acceso
              </label>
              <input
                type="password" value={key}
                onChange={e => setKey(e.target.value)}
                onKeyDown={e => e.key === "Enter" && login()}
                placeholder="mc-admin-..."
                className="w-full px-4 py-3 border border-cream-3 outline-none focus:border-gold text-sm"
              />
            </div>
            {error && <p className="text-red-600 text-xs">{error}</p>}
            <button
              onClick={login} disabled={loading || !key}
              className="w-full py-3.5 bg-gold text-ink text-[11px] font-semibold tracking-[0.16em] uppercase hover:bg-gold-light transition-colors disabled:opacity-50"
            >
              {loading ? "Verificando..." : "Entrar"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── PANEL ──
  return (
    <div className="min-h-screen bg-gray-warm">
      {/* Header */}
      <div className="bg-ink px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">☕</span>
          <div>
            <div className="text-[12px] font-semibold tracking-[0.18em] uppercase text-gold">Maximilien Coffee</div>
            <div className="text-[10px] text-cream/30">Panel de Administración</div>
          </div>
        </div>
        <button onClick={loadData} className="text-[11px] text-cream/40 hover:text-gold transition-colors">
          ↻ Actualizar
        </button>
      </div>

      {/* Stats rápidas */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-cream-3 border-b border-cream-3">
          {[
            { label: "Pedidos pagados", value: stats.paid_orders, color: "#3b82f6" },
            { label: "Pendientes",      value: stats.pending_orders, color: "#f59e0b" },
            { label: "Despachados",     value: stats.shipped_orders, color: "#06b6d4" },
            { label: "Ingresos totales",value: formatCOP(stats.total_revenue), color: "#C8A84A" },
          ].map(s => (
            <div key={s.label} className="bg-white-warm px-6 py-5">
              <div className="text-[10px] font-medium tracking-[0.14em] uppercase text-brown-light mb-1">{s.label}</div>
              <div className="font-display text-2xl font-normal" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-cream-3 bg-white-warm px-6">
        {(["orders","inventory","stats"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-3.5 text-[11px] font-medium tracking-[0.1em] uppercase border-b-2 transition-colors ${
              tab === t ? "border-gold text-gold" : "border-transparent text-brown-light hover:text-ink"
            }`}>
            {t === "orders" ? "Pedidos" : t === "inventory" ? "Inventario" : "Estadísticas"}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8 max-w-[1400px] mx-auto">

        {/* ── PEDIDOS ── */}
        {tab === "orders" && (
          <div>
            {/* Filtros */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["", "pending", "paid", "processing", "shipped", "delivered", "cancelled"].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`px-4 py-2 text-[11px] font-medium border transition-colors ${
                    filterStatus === s ? "bg-gold border-gold text-ink" : "border-cream-3 bg-white-warm text-brown hover:border-gold"
                  }`}>
                  {s === "" ? "Todos" : STATUS_LABELS[s]?.label}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="text-center py-20 text-brown-light text-sm">Cargando pedidos...</div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20 text-brown-light text-sm">No hay pedidos aún</div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 items-start">
                {/* Lista */}
                <div className="space-y-2">
                  {orders.map(order => (
                    <div key={order.reference}
                      onClick={() => setSelected(order)}
                      className={`bg-white-warm border p-5 cursor-pointer hover:border-gold transition-colors ${
                        selected?.reference === order.reference ? "border-gold" : "border-cream-3"
                      }`}>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="text-[12px] font-semibold text-ink">#{order.reference}</div>
                          <div className="text-[12px] text-brown-light">{order.customer_name} · {order.customer_email}</div>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className="text-[10px] font-semibold px-2 py-1 rounded-full"
                            style={{ background: STATUS_LABELS[order.status]?.color + "20", color: STATUS_LABELS[order.status]?.color }}>
                            {STATUS_LABELS[order.status]?.label ?? order.status}
                          </span>
                          <div className="font-display text-base text-ink">{formatCOP(order.total)}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-[11px] text-brown-light">{formatDate(order.created_at)}</div>
                        <div className="text-[11px] text-brown-light">
                          {order.customer_city}{order.customer_dept ? `, ${order.customer_dept}` : ""}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Detalle */}
                {selected && (
                  <div className="bg-white-warm border border-cream-3 sticky top-4">
                    <div className="px-6 py-4 border-b border-cream-3 flex items-center justify-between">
                      <span className="font-display text-lg text-ink">Detalle del pedido</span>
                      <button onClick={() => setSelected(null)} className="text-brown-light text-xl">×</button>
                    </div>
                    <div className="px-6 py-5 space-y-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-brown-light mb-1">Referencia</p>
                        <p className="text-sm font-medium text-ink">#{selected.reference}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-brown-light mb-1">Cliente</p>
                        <p className="text-sm text-ink">{selected.customer_name}</p>
                        <p className="text-xs text-brown-light">{selected.customer_email}</p>
                        <p className="text-xs text-brown-light">{selected.customer_phone}</p>
                      </div>
                      {selected.customer_address && (
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.16em] text-brown-light mb-1">Dirección</p>
                          <p className="text-xs text-brown-light">
                            {selected.customer_address}, {selected.customer_city}, {selected.customer_dept}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-brown-light mb-2">Productos</p>
                        <div className="space-y-2">
                          {(typeof selected.items === "string" ? JSON.parse(selected.items) : selected.items)?.map((item: any, i: number) => (
                            <div key={i} className="flex items-start justify-between text-xs bg-cream p-3">
                              <div>
                                <div className="font-medium text-ink">{item.name}</div>
                                <div className="text-brown-light">{item.weight} · {item.grind}</div>
                                {item.sku && <div className="text-gold font-mono text-[10px] mt-0.5">{item.sku}</div>}
                              </div>
                              <div className="text-right shrink-0">
                                <div className="text-ink font-medium">×{item.quantity}</div>
                                <div className="text-brown-light">{formatCOP(item.unit_price * item.quantity)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border-t border-cream-3 pt-3 flex justify-between">
                        <span className="text-sm font-medium text-ink">Total</span>
                        <span className="font-display text-xl text-ink">{formatCOP(selected.total)}</span>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-brown-light mb-2">Cambiar estado</p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {Object.entries(STATUS_LABELS).map(([s, info]) => (
                            <button key={s} onClick={() => updateStatus(selected.reference, s)}
                              className={`py-2 px-3 text-[10px] font-semibold border transition-colors ${
                                selected.status === s
                                  ? "text-white border-transparent"
                                  : "border-cream-3 text-brown hover:border-gold"
                              }`}
                              style={selected.status === s ? { background: info.color } : {}}>
                              {info.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── INVENTARIO ── */}
        {tab === "inventory" && (
          <div className="max-w-[800px]">
            <h2 className="font-display text-xl text-ink mb-6">Inventario actual</h2>
            <div className="space-y-4">
              {inventory.map(item => (
                <div key={item.slug} className="bg-white-warm border border-cream-3 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-display text-lg text-ink">{item.name}</div>
                      <div className="text-[11px] text-gold font-mono">{item.sku_base}-*</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { field: "stock_250g", label: "250g", sku: `${item.sku_base}-250G` },
                      { field: "stock_454g", label: "454g", sku: `${item.sku_base}-454G` },
                      { field: "stock_500g", label: "500g", sku: `${item.sku_base}-500G` },
                    ].map(({ field, label, sku }) => (
                      <div key={field}>
                        <div className="text-[10px] uppercase tracking-[0.14em] text-brown-light mb-1">{label}</div>
                        <div className="text-[9px] text-gold font-mono mb-2">{sku}</div>
                        <input
                          type="number" min="0"
                          defaultValue={item[field]}
                          onBlur={e => updateStock(item.slug, field, parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-cream-3 text-sm outline-none focus:border-gold"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ESTADÍSTICAS ── */}
        {tab === "stats" && stats && (
          <div className="max-w-[800px]">
            <h2 className="font-display text-xl text-ink mb-6">Estadísticas — últimos 30 días</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Total pedidos",   value: stats.total_orders },
                { label: "Pagados",          value: stats.paid_orders },
                { label: "Pendientes",       value: stats.pending_orders },
                { label: "Despachados",      value: stats.shipped_orders },
                { label: "Ingresos totales", value: formatCOP(stats.total_revenue) },
              ].map(s => (
                <div key={s.label} className="bg-white-warm border border-cream-3 p-5">
                  <div className="text-[10px] uppercase tracking-[0.14em] text-brown-light mb-1">{s.label}</div>
                  <div className="font-display text-2xl text-ink">{s.value}</div>
                </div>
              ))}
            </div>
            {stats.daily_revenue?.length > 0 && (
              <div className="bg-white-warm border border-cream-3 p-6">
                <h3 className="font-display text-base text-ink mb-4">Ventas diarias</h3>
                <div className="space-y-2">
                  {stats.daily_revenue.map((d: any) => (
                    <div key={d.date} className="flex items-center justify-between text-sm">
                      <span className="text-brown-light">{new Date(d.date).toLocaleDateString("es-CO", { day:"2-digit", month:"short" })}</span>
                      <span className="text-brown-light">{d.orders} pedido{d.orders !== 1 ? "s" : ""}</span>
                      <span className="font-medium text-ink">{formatCOP(parseInt(d.revenue))}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
