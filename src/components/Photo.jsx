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

// Foto a todo el ancho con bordes de papel rasgado arriba y abajo
export function TornPhoto(props) {
  return (
    <div className="relative w-full max-w-2xl mx-auto my-8 overflow-hidden">
      <TornEdge position="top" />
      <Photo {...props} />
      <TornEdge position="bottom" />
    </div>
  );
}
