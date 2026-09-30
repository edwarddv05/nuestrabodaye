/* ═══════════════════════════════════════════════════════
   VECTOR SVGs PARA EL ITINERARIO (ESTILO LINE ART ELEGANTE)
   ═══════════════════════════════════════════════════════ */
export function ItineraryGuestsSVG() {
  return (
    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-1 text-olive">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="#595F43"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
      >
        {/* Central figure */}
        <circle cx="50" cy="34" r="9" />
        <path d="M36,68 C36,54 42,50 50,50 C58,50 64,54 64,68" />
        {/* Left figure */}
        <circle cx="30" cy="40" r="7" />
        <path d="M19,72 C19,60 24,56 31,56 C33,56 35,57 37,58" />
        {/* Right figure */}
        <circle cx="70" cy="40" r="7" />
        <path d="M63,58 C65,57 67,56 69,56 C76,56 81,60 81,72" />
        {/* Accent dot / sparkle */}
        <circle cx="50" cy="18" r="1.5" fill="#CA7C4B" />
      </svg>
    </div>
  );
}

export function ItineraryChurchSVG() {
  return (
    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-1 text-olive">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="#595F43"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
      >
        <path d="M50,8 L50,22 M44,14 L56,14" strokeWidth="2.2" />
        <path d="M50,22 L34,42 L66,42 Z" />
        <path
          d="M50,35 C48,32 44,32 44,35 C44,38 50,41 50,41 C50,41 56,38 56,35 C56,32 52,32 50,35 Z"
          fill="#595F43"
          stroke="none"
        />
        <path d="M26,48 L50,34 L74,48 L74,88 L26,88 Z" />
        <path d="M42,88 L42,66 C42,60 58,60 58,66 L58,88" />
        <path d="M50,60 L50,88" />
        <rect x="31" y="60" width="5" height="10" rx="2" />
        <rect x="64" y="60" width="5" height="10" rx="2" />
        <path d="M18,88 L82,88" strokeWidth="2.2" />
      </svg>
    </div>
  );
}

export function ItineraryCocktailSVG() {
  return (
    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-1 text-olive">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="#595F43"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
      >
        <path d="M30,26 L46,52 L46,78 M36,78 L56,78" />
        <path d="M22,26 Q38,48 48,38 Q38,20 22,26 Z" fill="#595F43" fillOpacity="0.2" />
        <path d="M70,26 L54,52 L54,78 M44,78 L64,78" />
        <path d="M78,26 Q62,48 52,38 Q62,20 78,26 Z" fill="#595F43" fillOpacity="0.2" />
        <path d="M50,14 L50,22 M46,18 L54,18" stroke="#CA7C4B" strokeWidth="2" />
        <circle cx="50" cy="18" r="1.5" fill="#CA7C4B" />
      </svg>
    </div>
  );
}

export function ItineraryDinnerSVG() {
  return (
    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-1 text-olive">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="#595F43"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
      >
        {/* Cloche dome */}
        <path d="M22,66 C22,40 34,32 50,32 C66,32 78,40 78,66 Z" fill="#595F43" fillOpacity="0.15" />
        <path d="M22,66 C22,40 34,32 50,32 C66,32 78,40 78,66 Z" />
        {/* Handle */}
        <circle cx="50" cy="26" r="4.5" />
        <path d="M50,21.5 L50,26" />
        {/* Tray base */}
        <path d="M16,68 L84,68" strokeWidth="2.4" />
        <path d="M24,73 L76,73" strokeWidth="1.6" />
        {/* Sparkle */}
        <path d="M48,12 L50,8 L52,12 L56,14 L52,16 L50,20 L48,16 L44,14 Z" fill="#CA7C4B" stroke="none" />
      </svg>
    </div>
  );
}

export function ItineraryDanceSVG() {
  return (
    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-1 text-olive">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="#595F43"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
      >
        {/* Hanging wire & cap */}
        <path d="M50,4 L50,20" />
        <rect x="46" y="20" width="8" height="4" rx="1" fill="#595F43" />
        {/* Disco Ball */}
        <circle cx="50" cy="52" r="28" fill="#595F43" fillOpacity="0.12" />
        <circle cx="50" cy="52" r="28" />
        {/* Disco grid lines */}
        <path d="M22,52 L78,52" />
        <path d="M26,40 L74,40" />
        <path d="M26,64 L74,64" />
        <path d="M34,30 L66,30" />
        <path d="M34,74 L66,74" />
        <ellipse cx="50" cy="52" rx="14" ry="28" />
        <path d="M50,24 L50,80" />
        {/* Sparkles around disco ball */}
        <path d="M18,28 L20,24 L22,28 L26,30 L22,32 L20,36 L18,32 L14,30 Z" fill="#CA7C4B" stroke="none" />
        <path d="M80,34 L81.5,31 L83,34 L86,35.5 L83,37 L81.5,40 L80,37 L77,35.5 Z" fill="#CA7C4B" stroke="none" />
        <path d="M76,68 L77.5,65 L79,68 L82,69.5 L79,71 L77.5,74 L76,71 L73,69.5 Z" fill="#CA7C4B" stroke="none" />
      </svg>
    </div>
  );
}

export function ItineraryIcon({ type }) {
  switch (type) {
    case "reception":
      return <ItineraryGuestsSVG />;
    case "church":
      return <ItineraryChurchSVG />;
    case "cocktail":
      return <ItineraryCocktailSVG />;
    case "dinner":
      return <ItineraryDinnerSVG />;
    case "dance":
      return <ItineraryDanceSVG />;
    default:
      return <ItineraryChurchSVG />;
  }
}

/* ═══════════════════════════════════════════════════════
   VECTOR SVGs PARA REGALOS (ESTILO LINE ART CON PUNTO DECORATIVO)
   ═══════════════════════════════════════════════════════ */
export function GiftsHouseSVG() {
  return (
    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 text-olive">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="#595F43"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
      >
        {/* Accent dot */}
        <circle cx="50" cy="16" r="1.5" fill="#CA7C4B" />
        {/* Roof */}
        <path d="M22,46 L50,24 L78,46" />
        {/* Walls */}
        <path d="M28,45 L28,78 L72,78 L72,45" />
        {/* Door with arch */}
        <path d="M43,78 L43,60 C43,55 57,55 57,60 L57,78" />
        {/* Ground accent line */}
        <path d="M18,78 L82,78" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function GiftsPhoneSVG() {
  return (
    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 text-olive">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="#595F43"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
      >
        {/* Accent dot */}
        <circle cx="50" cy="12" r="1.5" fill="#CA7C4B" />
        {/* Phone body */}
        <rect x="34" y="20" width="32" height="58" rx="6" />
        {/* Speaker top bar */}
        <path d="M46,26 L54,26" />
        {/* Heart in screen */}
        <path
          d="M50,47 C48,43 43,43 43,47 C43,52 50,56 50,56 C50,56 57,52 57,47 C57,43 52,43 50,47 Z"
          fill="#595F43"
          fillOpacity="0.18"
          stroke="#595F43"
          strokeWidth="1.6"
        />
        {/* Bottom home line */}
        <path d="M46,71 L54,71" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   VECTOR SVGs PARA EL DRESSCODE (VERDE OLIVO #595F43)
   ═══════════════════════════════════════════════════════ */
export function DressWomanSVG() {
  return (
    <div className="w-16 h-22 sm:w-18 sm:h-24 mx-auto text-[#595F43]">
      <svg
        viewBox="0 0 80 120"
        fill="none"
        stroke="#595F43"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
      >
        <path d="M28,24 L32,36 M52,24 L48,36" />
        <path d="M32,36 C36,40 44,40 48,36" />
        <path d="M32,36 C30,48 32,58 35,62 L45,62 C48,58 50,48 48,36" fill="#595F43" fillOpacity="0.18" />
        <path
          d="M35,62 C30,80 20,105 16,112 C24,115 56,115 64,112 C60,105 50,80 45,62 Z"
          fill="#595F43"
          fillOpacity="0.18"
        />
        <path d="M36,70 Q38,95 36,112" />
        <path d="M44,70 Q42,95 44,112" />
        <path d="M35,62 L45,62" strokeWidth="2.5" />
      </svg>
    </div>
  );
}

export function DressManSVG() {
  return (
    <div className="w-18 h-22 sm:w-20 sm:h-24 mx-auto text-[#595F43]">
      <svg
        viewBox="0 0 100 120"
        fill="none"
        stroke="#595F43"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
      >
        <path d="M38,24 L50,34 L62,24" />
        <path d="M44,28 L56,36 L56,28 L44,36 Z" fill="#595F43" />
        <circle cx="50" cy="32" r="2" fill="#CA7C4B" />
        <path d="M38,24 L22,34 L26,98 L50,98 L50,56 L38,24 Z" fill="#595F43" fillOpacity="0.18" />
        <path d="M62,24 L78,34 L74,98 L50,98 L50,56 L62,24 Z" fill="#595F43" fillOpacity="0.18" />
        <path d="M38,24 L48,56 M62,24 L52,56" strokeWidth="2.5" />
        <path d="M32,48 L40,48" strokeWidth="2.5" />
        <path d="M34,48 L36,44 L38,48" fill="#CA7C4B" stroke="#CA7C4B" />
        <circle cx="50" cy="68" r="2" fill="#595F43" />
        <circle cx="50" cy="80" r="2" fill="#595F43" />
      </svg>
    </div>
  );
}

export function WhatsAppIcon({ size = 20, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
    >
      <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.908.536 3.69 1.464 5.212L2 22l4.908-1.428a10.007 10.007 0 0 0 5.123 1.464c5.536 0 10.031-4.495 10.031-10.031S17.567 2 12.031 2zm0 18.257a8.216 8.216 0 0 1-4.204-1.157l-.302-.18-2.908.847.854-2.833-.198-.316a8.214 8.214 0 0 1-1.267-4.387c0-4.549 3.702-8.252 8.251-8.252 4.549 0 8.252 3.703 8.252 8.252 0 4.549-3.703 8.252-8.252 8.252zm4.526-6.177c-.248-.124-1.468-.724-1.696-.807-.228-.083-.394-.124-.56.124-.166.248-.642.807-.787.973-.145.166-.29.186-.538.062-.248-.124-1.047-.386-1.995-1.231-.738-.658-1.236-1.472-1.381-1.72-.145-.248-.015-.382.109-.506.111-.111.248-.29.373-.435.124-.145.166-.248.248-.414.083-.166.041-.311-.021-.435-.062-.124-.56-1.349-.767-1.848-.201-.486-.406-.42-.56-.428l-.477-.008c-.166 0-.435.062-.663.311-.228.248-.87 0.85-.87 2.073s.891 2.404 1.015 2.57c.124.166 1.753 2.678 4.248 3.755.594.256 1.058.409 1.42.524.597.19 1.14.163 1.569.099.479-.071 1.468-.601 1.675-1.182.207-.581.207-1.078.145-1.182-.062-.104-.228-.166-.477-.29z" />
    </svg>
  );
}
