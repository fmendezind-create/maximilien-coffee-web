"use client"; 

import { useState, useEffect, useCallback } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";


// Inventario por SKU — producto + peso + molido
function InventoryTab({ authKey }: { authKey: string }) {
  const [skus, setSkus] = useState<any[]>([]);
  const [stocks, setStocks] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin?path=inventory/skus", {
      headers: { "Authorization": `Bearer ${authKey}` }
    })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSkus(data);
          const initial: Record<string, number> = {};
          data.forEach((s: any) => { initial[s.sku] = s.stock || 0; });
          setStocks(initial);
        }
      })
      .finally(() => setLoading(false));
  }, [authKey]);

  async function saveStock(sku: string) {
    setSaving(prev => ({ ...prev, [sku]: true }));
    try {
      await fetch(`/api/admin?path=inventory/skus/${sku}`, {
        method: "PATCH",
        headers: { "Authorization": `Bearer ${authKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ stock: stocks[sku] || 0 }),
      });
    } finally {
      setSaving(prev => ({ ...prev, [sku]: false }));
    }
  }

  // Agrupar por producto
  const grouped: Record<string, { name: string; skus: any[] }> = {};
  skus.forEach(s => {
    if (!grouped[s.slug]) grouped[s.slug] = { name: s.product_name || s.slug, skus: [] };
    grouped[s.slug].skus.push(s);
  });

  const GRIND_LABELS: Record<string, string> = {
    "En grano": "En grano",
    "Molido": "Molido",
  };

  if (loading) return (
    <div className="py-20 text-center text-brown-light text-sm">Cargando inventario...</div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-light text-ink">Inventario por SKU</h2>
        <p className="text-[11px] text-brown-light">Stock diferenciado por producto, peso y molido</p>
      </div>

      {Object.entries(grouped).map(([slug, group]) => (
        <div key={slug} className="bg-white-warm border border-cream-3">
          <div className="px-6 py-4 border-b border-cream-3 bg-cream/50">
            <p className="font-semibold text-ink">{group.name}</p>
          </div>
          <div className="divide-y divide-cream-3">
            {group.skus.map(s => (
              <div key={s.sku} className="px-6 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-ink">{s.weight} · {GRIND_LABELS[s.grind] || s.grind}</p>
                  <p className="text-[10px] text-brown-light mt-0.5 font-mono">{s.sku}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    value={stocks[s.sku] ?? 0}
                    onChange={e => setStocks(prev => ({ ...prev, [s.sku]: Number(e.target.value) }))}
                    className="w-20 border border-cream-3 px-2 py-1.5 text-sm text-center outline-none focus:border-gold bg-cream"
                  />
                  <span className="text-[10px] text-brown-light">unidades</span>
                  <button
                    onClick={() => saveStock(s.sku)}
                    disabled={saving[s.sku]}
                    className="px-3 py-1.5 bg-ink text-cream text-[10px] font-semibold uppercase tracking-wide hover:bg-ink/90 transition-colors disabled:opacity-50">
                    {saving[s.sku] ? "..." : "Guardar"}
                  </button>
                </div>
                <div className={`w-2 h-2 rounded-full ${(stocks[s.sku] ?? 0) === 0 ? "bg-red-400" : (stocks[s.sku] ?? 0) < 5 ? "bg-amber-400" : "bg-green-400"}`} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


const BACKEND_PROXY = "/api/admin";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:    { label: "Pendiente",    color: "#f59e0b" },
  paid:       { label: "Pagado",       color: "#3b82f6" },
  confirmed:  { label: "Confirmado",   color: "#6366f1" },
  processing: { label: "En proceso",   color: "#8b5cf6" },
  preparing:  { label: "Preparando",   color: "#f97316" },
  packed:     { label: "Empacado",     color: "#14b8a6" },
  shipped:    { label: "Despachado",   color: "#06b6d4" },
  in_transit: { label: "En tránsito",  color: "#0ea5e9" },
  delivered:  { label: "Entregado",    color: "#22c55e" },
  cancelled:  { label: "Cancelado",    color: "#ef4444" },
  returned:   { label: "Devuelto",     color: "#f43f5e" },
  declined:   { label: "Rechazado",    color: "#ef4444" },
};

const SUB_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:       { label: "Pendiente",     color: "#f59e0b" },
  active:        { label: "Activa",        color: "#22c55e" },
  paused:        { label: "Pausada",       color: "#f97316" },
  cancelled:     { label: "Cancelada",     color: "#ef4444" },
  payment_failed:{ label: "Pago fallido",  color: "#dc2626" },
  expired:       { label: "Vencida",       color: "#9ca3af" },
  suspended:     { label: "Suspendida",    color: "#6b7280" },
};

function formatCOP(n: number) { return "$" + Math.round(n || 0).toLocaleString("es-CO"); }
function formatDate(d: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });
}
function StatusBadge({ status, map }: { status: string; map: Record<string, { label: string; color: string }> }) {
  const s = map[status] || { label: status, color: "#9ca3af" };
  return (
    <span style={{ background: s.color + "20", color: s.color, border: `1px solid ${s.color}40` }}
      className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide">
      {s.label}
    </span>
  );
}

type Tab = "dashboard" | "orders" | "subscriptions" | "customers" | "inventory";

export function AdminClient() {
  const [key, setKey]         = useState("");
  const [authed, setAuthed]   = useState(false);
  const [tab, setTab]         = useState<Tab>("dashboard");
  const [orders, setOrders]   = useState<any[]>([]);
  const [stats, setStats]     = useState<any>(null);
  const [subStats, setSubStats] = useState<any>(null);
  const [inventory, setInv]   = useState<any[]>([]);
  const [subscriptions, setSubs] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [selectedSub, setSelectedSub] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [error, setError]     = useState("");
  const [search, setSearch]   = useState("");

  const api = useCallback(async (path: string, opts?: RequestInit & { prefix?: string }) => {
    const prefix = opts?.prefix || "admin";
    const url = `${BACKEND_PROXY}?path=${path}&prefix=${prefix}`;
    const method = opts?.method || "GET";

    const fetchOpts: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`,
      },
    };
    if (opts?.body) fetchOpts.body = opts.body;

    const res = await fetch(url, fetchOpts);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }, [key]);

  async function login() {
    setLoading(true); setError("");
    try {
      if (key !== "mc-admin-2025") throw new Error("Llave incorrecta");
      await api("stats");
      setAuthed(true);
    } catch {
      setError("Llave incorrecta");
    } finally { setLoading(false); }
  }

  async function loadData() {
    setLoading(true);
    try {
      const [o, s, i, ss, su] = await Promise.all([
        api("orders?limit=100"),
        api("stats"),
        api("inventory"),
        api("subscriptions/stats"),
        api("subscriptions"),
      ]);
      setOrders(o.orders || []);
      setStats(s);
      setInv(i);
      setSubStats(ss);
      setSubs(Array.isArray(su) ? su : []);
    } catch {}
    setLoading(false);
  }

  async function loadCustomers() {
    try {
      const data = await api(`customers?limit=100${search ? `&search=${search}` : ""}`);
      setCustomers(data.customers || []);
    } catch {}
  }

  useEffect(() => { if (authed) loadData(); }, [authed]);
  useEffect(() => { if (authed && tab === "customers") loadCustomers(); }, [tab, authed]);

  async function updateStatus(reference: string, status: string) {
    const body: Record<string, string> = { status };
    if (status === "shipped" && trackingNumber) body.tracking_number = trackingNumber;
    await api(`orders/${reference}/status`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    loadData();
    setTrackingNumber("");
    if (selected?.reference === reference) setSelected({ ...selected, status });
  }

  async function updateSubStatus(id: number, status: string) {
    await api(`subscriptions/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    loadData();
    if (selectedSub?.id === id) setSelectedSub({ ...selectedSub, status });
  }

  async function updateInventory(slug: string, stock: any) {
    await api(`inventory/${slug}`, { method: "PATCH", body: JSON.stringify(stock) });
    loadData();
  }

  const filteredOrders = orders.filter(o =>
    (!filterStatus || o.status === filterStatus) &&
    (!search || o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
     o.customer_email?.toLowerCase().includes(search.toLowerCase()) ||
     o.reference?.toLowerCase().includes(search.toLowerCase()))
  );

  if (!authed) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="w-full max-w-[360px]">
          <div className="text-center mb-8">
            <p className="text-[10px] tracking-[4px] uppercase text-gold font-semibold mb-2">Maximilien Coffee</p>
            <h1 className="font-display text-3xl font-light text-ink">Panel Admin</h1>
          </div>
          <div className="bg-white-warm border border-cream-3 p-8">
            <label className="block text-[10px] tracking-[2px] uppercase text-brown-light mb-2">Llave de acceso</label>
            <input
              type="password"
              value={key}
              onChange={e => setKey(e.target.value)}
              onKeyDown={e => e.key === "Enter" && login()}
              className="w-full border border-cream-3 px-4 py-3 text-sm outline-none focus:border-gold bg-cream"
              placeholder="••••••••••••"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <button
              onClick={login}
              disabled={loading}
              className="w-full mt-4 py-3 bg-ink text-cream text-[11px] font-semibold tracking-[2px] uppercase hover:bg-ink/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Verificando..." : "Ingresar"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const TAB_ITEMS: { id: Tab; label: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "orders", label: `Pedidos ${orders.length > 0 ? `(${orders.length})` : ""}` },
    { id: "subscriptions", label: `Suscripciones ${subscriptions.length > 0 ? `(${subscriptions.length})` : ""}` },
    { id: "customers", label: "Clientes" },
    { id: "inventory", label: "Inventario" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-ink border-b border-white-warm/10 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-[9px] tracking-[3px] uppercase text-gold font-semibold">Maximilien Coffee</p>
          <p className="text-white-warm text-sm font-light">Panel de Administración</p>
        </div>
        <button onClick={loadData} className="text-gold/60 hover:text-gold text-[11px] transition-colors">
          Actualizar
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white-warm border-b border-cream-3 px-6 overflow-x-auto">
        <div className="flex gap-0 min-w-max">
          {TAB_ITEMS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-5 py-3.5 text-[11px] font-semibold tracking-[0.08em] uppercase border-b-2 transition-colors whitespace-nowrap ${
                tab === t.id ? "border-gold text-ink" : "border-transparent text-brown-light hover:text-brown"
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8">

        {/* ── DASHBOARD ─────────────────────────────────────── */}
        {tab === "dashboard" && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-light text-ink">Dashboard</h2>

            {/* KPIs Comerciales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Ingresos totales", value: formatCOP(stats?.total_revenue || 0), sub: "pedidos pagados", color: "#C8A84A" },
                { label: "Total pedidos", value: stats?.total_orders || 0, sub: "todos los estados", color: "#0A0704" },
                { label: "Pagados", value: stats?.paid_orders || 0, sub: "confirmados", color: "#22c55e" },
                { label: "Pendientes", value: stats?.pending_orders || 0, sub: "por confirmar", color: "#f59e0b" },
              ].map(kpi => (
                <div key={kpi.label} className="bg-white-warm border border-cream-3 p-5">
                  <p className="text-[10px] tracking-[1px] uppercase text-brown-light mb-2">{kpi.label}</p>
                  <p className="font-display text-2xl font-light" style={{ color: kpi.color }}>{kpi.value}</p>
                  <p className="text-[11px] text-brown-light mt-1">{kpi.sub}</p>
                </div>
              ))}
            </div>

            {/* KPIs Suscripciones */}
            {subStats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Suscripciones activas", value: subStats.active_count || 0, sub: "clientes recurrentes", color: "#22c55e" },
                  { label: "MRR", value: formatCOP(subStats.mrr || 0), sub: "ingresos recurrentes/mes", color: "#C8A84A" },
                  { label: "ARR", value: formatCOP(subStats.arr || 0), sub: "proyección anual", color: "#6366f1" },
                  { label: "Retención", value: `${subStats.retention_rate || 100}%`, sub: `Churn: ${subStats.churn_rate || 0}%`, color: "#0ea5e9" },
                ].map(kpi => (
                  <div key={kpi.label} className="bg-white-warm border border-cream-3 p-5">
                    <p className="text-[10px] tracking-[1px] uppercase text-brown-light mb-2">{kpi.label}</p>
                    <p className="font-display text-2xl font-light" style={{ color: kpi.color }}>{kpi.value}</p>
                    <p className="text-[11px] text-brown-light mt-1">{kpi.sub}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Gráfico ingresos diarios */}
            {stats?.daily_revenue?.length > 0 && (
              <div className="bg-white-warm border border-cream-3 p-6">
                <p className="text-[10px] tracking-[2px] uppercase text-brown-light mb-6 font-semibold">Ingresos últimos 30 días</p>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={stats.daily_revenue} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C8A84A" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#C8A84A" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9B6535" }}
                      tickFormatter={d => new Date(d).toLocaleDateString("es-CO", { day: "2-digit", month: "short" })}
                      axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#9B6535" }}
                      tickFormatter={v => "$" + (v/1000).toFixed(0) + "K"}
                      axisLine={false} tickLine={false} width={45} />
                    <Tooltip
                      formatter={(v: any) => [formatCOP(v), "Ingresos"]}
                      labelFormatter={l => new Date(l).toLocaleDateString("es-CO", { day: "2-digit", month: "long" })}
                      contentStyle={{ fontSize: 11, border: "1px solid #E4D4B0", borderRadius: 0, background: "#FAF4E6" }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#C8A84A" strokeWidth={2}
                      fill="url(#goldGrad)" dot={false} activeDot={{ r: 4, fill: "#C8A84A" }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {/* Gráfico pedidos por estado */}
              {orders.length > 0 && (() => {
                const statusCount = orders.reduce((acc: any, o: any) => {
                  const label = STATUS_LABELS[o.status]?.label || o.status;
                  acc[label] = (acc[label] || 0) + 1;
                  return acc;
                }, {});
                const data = Object.entries(statusCount).map(([name, value]) => ({ name, value }));
                const COLORS = ["#C8A84A", "#22c55e", "#06b6d4", "#f59e0b", "#ef4444", "#6366f1", "#8b5cf6"];
                return (
                  <div className="bg-white-warm border border-cream-3 p-6">
                    <p className="text-[10px] tracking-[2px] uppercase text-brown-light mb-6 font-semibold">Pedidos por estado</p>
                    <div className="flex items-center gap-6">
                      <ResponsiveContainer width={140} height={140}>
                        <PieChart>
                          <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={65}
                            dataKey="value" strokeWidth={0}>
                            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex-1 space-y-2">
                        {data.map((d, i) => (
                          <div key={d.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                              <span className="text-[11px] text-brown">{d.name}</span>
                            </div>
                            <span className="text-[11px] font-semibold text-ink">{d.value as number}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Gráfico suscripciones por plan */}
              {subStats?.by_plan?.length > 0 && (
                <div className="bg-white-warm border border-cream-3 p-6">
                  <p className="text-[10px] tracking-[2px] uppercase text-brown-light mb-6 font-semibold">Suscripciones por plan</p>
                  <ResponsiveContainer width="100%" height={140}>
                    <BarChart data={subStats.by_plan} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <XAxis dataKey="plan_name" tick={{ fontSize: 10, fill: "#9B6535" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "#9B6535" }} axisLine={false} tickLine={false} width={30} />
                      <Tooltip
                        formatter={(v: any) => [v, "Suscriptores"]}
                        contentStyle={{ fontSize: 11, border: "1px solid #E4D4B0", borderRadius: 0, background: "#FAF4E6" }}
                      />
                      <Bar dataKey="count" fill="#C8A84A" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 pt-4 border-t border-cream-3 flex justify-between">
                    {subStats.by_plan.map((p: any) => (
                      <div key={p.plan_name} className="text-center">
                        <p className="text-[10px] text-brown-light">{p.plan_name || "Sin plan"}</p>
                        <p className="text-[12px] font-semibold text-ink mt-0.5">{formatCOP(p.revenue)}/mes</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ── PEDIDOS ──────────────────────────────────────── */}
        {tab === "orders" && (
          <div className="flex gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Buscar por nombre, email o referencia..."
                  className="flex-1 border border-cream-3 px-3 py-2 text-[12px] outline-none focus:border-gold bg-white-warm"
                />
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                  className="border border-cream-3 px-3 py-2 text-[12px] outline-none bg-white-warm">
                  <option value="">Todos los estados</option>
                  {Object.entries(STATUS_LABELS).map(([v, { label }]) => (
                    <option key={v} value={v}>{label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                {filteredOrders.map(o => (
                  <div key={o.reference}
                    onClick={() => setSelected(selected?.reference === o.reference ? null : o)}
                    className={`bg-white-warm border p-4 cursor-pointer hover:border-gold/40 transition-colors ${
                      selected?.reference === o.reference ? "border-gold" : "border-cream-3"
                    }`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-semibold text-ink">{o.reference}</span>
                          <StatusBadge status={o.status} map={STATUS_LABELS} />
                        </div>
                        <p className="text-[13px] text-brown mt-1">{o.customer_name}</p>
                        <p className="text-[11px] text-brown-light">{o.customer_email} · {o.customer_city}</p>
                        {o.tracking_number && (
                          <p className="text-[11px] text-gold mt-1">Guía: {o.tracking_number} · {o.carrier}</p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[13px] font-semibold text-ink">{formatCOP(o.total)}</p>
                        <p className="text-[10px] text-brown-light mt-1">{formatDate(o.created_at)}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredOrders.length === 0 && (
                  <div className="bg-white-warm border border-cream-3 p-10 text-center text-brown-light text-sm">
                    No hay pedidos con estos filtros
                  </div>
                )}
              </div>
            </div>

            {/* Panel detalle pedido */}
            {selected && (
              <div className="w-80 shrink-0 bg-white-warm border border-cream-3 p-5 h-fit sticky top-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] tracking-[2px] uppercase text-brown-light font-semibold">Detalle pedido</p>
                  <button onClick={() => setSelected(null)} className="text-brown-light hover:text-ink text-lg leading-none">×</button>
                </div>

                <div className="space-y-3 text-[12px] mb-5">
                  <div><span className="text-brown-light">Referencia:</span> <strong className="text-ink ml-1">{selected.reference}</strong></div>
                  <div><span className="text-brown-light">Cliente:</span> <strong className="text-ink ml-1">{selected.customer_name}</strong></div>
                  <div><span className="text-brown-light">Email:</span> <span className="text-ink ml-1">{selected.customer_email}</span></div>
                  <div><span className="text-brown-light">Teléfono:</span> <span className="text-ink ml-1">{selected.customer_phone}</span></div>
                  <div><span className="text-brown-light">Dirección:</span> <span className="text-ink ml-1">{selected.customer_address}</span></div>
                  <div><span className="text-brown-light">Ciudad:</span> <span className="text-ink ml-1">{selected.customer_city}, {selected.customer_dept}</span></div>
                  <div><span className="text-brown-light">Total:</span> <strong className="text-ink ml-1">{formatCOP(selected.total)}</strong></div>
                  <div className="flex items-center gap-2"><span className="text-brown-light">Estado:</span> <StatusBadge status={selected.status} map={STATUS_LABELS} /></div>
                  {selected.tracking_number && (
                    <div><span className="text-brown-light">Guía:</span> <strong className="text-gold ml-1">{selected.tracking_number}</strong></div>
                  )}
                </div>

                {/* Productos */}
                <div className="border-t border-cream-3 pt-4 mb-5">
                  <p className="text-[10px] tracking-[2px] uppercase text-brown-light font-semibold mb-2">Productos</p>
                  {(typeof selected.items === "string" ? JSON.parse(selected.items) : selected.items || []).map((item: any, i: number) => (
                    <div key={i} className="flex justify-between py-1.5 border-b border-cream-3 last:border-0">
                      <span className="text-[11px] text-ink">{item.name} · {item.weight}<br/><span className="text-brown-light">{item.grind}</span></span>
                      <span className="text-[11px] font-semibold text-ink">×{item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Campo número de guía */}
                <div className="mb-4">
                  <label className="block text-[10px] uppercase tracking-[0.14em] text-brown-light mb-1.5">Número de guía</label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={e => setTrackingNumber(e.target.value)}
                    placeholder="Ej: 1234567890"
                    className="w-full px-3 py-2 border border-cream-3 text-xs outline-none focus:border-gold bg-cream"
                  />
                  <p className="text-[10px] text-brown-light mt-1">Se incluirá en el email de despacho</p>
                </div>

                {/* Cambiar estado */}
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.entries(STATUS_LABELS).filter(([v]) => v !== selected.status && v !== "declined").map(([v, { label, color }]) => (
                    <button key={v} onClick={() => updateStatus(selected.reference, v)}
                      style={{ borderColor: color + "40", color }}
                      className="py-1.5 border text-[10px] font-semibold uppercase tracking-wide hover:opacity-80 transition-opacity">
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── SUSCRIPCIONES ─────────────────────────────────── */}
        {tab === "subscriptions" && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-light text-ink">Suscripciones</h2>

            {/* KPIs */}
            {subStats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Activas", value: subStats.active_count || 0, color: "#22c55e" },
                  { label: "MRR", value: formatCOP(subStats.mrr || 0), color: "#C8A84A" },
                  { label: "ARR", value: formatCOP(subStats.arr || 0), color: "#6366f1" },
                  { label: "Churn", value: `${subStats.churn_rate || 0}%`, color: "#ef4444" },
                ].map(kpi => (
                  <div key={kpi.label} className="bg-white-warm border border-cream-3 p-5">
                    <p className="text-[10px] tracking-[1px] uppercase text-brown-light mb-1">{kpi.label}</p>
                    <p className="font-display text-2xl font-light" style={{ color: kpi.color }}>{kpi.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Lista suscripciones */}
            <div className="flex gap-6">
              <div className="flex-1 space-y-2">
                {subscriptions.length === 0 ? (
                  <div className="bg-white-warm border border-cream-3 p-10 text-center text-brown-light text-sm">
                    No hay suscripciones registradas
                  </div>
                ) : subscriptions.map((s: any) => (
                  <div key={s.id}
                    onClick={() => setSelectedSub(selectedSub?.id === s.id ? null : s)}
                    className={`bg-white-warm border p-4 cursor-pointer hover:border-gold/40 transition-colors ${
                      selectedSub?.id === s.id ? "border-gold" : "border-cream-3"
                    }`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-semibold text-ink">{s.customer_name}</span>
                          <StatusBadge status={s.status} map={SUB_STATUS_LABELS} />
                        </div>
                        <p className="text-[11px] text-brown-light mt-0.5">{s.customer_email} · {s.customer_city}</p>
                        <p className="text-[11px] text-brown mt-1">{s.plan_name || s.product_name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[13px] font-semibold text-ink">{formatCOP(s.price || s.price_discounted)}/mes</p>
                        <p className="text-[10px] text-brown-light mt-1">{formatDate(s.created_at)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Panel detalle suscripción */}
              {selectedSub && (
                <div className="w-72 shrink-0 bg-white-warm border border-cream-3 p-5 h-fit sticky top-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] tracking-[2px] uppercase text-brown-light font-semibold">Detalle</p>
                    <button onClick={() => setSelectedSub(null)} className="text-brown-light hover:text-ink text-lg leading-none">×</button>
                  </div>
                  <div className="space-y-2.5 text-[12px] mb-5">
                    <div><span className="text-brown-light">Cliente:</span> <strong className="text-ink ml-1">{selectedSub.customer_name}</strong></div>
                    <div><span className="text-brown-light">Email:</span> <span className="text-ink ml-1">{selectedSub.customer_email}</span></div>
                    <div><span className="text-brown-light">Teléfono:</span> <span className="text-ink ml-1">{selectedSub.customer_phone}</span></div>
                    <div><span className="text-brown-light">Plan:</span> <span className="text-ink ml-1">{selectedSub.plan_name || selectedSub.product_name}</span></div>
                    <div><span className="text-brown-light">Valor:</span> <strong className="text-ink ml-1">{formatCOP(selectedSub.price || selectedSub.price_discounted)}/mes</strong></div>
                    <div><span className="text-brown-light">Ciudad:</span> <span className="text-ink ml-1">{selectedSub.customer_city}</span></div>
                    <div className="flex items-center gap-2"><span className="text-brown-light">Estado:</span> <StatusBadge status={selectedSub.status} map={SUB_STATUS_LABELS} /></div>
                    <div><span className="text-brown-light">Desde:</span> <span className="text-ink ml-1">{formatDate(selectedSub.created_at)}</span></div>
                  </div>
                  <p className="text-[10px] tracking-[2px] uppercase text-brown-light font-semibold mb-2">Cambiar estado</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {Object.entries(SUB_STATUS_LABELS).filter(([v]) => v !== selectedSub.status).map(([v, { label, color }]) => (
                      <button key={v} onClick={() => updateSubStatus(selectedSub.id, v)}
                        style={{ borderColor: color + "40", color }}
                        className="py-1.5 border text-[10px] font-semibold uppercase tracking-wide hover:opacity-80 transition-opacity">
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── CLIENTES ─────────────────────────────────────── */}
        {tab === "customers" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-2xl font-light text-ink flex-1">Clientes</h2>
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); loadCustomers(); }}
                placeholder="Buscar cliente..."
                className="border border-cream-3 px-3 py-2 text-[12px] outline-none focus:border-gold bg-white-warm"
              />
            </div>
            {customers.length === 0 ? (
              <div className="bg-white-warm border border-cream-3 p-10 text-center">
                <p className="text-brown-light text-sm mb-2">No hay clientes registrados aún</p>
                <p className="text-[11px] text-brown-light">Los clientes se crean automáticamente cuando hacen su primer pedido</p>
              </div>
            ) : (
              <div className="bg-white-warm border border-cream-3 overflow-hidden">
                <table className="w-full text-[12px]">
                  <thead className="bg-cream border-b border-cream-3">
                    <tr>
                      {["Nombre", "Email", "Ciudad", "Pedidos", "Total gastado", "Estado", "Desde"].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-[1px] text-brown-light font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-3">
                    {customers.map((c: any) => (
                      <tr key={c.id} className="hover:bg-cream/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-ink">{c.name}</td>
                        <td className="px-4 py-3 text-brown-light">{c.email}</td>
                        <td className="px-4 py-3 text-brown-light">{c.city || "—"}</td>
                        <td className="px-4 py-3 text-center">{c.total_orders || 0}</td>
                        <td className="px-4 py-3 font-semibold text-ink">{formatCOP(c.total_spent || 0)}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${c.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                            {c.status === "active" ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-brown-light">{formatDate(c.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── INVENTARIO ───────────────────────────────────── */}
        {tab === "inventory" && (
          <InventoryTab authKey={key} />
        )}

      </div>
    </div>
  );
}
