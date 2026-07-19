import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Blog — Café de Especialidad Colombia",
  description: "Aprende sobre café de especialidad colombiano: variedades, procesos, métodos de preparación y el origen Huila. Guías escritas por expertos.",
  alternates: { canonical: "https://maximiliencoffee.com/blog" },
};

const POSTS = [
  {
    slug: "que-es-bourbon-rosado-cafe-colombia",
    title: "¿Qué es el Bourbon Rosado y por qué el de Huila es el mejor del mundo?",
    excerpt: "El Bourbon Rosado es una de las variedades más raras y codiciadas del café de especialidad. Descubre por qué alcanza 92 puntos SCA y qué lo hace único.",
    date: "2025-01-15",
    readTime: "6 min",
    category: "Variedades",
    keywords: "bourbon rosado café colombia, bourbon rosado 92 puntos SCA",
  },
  {
    slug: "como-preparar-cafe-v60-paso-a-paso",
    title: "Guía completa: cómo preparar café de especialidad en V60 paso a paso",
    excerpt: "El V60 es el método que mejor expresa las notas florales y frutales de un café natural. Aprende los parámetros exactos para una extracción perfecta.",
    date: "2025-01-22",
    readTime: "8 min",
    category: "Preparación",
    keywords: "cómo preparar V60, receta V60 café especialidad",
  },
  {
    slug: "que-significa-90-puntos-sca-cafe",
    title: "¿Qué significa que un café tenga 90+ puntos SCA?",
    excerpt: "La escala SCA va de 0 a 100. Un café con 90+ puntos es considerado excepcional — los mejores del mundo. Te explicamos qué evalúan y por qué importa.",
    date: "2025-01-29",
    readTime: "5 min",
    category: "Educación",
    keywords: "qué es puntuación SCA café, café especialidad puntos SCA Colombia",
  },
  {
    slug: "santa-maria-huila-origen-secreto-mejor-cafe-colombia",
    title: "Santa María, Huila: el origen secreto del mejor café de Colombia",
    excerpt: "A 2.000 metros sobre el nivel del mar, entre el Macizo Colombiano y el río Magdalena. El terroir que hace posible los cafés de especialidad más codiciados del país.",
    date: "2025-02-05",
    readTime: "7 min",
    category: "Origen",
    keywords: "café santa maría huila, café origen huila especialidad, terroir café Colombia",
  },
];

export default function BlogPage() {
  return (
    <>
      <Nav breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Blog" }]} />
      <main>
        <div className="max-w-[1100px] mx-auto px-5 md:px-12 py-14 md:py-20">
          <div className="mb-14">
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gold mb-3">Conocimiento</p>
            <h1 className="font-display text-[clamp(28px,4vw,48px)] font-normal text-ink mb-4">
              Blog — <em className="italic text-brown">Café de Especialidad</em>
            </h1>
            <p className="text-[15px] font-light text-brown-light max-w-[560px]">
              Todo lo que necesitas saber sobre café de especialidad colombiano — variedades, procesos, preparación y el origen Huila.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-cream-3 border border-cream-3">
            {POSTS.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white-warm p-8 hover:bg-cream transition-colors no-underline group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gold">{post.category}</span>
                  <span className="text-cream-3">·</span>
                  <span className="text-[11px] text-brown-light">{post.readTime} de lectura</span>
                </div>
                <h2 className="font-display text-xl font-medium text-ink mb-3 group-hover:text-brown transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-[13.5px] font-light text-brown-light leading-[1.8] mb-5">
                  {post.excerpt}
                </p>
                <span className="text-[11px] font-medium text-gold group-hover:gap-2 flex items-center gap-1.5 transition-all">
                  Leer artículo <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
