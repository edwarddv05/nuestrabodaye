import { motion, useReducedMotion } from "motion/react";
import { Heart } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   SVG TORN PAPER DIVIDER (TRANSICIÓN DE FOTOS)
   ═══════════════════════════════════════════════════════ */
export function TornEdge({ position = "bottom", bg = "#FAF7F2" }) {
  const isTop = position === "top";
  return (
    <div
      className={isTop ? "torn-top" : "torn-bottom"}
      style={{ pointerEvents: "none" }}
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-7 sm:h-11 block"
      >
        <path
          d="M0,0 C45,18 90,8 140,25 C190,42 240,15 290,28 C340,41 385,12 430,30 C475,48 520,20 570,32 C620,44 665,14 710,29 C755,44 800,16 850,31 C900,46 945,18 990,30 C1035,42 1080,15 1130,28 C1170,38 1190,20 1200,24 L1200,60 L0,60 Z"
          fill={bg}
        />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ELEMENTOS DECORATIVOS BOTÁNICOS & MONOGRAMA
   ═══════════════════════════════════════════════════════ */
/* Dibujo a tinta: los tallos se trazan (pathLength) y después brotan las hojas
   una a una. Con "reducir movimiento" se muestra todo directamente. */
// custom = { i: orden de la hoja, base: retraso inicial en segundos }
const drawStem = {
  hidden: { pathLength: 0 },
  shown: ({ base = 0 } = {}) => ({
    pathLength: 1,
    transition: { delay: base, duration: 1.4, ease: "easeInOut" },
  }),
};

const sprout = {
  hidden: { opacity: 0, scale: 0.3 },
  shown: ({ i = 0, base = 0 } = {}) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: base + 0.35 + i * 0.09, duration: 0.45, ease: "easeOut" },
  }),
};

// Las hojas escalan desde su propio centro
const leafOrigin = { transformBox: "fill-box", transformOrigin: "center" };

// Reproduce al entrar en pantalla, o cuando `play` pase a true (portada, tras el
// sobre; con retraso para que el trazo empiece cuando la portada ya es visible)
function useDrawing(play) {
  const reduced = useReducedMotion();
  if (reduced) return { initial: false, animate: "shown" };
  if (play === undefined) {
    return { initial: "hidden", whileInView: "shown", viewport: { once: true, margin: "0px 0px -40px 0px" } };
  }
  return { initial: "hidden", animate: play ? "shown" : "hidden" };
}

const BRANCH_LEAVES = [
  { d: "M60,24 C55,16 72,14 78,22 C70,26 64,28 60,24 Z", fill: "#595F43", o: 0.8 },
  { d: "M100,18 C95,9 112,8 116,16 C108,20 102,21 100,18 Z", fill: "#CA7C4B", o: 0.75 },
  { d: "M140,26 C136,15 154,16 156,24 C148,29 142,29 140,26 Z", fill: "#595F43", o: 0.85 },
  { d: "M190,36 C196,25 214,30 208,40 C200,41 192,39 190,36 Z", fill: "#595F43", o: 0.8 },
  { d: "M230,34 C238,24 254,30 248,39 C240,40 232,38 230,34 Z", fill: "#CA7C4B", o: 0.75 },
];

export function BotanicalBranch({ play }) {
  const drawing = useDrawing(play);
  // En la portada espera a que el sobre se haya desvanecido
  const base = play === undefined ? 0 : 0.7;
  return (
    <div className="w-full max-w-[240px] mx-auto my-4 flex items-center justify-center opacity-75 pointer-events-none">
      <motion.svg viewBox="0 0 300 60" className="w-full h-auto" {...drawing}>
        <motion.path
          d="M20,30 Q90,10 150,30 Q210,50 280,30"
          fill="none"
          stroke="#595F43"
          strokeWidth="1.3"
          strokeLinecap="round"
          variants={drawStem}
          custom={{ base }}
        />
        {BRANCH_LEAVES.map((leaf, i) => (
          <motion.path
            key={leaf.d}
            d={leaf.d}
            fill={leaf.fill}
            fillOpacity={leaf.o}
            style={leafOrigin}
            variants={sprout}
            custom={{ i, base }}
          />
        ))}
      </motion.svg>
    </div>
  );
}

// Hojas de cada lado de la corona, de arriba abajo
const WREATH_LEFT = [
  ["M106,25 C98,16 88,18 86,26 C94,29 102,27 106,25 Z", "#595F43", 0.85],
  ["M96,30 C88,22 80,27 82,35 C90,36 95,33 96,30 Z", "#707755", 0.75],
  ["M72,44 C62,37 54,45 58,54 C66,52 72,48 72,44 Z", "#595F43", 0.85],
  ["M56,60 C46,54 40,66 48,72 C56,70 59,64 56,60 Z", "#707755", 0.75],
  ["M36,86 C24,84 22,96 28,102 C37,99 38,91 36,86 Z", "#595F43", 0.85],
  ["M26,112 C16,114 17,126 26,130 C32,123 32,117 26,112 Z", "#707755", 0.75],
  ["M36,140 C28,148 36,158 45,156 C46,148 41,141 36,140 Z", "#595F43", 0.85],
  ["M52,166 C46,176 58,184 68,178 C66,169 59,166 52,166 Z", "#707755", 0.75],
  ["M80,188 C76,198 90,204 98,194 C94,188 86,186 80,188 Z", "#595F43", 0.85],
];
const WREATH_RIGHT = [
  ["M114,25 C122,16 132,18 134,26 C126,29 118,27 114,25 Z", "#595F43", 0.85],
  ["M124,30 C132,22 140,27 138,35 C130,36 125,33 124,30 Z", "#707755", 0.75],
  ["M148,44 C158,37 166,45 162,54 C154,52 148,48 148,44 Z", "#595F43", 0.85],
  ["M164,60 C174,54 180,66 172,72 C164,70 161,64 164,60 Z", "#707755", 0.75],
  ["M184,86 C196,84 198,96 192,102 C183,99 182,91 184,86 Z", "#595F43", 0.85],
  ["M194,112 C204,114 203,126 194,130 C188,123 188,117 194,112 Z", "#707755", 0.75],
  ["M184,140 C192,148 184,158 175,156 C174,148 179,141 184,140 Z", "#595F43", 0.85],
  ["M168,166 C174,176 162,184 152,178 C154,169 161,166 168,166 Z", "#707755", 0.75],
  ["M140,188 C144,198 130,204 122,194 C126,188 134,186 140,188 Z", "#595F43", 0.85],
];

export function MonogramWreath({ initials = "Y & E" }) {
  const drawing = useDrawing();
  // Las ramas crecen desde abajo: las hojas inferiores brotan primero
  const leaves = (list) =>
    list.map(([d, fill, o], i) => (
      <motion.path
        key={d}
        d={d}
        fill={fill}
        fillOpacity={o}
        stroke="none"
        style={leafOrigin}
        variants={sprout}
        custom={{ i: list.length - 1 - i }}
      />
    ));

  return (
    <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto flex items-center justify-center my-6">
      <motion.svg
        viewBox="0 0 220 220"
        fill="none"
        stroke="#595F43"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
        {...drawing}
      >
        <motion.path d="M110,195 C62,188 24,154 24,110 C24,66 62,32 108,25" strokeWidth="1.4" variants={drawStem} custom={{}} />
        <motion.path d="M110,195 C158,188 196,154 196,110 C196,66 158,32 112,25" strokeWidth="1.4" variants={drawStem} custom={{}} />
        {leaves(WREATH_LEFT)}
        {leaves(WREATH_RIGHT)}

        {/* Frutos terracota: el de abajo al empezar, los de arriba al cerrar la corona */}
        <motion.circle cx="110" cy="195" r="2.5" fill="#CA7C4B" stroke="none" style={leafOrigin} variants={sprout} custom={{ i: 0 }} />
        <motion.circle cx="108" cy="25" r="2.2" fill="#CA7C4B" stroke="none" style={leafOrigin} variants={sprout} custom={{ i: 10 }} />
        <motion.circle cx="112" cy="25" r="2.2" fill="#CA7C4B" stroke="none" style={leafOrigin} variants={sprout} custom={{ i: 10 }} />
      </motion.svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
        <span className="font-script text-3xl sm:text-4xl text-olive font-normal leading-none tracking-normal">
          {initials}
        </span>
        <Heart size={10} className="text-terracotta fill-terracotta mt-1.5" />
      </div>
    </div>
  );
}


export function MemorialDoveSVG({ className = "w-6 h-6 sm:w-7 sm:h-7 inline-block ml-2 text-olive" }) {
  return (
    <span className="inline-flex items-center" title="En memoria">
      <svg
        viewBox="0 0 40 32"
        className={className}
        style={{ verticalAlign: "-0.24em" }}
        aria-label="En memoria"
      >
        {/* Silueta completa y cerrada de la paloma */}
        <path
          d="M26,13 L29,14.5 L26,16 C25,19 22,22 18,24 C14,26 9,26.5 4,26 C2,25 1,23 2,21 C4,21.5 6,21.5 8,21 C6,19 4,17 3.5,14 C5.5,15 8,15.5 10,15 C9,11 10,7 13,5 C13,8 14,11 16,13 C17,9 19,6 22,5 C21,8 21,11 21.5,13.5 C23,12 24.5,11.5 26,13 Z"
          fill="#595F43"
          fillOpacity="0.22"
          stroke="#595F43"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Plumas interiores de las alas */}
        <path
          d="M13,5 C12,10 14,14 17,16"
          fill="none"
          stroke="#595F43"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M22,5 C20.5,9 21,12 22.5,14"
          fill="none"
          stroke="#595F43"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Ojo de la paloma */}
        <circle cx="24.5" cy="14" r="0.9" fill="#595F43" />

        {/* Ramita de olivo prominente en el pico */}
        {/* Tallo */}
        <path
          d="M29,14.5 C31.5,13 34.5,10 36,6"
          fill="none"
          stroke="#CA7C4B"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Hoja 1 (Olivo verde) */}
        <path
          d="M32,12 C34.5,10.5 36.5,11.5 37,13 C35,14 33,13.5 32,12 Z"
          fill="#595F43"
          stroke="#595F43"
          strokeWidth="0.8"
        />
        {/* Hoja 2 (Olivo verde) */}
        <path
          d="M34,8.5 C36.5,6.8 38,8 38,9.5 C36.2,10.2 35,9.5 34,8.5 Z"
          fill="#595F43"
          stroke="#595F43"
          strokeWidth="0.8"
        />
        {/* Fruto/brote en terracota */}
        <circle cx="36" cy="6" r="1.3" fill="#CA7C4B" />
      </svg>
    </span>
  );
}
