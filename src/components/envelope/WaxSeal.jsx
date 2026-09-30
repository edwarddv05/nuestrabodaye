// Contorno irregular de la cera derramada (con un lóbulo más grande a la derecha)
const WAX_BLOB =
  "M50.0,4.5C56.7,4.2 64.1,5.1 70.4,7.7C76.6,10.2 82.9,14.9 87.5,20.1C92.2,25.3 97.2,32.3 98.3,39.0C99.3,45.6 95.6,53.1 93.9,60.0C92.1,66.9 91.9,75.0 87.9,80.2C83.9,85.5 76.3,89.2 70.0,91.4C63.6,93.7 56.7,93.9 50.0,94.0C43.3,94.1 35.8,94.5 29.8,91.9C23.9,89.3 18.8,83.6 14.4,78.4C10.1,73.1 5.0,66.9 3.7,60.6C2.4,54.2 4.9,46.6 6.6,40.1C8.3,33.6 10.1,26.4 14.0,21.3C18.0,16.2 24.5,12.3 30.5,9.5C36.5,6.7 43.3,4.8 50.0,4.5Z";

// Sello de cera en terracota: derrame irregular, reborde en relieve, disco
// estampado hundido e iniciales en relieve del mismo color que la cera.
// `id` separa los degradados de cada mitad (se renderiza dos veces).
export function WaxSeal({ id }) {
  const url = (name) => `url(#${id}-${name})`;
  return (
    <svg viewBox="0 0 100 100" className="wax-seal-svg" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-blob`} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#E29A67" />
          <stop offset="45%" stopColor="#CA7C4B" />
          <stop offset="80%" stopColor="#A9592B" />
          <stop offset="100%" stopColor="#8A4019" />
        </radialGradient>
        {/* Reborde elevado: claro arriba a la izquierda, oscuro abajo a la derecha */}
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EBAA79" />
          <stop offset="50%" stopColor="#C47445" />
          <stop offset="100%" stopColor="#8E441B" />
        </linearGradient>
        {/* Pared interior del hundido: al revés que el reborde */}
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8F441B" />
          <stop offset="50%" stopColor="#B4663A" />
          <stop offset="100%" stopColor="#E09868" />
        </linearGradient>
        {/* Fondo del hundido: algo más oscuro que la cera (le llega menos luz) */}
        <radialGradient id={`${id}-face`} cx="55%" cy="58%" r="65%">
          <stop offset="0%" stopColor="#C4743F" />
          <stop offset="100%" stopColor="#A8592C" />
        </radialGradient>
        <filter id={`${id}-soft`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.45" />
        </filter>
        <filter id={`${id}-inner`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.7" />
        </filter>
        {/* Pintura marfil con volumen: más clara arriba, dorada abajo */}
        <linearGradient id={`${id}-ivory`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF6E6" />
          <stop offset="55%" stopColor="#F4DFC0" />
          <stop offset="100%" stopColor="#DDBB8E" />
        </linearGradient>
        <clipPath id={`${id}-faceclip`}>
          <circle cx="50" cy="50" r="29" />
        </clipPath>
      </defs>

      {/* Cera derramada y su canto */}
      <path d={WAX_BLOB} fill={url("blob")} />
      <path d={WAX_BLOB} fill="none" stroke="rgba(110, 45, 15, 0.35)" strokeWidth="1.2" />

      {/* Reborde, pared y disco estampado */}
      <circle cx="50" cy="50" r="35" fill={url("rim")} />
      <circle cx="50" cy="50" r="32.2" fill={url("wall")} />
      <circle cx="50" cy="50" r="29" fill={url("face")} />

      {/* Profundidad del hundido: el reborde tapa la luz (que viene de arriba
          a la izquierda) y deja una sombra interior en ese lado; en el lado
          opuesto la pared iluminada devuelve un reflejo suave */}
      <g clipPath={url("faceclip")}>
        <circle
          cx="51.6" cy="52" r="31"
          fill="none" stroke="rgba(55, 18, 4, 0.62)" strokeWidth="7"
          filter={url("inner")}
        />
        <circle
          cx="48.8" cy="48.6" r="30.6"
          fill="none" stroke="rgba(255, 210, 175, 0.32)" strokeWidth="3.5"
          filter={url("inner")}
        />
      </g>
      {/* Iniciales en relieve pintadas en marfil. A tamaño real el disco mide
          ~60px, así que van grandes, juntas ("Y&E") y con trazo engrosado para
          que la cursiva fina se lea; relieve: sombra nítida abajo-derecha y
          filo de luz sutil arriba-izquierda */}
      <g className="wax-monogram" fontSize="20" textAnchor="middle" strokeLinejoin="round">
        <text x="49.5" y="57.4" fill="rgba(55, 18, 4, 0.8)" stroke="rgba(55, 18, 4, 0.8)" strokeWidth="0.9">Y&amp;E</text>
        <text x="48.2" y="56.1" fill="rgba(255, 248, 236, 0.6)" stroke="rgba(255, 248, 236, 0.6)" strokeWidth="0.7">Y&amp;E</text>
        <text x="48.6" y="56.5" fill={url("ivory")} stroke={url("ivory")} strokeWidth="0.7">Y&amp;E</text>
      </g>

      {/* Brillos de la cera */}
      <g fill="none" strokeLinecap="round" filter={url("soft")}>
        <path d="M17,30 C23,18 36,10 50,9" stroke="rgba(255, 244, 232, 0.85)" strokeWidth="2.2" />
        <path d="M27,36 C31,27 39,21 48,19.5" stroke="rgba(255, 240, 228, 0.55)" strokeWidth="1.1" />
        <path d="M88,64 C86,72 80,80 72,85" stroke="rgba(255, 236, 220, 0.4)" strokeWidth="1.4" />
      </g>
      <ellipse cx="93" cy="42" rx="1.4" ry="3" fill="rgba(255, 240, 225, 0.55)" filter={url("soft")} />
    </svg>
  );
}
