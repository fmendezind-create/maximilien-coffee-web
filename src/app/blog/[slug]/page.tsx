import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

const POSTS: Record<string, {
  title: string; description: string; date: string;
  readTime: string; category: string; content: string;
}> = {
  "que-es-bourbon-rosado-cafe-colombia": {
    title: "¿Qué es el Bourbon Rosado y por qué el de Huila es el mejor del mundo?",
    description: "El Bourbon Rosado es una de las variedades más raras del café de especialidad. Descubre por qué alcanza 92 puntos SCA, qué lo diferencia de otros cafés y por qué el Huila produce el mejor del mundo.",
    date: "2025-01-15",
    readTime: "6 min",
    category: "Variedades",
    content: `
El Bourbon Rosado es, sin duda, una de las variedades más fascinantes y codiciadas del mundo del café de especialidad. Su nombre proviene del color rosado que adquieren sus cerezas al madurar — una característica visual única que refleja una complejidad aromática igualmente singular.

## ¿Qué hace especial al Bourbon Rosado?

A diferencia de otras variedades, el Bourbon Rosado es el resultado de una mutación genética natural entre el Bourbon Rojo y el Bourbon Amarillo. Esta mutación produce cerezas de color rosado que, durante su maduración, desarrollan azúcares y compuestos aromáticos de una complejidad excepcional.

Las plantas son más delicadas que otras variedades — son más susceptibles a enfermedades y producen menos fruto por planta. Pero es precisamente esa fragilidad la que concentra toda la energía de la planta en pocos granos extraordinarios.

## Por qué el Huila produce el mejor del mundo

Santa María, en el corazón del Huila, reúne las condiciones perfectas para el Bourbon Rosado:

**Altitud extrema.** A 2.000 metros sobre el nivel del mar, las noches son frías (14-18°C) y los días son cálidos. Esa diferencia térmica obliga al café a madurar lentamente, concentrando azúcares y compuestos aromáticos en el grano durante semanas.

**Suelos volcánicos.** El Macizo Colombiano aporta suelos ricos en minerales que el café absorbe y transforma en notas de taza imposibles de replicar en otras regiones.

**Dos épocas lluviosas.** El régimen hídrico del Huila crea condiciones óptimas para una floración uniforme y una cosecha de alta calidad.

## El perfil de taza del Bourbon Rosado del Huila

Cuando se cultiva y procesa correctamente — especialmente en proceso natural — el Bourbon Rosado del Huila produce una taza que los catadores profesionales describen como:

- **Frutos amarillos:** mango, maracuyá, durazno
- **Flores:** jazmín, rosa, bergamota
- **Dulzura natural:** panela, miel, caña
- **Cuerpo:** sedoso, envolvente
- **Acidez:** brillante, cítrica, limpia

Es el café que no necesita azúcar. Ni leche. Ni explicación.

## 92 puntos SCA: qué significa realmente

La Specialty Coffee Association evalúa el café en una escala de 0 a 100. Un café necesita al menos 80 puntos para ser considerado "de especialidad". Con 90 o más puntos entra en la categoría de "excepcional" — un rango reservado para los mejores cafés del mundo.

Nuestro Bourbon Rosado alcanzó **92 puntos SCA** — una puntuación que lo coloca entre los mejores 1% de cafés producidos en Colombia.

## Cómo prepararlo

El Bourbon Rosado expresa mejor su carácter en métodos de filtro lento:

- **V60:** 15g · 250ml · 92°C · 3:30 min · molido medio-grueso
- **Chemex:** 25g · 400ml · 93°C · 4:00 min
- **Aeropress:** 15g · 200ml · 88°C · 2:00 min (invertido)

En espresso también funciona excepcionalmente — 18g · 36ml · 28-32 segundos.

## Dónde conseguirlo

En Maximilien Coffee cultivamos Bourbon Rosado en Santa María, Huila, a 2.000 m.s.n.m., con proceso natural. Lo tostamos semanalmente en Bogotá y lo despachamos dentro de los 7 días post tostión para garantizar la máxima frescura.
    `,
  },
  "como-preparar-cafe-v60-paso-a-paso": {
    title: "Guía completa: cómo preparar café de especialidad en V60 paso a paso",
    description: "Aprende a preparar café en V60 como un barista profesional. Parámetros exactos, técnica de vertido y los mejores cafés para este método.",
    date: "2025-01-22",
    readTime: "8 min",
    category: "Preparación",
    content: `
El V60 es considerado por muchos baristas el método que mejor expresa la complejidad de un café de especialidad. Su diseño en espiral obliga al agua a fluir de manera uniforme a través del café, extrayendo exactamente los compuestos correctos en el tiempo correcto.

## Lo que necesitas

- Dripper V60 (cerámica, plástico o vidrio)
- Filtro de papel V60 (01 o 02 según tu dripper)
- Báscula con temporizador
- Kettle de cuello de cisne (ideal) o cualquier pava
- Termómetro
- Café fresco molido al momento

## Parámetros base para un Bourbon Rosado

| Parámetro | Valor |
|-----------|-------|
| Café | 15g |
| Agua | 250ml |
| Temperatura | 92°C |
| Tiempo total | 3:30 min |
| Molido | Medio-grueso |
| Ratio | 1:16.7 |

## Técnica paso a paso

**1. Enjuaga el filtro (0:00)**
Dobla el filtro, colócalo en el dripper y vierte agua caliente para enjuagarlo. Esto elimina el sabor a papel y precalienta el equipo. Descarta esa agua.

**2. Agrega el café (0:15)**
Vierte los 15g de café molido. Nivela suavemente. Coloca el dripper sobre tu taza o servidor y pon la báscula en cero.

**3. El bloom o preinfusión (0:30)**
Vierte 30ml de agua en círculos lentos, humedeciendo todo el café. Esta fase libera el CO₂ del café fresco. Si el café es reciente verás burbujas — eso es buena señal.

**4. Primer vertido (0:45)**
Vierte hasta 150ml en movimientos circulares lentos, de adentro hacia afuera. No viertas sobre el filtro.

**5. Segundo vertido (1:30)**
Cuando el nivel del agua baje hasta el café, vierte el resto hasta 250ml. Mantén el mismo movimiento circular.

**6. Espera (2:30 - 3:30)**
El agua seguirá filtrando sola. El tiempo total ideal está entre 3:00 y 3:30 minutos. Si tarda más, el molido está muy fino. Si termina antes de 2:30, está muy grueso.

## Ajustes según el resultado

- **Taza amarga o astringente:** molido más grueso, temperatura más baja (90°C)
- **Taza aguada o sin sabor:** molido más fino, temperatura más alta (93-94°C)
- **Taza ácida:** molido más fino o temperatura más alta

El V60 premia la práctica. Toma notas de cada preparación y ajusta un parámetro a la vez.
    `,
  },
  "que-significa-90-puntos-sca-cafe": {
    title: "¿Qué significa que un café tenga 90+ puntos SCA?",
    description: "La Specialty Coffee Association evalúa el café en una escala de 0 a 100. Te explicamos qué evalúan, por qué 90+ es excepcional y cómo esto afecta lo que hay en tu taza.",
    date: "2025-01-29",
    readTime: "5 min",
    category: "Educación",
    content: `
Cuando lees "92 puntos SCA" en un café, ¿qué significa realmente? La respuesta corta: que ese café está entre los mejores del mundo. La respuesta larga es lo que te contamos aquí.

## ¿Qué es la SCA?

La Specialty Coffee Association (Asociación de Cafés de Especialidad) es la organización internacional más importante del sector cafetero. Define los estándares de calidad, certifica a baristas y Q-Graders, y establece los protocolos de evaluación para el café de especialidad en todo el mundo.

## La escala de puntuación

La evaluación se realiza en una cata profesional (cupping) donde catadores certificados evalúan el café en múltiples atributos:

| Puntaje | Clasificación |
|---------|---------------|
| 60-69 | Comercial bajo |
| 70-79 | Comercial premium |
| 80-84 | Especialidad básico |
| 85-89 | Especialidad excelente |
| 90-94 | Especialidad excepcional |
| 95-100 | Perfección (prácticamente no existe) |

## Qué evalúan los catadores

Los catadores certificados Q-Grader analizan el café en 10 atributos, cada uno con un máximo de 10 puntos:

1. **Fragancia/Aroma** — lo que hueles antes y después de agregar agua
2. **Sabor** — las notas que percibes en boca
3. **Retrogusto** — lo que queda después de tragar
4. **Acidez** — su calidad y intensidad
5. **Cuerpo** — la sensación de peso en el paladar
6. **Balance** — cómo se integran todos los atributos
7. **Uniformidad** — consistencia entre las 5 tazas evaluadas
8. **Ausencia de defectos** — tazas limpias sin sabores extraños
9. **Dulzura** — presencia de azúcares naturales
10. **Impresión general** — la calificación holística del catador

## Por qué 90+ es excepcional

De toda la producción cafetera mundial, menos del 1% alcanza 90 o más puntos SCA. Para lograrlo, el café necesita:

- **Variedad genética superior** (Bourbon Rosado, Geisha, SL28)
- **Condiciones climáticas específicas** (altitud, temperatura, suelos)
- **Cosecha selectiva manual** de solo cerezas en punto óptimo
- **Procesamiento impecable** sin defectos ni contaminación
- **Tostión artesanal** que preserve todos los atributos

Nuestro Bourbon Rosado alcanzó 92 puntos — una puntuación que lo coloca en un grupo muy selecto de cafés colombianos.

## ¿Cómo lo percibes en la taza?

Un café de 90+ puntos tiene una complejidad que no necesita explicación — la sientes. Las notas de taza no son genéricas: no es "chocolate" genérico sino "cacao fino del 70%". No es "frutal" sino "maracuyá maduro con piel de naranja".

Es el tipo de café que te hace parar en medio de la primera taza y preguntarte: ¿qué fue eso?
    `,
  },
  "santa-maria-huila-origen-secreto-mejor-cafe-colombia": {
    title: "Santa María, Huila: el origen secreto del mejor café de Colombia",
    description: "A 2.000 metros sobre el nivel del mar, entre el Macizo Colombiano y el río Magdalena, nace el café con 92 puntos SCA. Te contamos por qué Santa María es uno de los orígenes más extraordinarios del mundo.",
    date: "2025-02-05",
    readTime: "7 min",
    category: "Origen",
    content: `
Hay orígenes en el café que son famosos — Yirgacheffe en Etiopía, Gesha Village en Panamá, Blue Mountain en Jamaica. Y luego hay orígenes que los conocedores guardan como secretos bien custodiados. Santa María, en el sur del Huila colombiano, es uno de ellos.

## Dónde está Santa María

Santa María es un municipio del departamento del Huila, en el sur de Colombia, enclavado entre dos de las geografías más poderosas del país: el Macizo Colombiano al occidente y el cañón del río Magdalena al oriente.

A 4 horas de Bogotá por carretera, Santa María vive del café. Sus veredas, a altitudes que van de los 1.700 a los 2.200 metros sobre el nivel del mar, producen algunos de los granos más extraordinarios de Colombia.

## Por qué es tan especial

**La altitud.** Entre 1.800 y 2.100 metros sobre el nivel del mar, Santa María está en la zona de altitud óptima para el café de especialidad. A esa altura, la temperatura oscila entre 14°C de noche y 22°C de día. Esa diferencia térmica (que los catadores llaman "estrés térmico positivo") obliga al árbol a madurar sus cerezas lentamente durante semanas, concentrando azúcares, ácidos y compuestos aromáticos en cada grano.

**Los suelos volcánicos.** El Macizo Colombiano, donde nace el río Magdalena, el Cauca y el Patía, es una zona de intensa actividad geológica histórica. Sus suelos tienen una composición mineral única — ricos en potasio, fósforo y materia orgánica — que el café absorbe y transforma en notas de taza imposibles de replicar en otras regiones.

**El agua.** Las quebradas que bajan del Macizo llevan agua limpia y mineral, perfecta para el lavado y el procesamiento del café. La calidad del agua de beneficio impacta directamente la limpieza de taza.

**El clima bifásico.** El Huila tiene dos épocas de lluvias al año (marzo-mayo y septiembre-noviembre), lo que permite dos cosechas anuales. La mitaca (cosecha pequeña) y la cosecha principal son períodos de intensa actividad en las fincas de Santa María.

## El Bourbon Rosado de Santa María

Fue en Santa María donde descubrimos el lote de Bourbon Rosado que alcanzó 92 puntos SCA. Las condiciones de la vereda — altitud de 2.000 metros, suelos con alta concentración de minerales, y un microclima que crea noches especialmente frías — crearon las condiciones perfectas para que esta variedad expresara todo su potencial.

El proceso natural que usamos (secar las cerezas enteras al sol durante 25-30 días) permite que los azúcares de la pulpa penetren el grano durante la fermentación, construyendo la dulzura y la complejidad frutal que caracterizan este café.

## La gente detrás del café

Santa María no es solo un terroir — son las familias que llevan generaciones cultivando café en condiciones que ninguna maquinaria puede reemplazar. Cosechan manualmente, cereza por cereza, seleccionando solo las que están en su punto óptimo de madurez.

En Maximilien Coffee trabajamos directamente con estas familias. Les pagamos por encima del precio de mercado porque sabemos que sin ellas, este café no existe. El precio justo no es filantropía — es la única forma de garantizar la sostenibilidad de un origen tan extraordinario como Santa María.
    `,
  },
};

export function generateStaticParams() {
  return Object.keys(POSTS).map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://maximiliencoffee.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://maximiliencoffee.com/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Maximilien Coffee"],
    },
  };
}

export default async function BlogPost({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Maximilien Coffee" },
    publisher: {
      "@type": "Organization",
      name: "Maximilien Coffee",
      logo: { "@type": "ImageObject", url: "https://maximiliencoffee.com/images/logo.jpg" },
    },
  };

  // Render Markdown simple
  const html = post.content
    .split('\n')
    .map(line => {
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith('**') && line.endsWith('**')) return `<p><strong>${line.slice(2,-2)}</strong></p>`;
      if (line.startsWith('- ')) return `<li>${line.slice(2)}</li>`;
      if (line.startsWith('| ')) return line; // tablas las ignoramos por ahora
      if (line.trim() === '') return '<br/>';
      return `<p>${line}</p>`;
    })
    .join('');

  return (
    <>
      <Script id="schema-article" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}/>
      <Nav breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: post.category },
      ]}/>
      <main>
        <article className="max-w-[720px] mx-auto px-5 md:px-8 py-14 md:py-20">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold">{post.category}</span>
              <span className="text-cream-3">·</span>
              <span className="text-[11px] text-brown-light">{post.readTime} de lectura</span>
              <span className="text-cream-3">·</span>
              <time className="text-[11px] text-brown-light" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}
              </time>
            </div>
            <h1 className="font-display text-[clamp(26px,4vw,42px)] font-normal text-ink leading-[1.15] mb-4">
              {post.title}
            </h1>
            <p className="text-[15px] font-light text-brown-light leading-[1.85]">{post.description}</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-cream-3 mb-10" />

          {/* Content */}
          <div
            className="prose-maximilien"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* CTA */}
          <div className="mt-14 p-8 bg-cream border border-cream-3 text-center">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gold mb-2">Pruébalo tú mismo</p>
            <p className="font-display text-xl font-normal text-ink mb-5">
              Bourbon Rosado — 92 pts SCA · Santa María, Huila
            </p>
            <Link
              href="/cafes/bourbon-rosado"
              className="px-8 py-3.5 bg-gold text-ink text-[11px] font-semibold tracking-[0.16em] uppercase no-underline inline-block hover:bg-gold-light transition-colors"
            >
              Comprar ahora — desde $52.000
            </Link>
          </div>
        </article>
      </main>
      <style>{`
        .prose-maximilien h2 { font-family: var(--font-display, Georgia, serif); font-size: clamp(20px,2.5vw,26px); font-weight: 500; color: var(--color-ink, #0A0704); margin: 2rem 0 1rem; }
        .prose-maximilien p { font-size: 15px; font-weight: 300; line-height: 1.9; color: var(--color-brown-light, #9B6535); margin-bottom: 1rem; }
        .prose-maximilien li { font-size: 15px; font-weight: 300; line-height: 1.85; color: var(--color-brown-light, #9B6535); margin-left: 1.25rem; list-style-type: disc; margin-bottom: 0.4rem; }
        .prose-maximilien strong { color: var(--color-ink, #0A0704); font-weight: 500; }
      `}</style>
      <Footer />
    </>
  );
}
