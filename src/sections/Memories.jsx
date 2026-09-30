import { wedding as W } from "../data";
import { Photo } from "../components/Photo";

/* ═══════════════════════════════════════════════════
   NOSOTROS: PAREJA DE FOTOS Y VERSÍCULO
   ═══════════════════════════════════════════════════ */
export function Memories() {
  const shared = {
    widths: [540, 1080],
    sizes: "(max-width: 672px) 46vw, 304px",
    width: "1080",
    height: "1620",
    loading: "lazy",
  };
  return (
    <section className="couple-memories" aria-labelledby="memories-title">
      <h2 id="memories-title" className="type-section-title text-olive mb-6">
        Nosotros
      </h2>
      <div className="couple-memories-pair">
        <Photo {...shared} name="olivos" alt="Yuleisi y Elder tomados de las manos bajo los olivos" />
        <Photo {...shared} name="frentes" alt="Yuleisi y Elder abrazados, juntando sus frentes" />
      </div>
      <p className="type-lead italic text-muted mt-6">{W.verse.text}.</p>
      <p className="type-caption text-muted mt-1">{W.verse.ref}</p>
      <div className="editorial-divider my-8">✦</div>
    </section>
  );
}
