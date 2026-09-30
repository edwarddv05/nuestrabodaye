import { motion } from "motion/react";
import { wedding as W } from "../data";
import { BotanicalBranch } from "../components/Decor";
import { MusicPill } from "../components/MusicPlayer";
import { TornPhoto } from "../components/Photo";

// "24 · Octubre · 2026"
const month = W.date.toLocaleDateString("es-PE", { month: "long" });
const heroDate = [W.date.getDate(), month, W.date.getFullYear()];

/* ═══════════════════════════════════════════════════
   PORTADA: NOMBRES, CANCIÓN Y PRIMERA FOTO
   ═══════════════════════════════════════════════════ */
export function Hero({ audio }) {
  return (
    <>
      <header className="pt-12 sm:pt-16 pb-6 text-center max-w-xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <BotanicalBranch />

          <p className="type-hero-kicker text-olive">El inicio de una vida juntos</p>

          <h1 className="type-hero-names text-olive my-2">
            {W.bride}
            <span className="type-hero-ampersand text-terracotta my-1">&</span>
            {W.groom}
          </h1>

          <p className="type-hero-date text-charcoal mt-5 mb-8">
            {heroDate.map((part, i) => (
              <span key={i}>
                {i > 0 && <span className="text-terracotta mx-2.5" aria-hidden="true">·</span>}
                {part}
              </span>
            ))}
          </p>

          <MusicPill audio={audio} />
        </motion.div>
      </header>

      {/* .couple-cover recorta a 1:1 y amplía ×1.18 en móvil: por eso pide más ancho */}
      <TornPhoto
        name="portada"
        widths={[640, 1280]}
        sizes="(max-width: 640px) 180vw, 672px"
        width="1280"
        height="853"
        fetchPriority="high"
        alt="Yuleisi y Elder abrazados en las escaleras de piedra junto al mar"
        className="couple-cover"
      />
    </>
  );
}
