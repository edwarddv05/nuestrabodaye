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
        <radialGradient id={`${id}-face`} cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#D2855A" />
          <stop offset="100%" stopColor="#B8683A" />
        </radialGradient>
        <filter id={`${id}-soft`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.45" />
        </filter>
      </defs>

      {/* Cera derramada y su canto */}
      <path d={WAX_BLOB} fill={url("blob")} />
      <path d={WAX_BLOB} fill="none" stroke="rgba(110, 45, 15, 0.35)" strokeWidth="1.2" />

      {/* Reborde, pared y disco estampado */}
      <circle cx="50" cy="50" r="35" fill={url("rim")} />
      <circle cx="50" cy="50" r="31.6" fill={url("wall")} />
      <circle cx="50" cy="50" r="29.8" fill={url("face")} />
      <circle cx="50" cy="50.5" r="26.6" fill="none" stroke="rgba(255, 215, 185, 0.35)" strokeWidth="0.6" />
      <circle cx="50" cy="50" r="26.6" fill="none" stroke="rgba(120, 50, 20, 0.4)" strokeWidth="0.6" />

      {/* Iniciales pintadas en marfil (--ivory) sobre el relieve, como la
          pintura de los sellos de lacre; sombra fina para que asienten */}
      <g className="wax-monogram" fontSize="18" textAnchor="middle">
        <text x="50.6" y="56.6" fill="rgba(90, 32, 8, 0.6)">Y &amp; E</text>
        <text x="50" y="56" fill="#F7E7CD" stroke="#F7E7CD" strokeWidth="0.35">Y &amp; E</text>
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
