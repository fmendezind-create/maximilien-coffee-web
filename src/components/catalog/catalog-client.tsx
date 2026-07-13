"use client";

import { useState, useMemo } from "react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";

type SortKey = "default" | "sca-desc" | "price-asc" | "price-desc";

const INTENSITY_OPTS = ["Suave — media", "Media", "Media — alta"];
const PROCESS_OPTS   = ["Natural", "Honey", "Lavado"];
const SCA_OPTS       = [{ value: "90+", label: "90+ pts — Excepcional" }, { value: "85-90", label: "85–90 pts — Excelente" }];

export function CatalogClient() {
  const [intensity, setIntensity] = useState<string[]>([]);
  const [process,   setProcess]   = useState<string[]>([]);
  const [sca,       setSca]       = useState<string[]>([]);
  const [priceMin,  setPriceMin]  = useState("");
  const [priceMax,  setPriceMax]  = useState("");
  const [sort,      setSort]      = useState<SortKey>("default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  }

  function resetAll() {
    setIntensity([]); setProcess([]); setSca([]);
    setPriceMin(""); setPriceMax(""); setSort("default");
  }

  const activeCount = intensity.length + process.length + sca.length + (priceMin || priceMax ? 1 : 0);

  const filtered = useMemo(() => {
    const min = parseInt(priceMin) || 0;
    const max = parseInt(priceMax) || Infinity;
    let result = PRODUCTS.filter(p => {
      if (intensity.length && !intensity.includes(p.intensity)) return false;
      if (process.length  && !process.includes(p.process))    return false;
      if (sca.length) {
        const ok = sca.some(r => r === "90+" ? p.sca >= 90 : p.sca >= 85 && p.sca < 90);
        if (!ok) return false;
      }
      const price = p.variants[0].price;
      if (price < min || price > max) return false;
      return true;
    });
    if (sort === "sca-desc")   result = [...result].sort((a, b) => b.sca - a.sca);
    if (sort === "price-asc")  result = [...result].sort((a, b) => a.variants[0].price - b.variants[0].price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.variants[0].price - a.variants[0].price);
    return result;
  }, [intensity, process, sca, priceMin, priceMax, sort]);

  const FiltersPanel = () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink">Filtros</span>
        {activeCount > 0 && (
          <button onClick={resetAll} className="text-[11px] text-brown-light underline hover:text-gold">
            Limpiar ({activeCount})
          </button>
        )}
      </div>
      <FilterGroup title="Intensidad">
        {INTENSITY_OPTS.map(v => (
          <FilterCheck key={v} checked={intensity.includes(v)} onChange={() => toggle(intensity, setIntensity, v)} label={v} />
        ))}
      </FilterGroup>
      <FilterGroup title="Proceso">
        {PROCESS_OPTS.map(v => (
          <FilterCheck key={v} checked={process.includes(v)} onChange={() => toggle(process, setProcess, v)} label={v} />
        ))}
      </FilterGroup>
      <FilterGroup title="Precio / 250g">
        <div className="flex items-center gap-2">
          <input type="number" value={priceMin} onChange={e => setPriceMin(e.target.value)}
            placeholder="Mín" aria-label="Precio mínimo"
            className="w-full px-2.5 py-2 border border-cream-3 text-xs outline-none focus:border-gold" />
          <span className="text-xs text-brown-light shrink-0">—</span>
          <input type="number" value={priceMax} onChange={e => setPriceMax(e.target.value)}
            placeholder="Máx" aria-label="Precio máximo"
            className="w-full px-2.5 py-2 border border-cream-3 text-xs outline-none focus:border-gold" />
        </div>
      </FilterGroup>
      <FilterGroup title="Puntuación SCA">
        {SCA_OPTS.map(o => (
          <FilterCheck key={o.value} checked={sca.includes(o.value)} onChange={() => toggle(sca, setSca, o.value)} label={o.label} />
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <>
      {/* Header */}
      <div className="px-5 md:px-12 pt-10 md:pt-16 pb-6 max-w-[1360px] mx-auto">
        <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gold mb-2">Huila · Colombia</p>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display font-light leading-tight text-ink" style={{ fontSize: "clamp(28px,4vw,48px)" }}>
              Nuestra <em className="italic text-brown">colección</em>
            </h1>
            <p className="text-xs text-brown-light mt-1">
              {filtered.length === 1 ? "1 café" : `${filtered.length} cafés`} de especialidad
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Botón filtros — solo móvil */}
            <button
              onClick={() => setFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2.5 border border-cream-3 text-xs font-medium text-brown hover:border-gold transition-colors"
              aria-label="Abrir filtros"
            >
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                <path d="M1 3h14M4 8h8M7 13h2"/>
                <path d="M1 3h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M7 13h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Filtros {activeCount > 0 && <span className="w-4 h-4 rounded-full bg-gold text-ink text-[9px] font-bold flex items-center justify-center">{activeCount}</span>}
            </button>
            {/* Sort */}
            <select
              value={sort} onChange={e => setSort(e.target.value as SortKey)}
              aria-label="Ordenar productos"
              className="px-3 py-2.5 border border-cream-3 bg-white-warm text-xs text-ink outline-none focus:border-gold appearance-none pr-7"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239B6535' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }}
            >
              <option value="default">Destacados</option>
              <option value="sca-desc">Mayor SCA</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chips de filtros activos */}
      {activeCount > 0 && (
        <div className="flex flex-wrap gap-1.5 px-5 md:px-12 pb-4 max-w-[1360px] mx-auto" aria-live="polite">
          {intensity.map(v => <Chip key={v} label={v} onRemove={() => toggle(intensity, setIntensity, v)} />)}
          {process.map(v  => <Chip key={v} label={v} onRemove={() => toggle(process, setProcess, v)} />)}
          {sca.map(v      => <Chip key={v} label={SCA_OPTS.find(o => o.value === v)?.label ?? v} onRemove={() => toggle(sca, setSca, v)} />)}
          {(priceMin || priceMax) && <Chip label="Precio personalizado" onRemove={() => { setPriceMin(""); setPriceMax(""); }} />}
        </div>
      )}

      {/* Body: sidebar desktop + grid */}
      <div className="flex gap-0 max-w-[1360px] mx-auto px-5 md:px-12 pb-16 md:pb-20">
        {/* Sidebar — solo desktop */}
        <aside className="hidden md:block w-[220px] shrink-0 py-8 pr-8 border-r border-cream-3 h-fit sticky top-[64px]" aria-label="Filtros">
          <FiltersPanel />
        </aside>

        {/* Grid */}
        <div className="flex-1 md:pl-10 pt-4 md:pt-8">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-2xl font-light text-ink mb-3">Ningún café coincide</p>
              <p className="text-sm text-brown-light mb-5">Ajusta o limpia los filtros.</p>
              <button onClick={resetAll} className="px-6 py-2.5 border border-cream-3 text-xs font-medium text-brown hover:bg-gold hover:border-gold hover:text-ink transition-colors">
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-cream-3 border border-cream-3">
              {filtered.map(p => <ProductCard key={p.slug} product={p} />)}
            </div>
          )}
        </div>
      </div>

      {/* Filtros móvil — sheet desde abajo */}
      {filtersOpen && (
        <>
          <div
            className="fixed inset-0 z-[400] bg-ink/40 md:hidden"
            onClick={() => setFiltersOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed bottom-0 left-0 right-0 z-[500] bg-white-warm rounded-t-2xl shadow-2xl md:hidden max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-cream-3 shrink-0">
              <span className="font-display text-lg font-normal text-ink">Filtros</span>
              <button onClick={() => setFiltersOpen(false)} className="text-2xl text-brown-light w-9 h-9 flex items-center justify-center">×</button>
            </div>
            <div className="overflow-y-auto px-6 py-6 flex-1">
              <FiltersPanel />
            </div>
            <div className="px-6 pb-8 pt-4 border-t border-cream-3 shrink-0">
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full py-4 bg-gold text-ink text-[11px] font-semibold tracking-[0.16em] uppercase hover:bg-gold-light transition-colors"
              >
                Ver {filtered.length} {filtered.length === 1 ? "café" : "cafés"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-2.5">{title}</p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FilterCheck({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4 accent-gold cursor-pointer shrink-0" />
      <span className="text-[13px] font-light text-brown group-hover:text-ink transition-colors">{label}</span>
    </label>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1 bg-cream border border-cream-3 rounded-full text-[11px] text-brown">
      {label}
      <button onClick={onRemove} aria-label={`Quitar filtro ${label}`} className="text-brown-light hover:text-ink text-sm leading-none">×</button>
    </div>
  );
}
