import { motion, useReducedMotion } from "motion/react";
import { TornEdge } from "./Decor";

// Foto en WebP con varios anchos (public/assets/fotos/<name>-<ancho>.webp):
// el navegador descarga solo el tamaño que necesita según `sizes`.
export function Photo({ name, widths, ...props }) {
  const url = (w) => `./assets/fotos/${name}-${w}.webp`;
  return (
    <img
      src={url(widths[widths.length - 1])}
      srcSet={widths.map((w) => `${url(w)} ${w}w`).join(", ")}
      decoding="async"
      {...props}
    />
  );
}

// Foto a todo el ancho con bordes de papel rasgado arriba y abajo. Al entrar en
// pantalla se acerca muy despacio (≈4% en 7s) para darle vida sin distraer.
// `play` (opcional): arranca cuando pasa a true en vez de al entrar en pantalla
// (la portada está tapada por el sobre al cargar).
export function TornPhoto({ play, ...props }) {
  const reduced = useReducedMotion();
  const trigger =
    play === undefined
      ? { whileInView: { scale: 1.04 }, viewport: { once: true, margin: "0px 0px -20% 0px" } }
      : { animate: { scale: play ? 1.04 : 1 } };
  return (
    <div className="relative w-full max-w-2xl mx-auto my-8 overflow-hidden">
      <TornEdge position="top" />
      <motion.div
        initial={reduced ? false : { scale: 1 }}
        {...trigger}
        transition={{ duration: 7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Photo {...props} />
      </motion.div>
      <TornEdge position="bottom" />
    </div>
  );
}
