import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  MapPin,
  CalendarPlus,
  Send,
  ArrowRight,
  Crown,
  Copy,
  Check,
  Navigation,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  CreditCard,
  Gift,
  Home,
  Smartphone,
  Landmark,
  Plus,
  Trash2,
} from "lucide-react";
import { wedding as W } from "./data";

/* ═══════════════════════════════════════════════════════
   HOOKS: CUENTA REGRESIVA Y AUDIO SYNTH
   ═══════════════════════════════════════════════════════ */
function useCountdown(target) {
  const calc = () => {
    const diff = Math.max(0, target - Date.now());
    return {
      d: Math.floor(diff / (1000 * 60 * 60 * 24)),
      h: Math.floor(diff / (1000 * 60 * 60)) % 24,
      m: Math.floor(diff / (1000 * 60)) % 60,
      s: Math.floor(diff / 1000) % 60,
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const timer = setInterval(() => setTime(calc), 1000);
    return () => clearInterval(timer);
  }, []);
  return time;
}

function useAudioPlayer(src = "./assets/song.m4a") {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      }
    };

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleEnded = () => setPlaying(false);
    const handleVolumeChange = () => setMuted(audio.muted);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("volumechange", handleVolumeChange);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("volumechange", handleVolumeChange);
      audio.pause();
      audio.src = "";
    };
  }, [src]);

  const start = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.play().catch(() => {
      // Browser autoplay restriction handling
    });
  }, []);

  const stop = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
  }, []);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => { });
    } else {
      audioRef.current.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => { });
    }
    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  }, []);

  const seek = useCallback((percent) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    audioRef.current.currentTime = (percent / 100) * audioRef.current.duration;
  }, []);

  const skip = useCallback((seconds) => {
    if (!audioRef.current) return;
    const target = (audioRef.current.currentTime || 0) + seconds;
    audioRef.current.currentTime = Math.max(0, Math.min(audioRef.current.duration || 9999, target));
  }, []);

  return { playing, muted, progress, currentTime, duration, toggle, toggleMute, start, stop, seek, skip };
}

/* ═══════════════════════════════════════════════════════
   SVG TORN PAPER DIVIDER (TRANSICIÓN DE FOTOS)
   ═══════════════════════════════════════════════════════ */
function TornEdge({ position = "bottom", bg = "#FAF7F2" }) {
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
function BotanicalBranch() {
  return (
    <div className="w-full max-w-[240px] mx-auto my-4 flex items-center justify-center opacity-75 pointer-events-none">
      <svg viewBox="0 0 300 60" className="w-full h-auto">
        <path
          d="M20,30 Q90,10 150,30 Q210,50 280,30"
          fill="none"
          stroke="#595F43"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path d="M60,24 C55,16 72,14 78,22 C70,26 64,28 60,24 Z" fill="#595F43" opacity="0.8" />
        <path d="M100,18 C95,9 112,8 116,16 C108,20 102,21 100,18 Z" fill="#CA7C4B" opacity="0.75" />
        <path d="M140,26 C136,15 154,16 156,24 C148,29 142,29 140,26 Z" fill="#595F43" opacity="0.85" />
        <path d="M190,36 C196,25 214,30 208,40 C200,41 192,39 190,36 Z" fill="#595F43" opacity="0.8" />
        <path d="M230,34 C238,24 254,30 248,39 C240,40 232,38 230,34 Z" fill="#CA7C4B" opacity="0.75" />
      </svg>
    </div>
  );
}

function MonogramWreath({ initials = "Y & E" }) {
  return (
    <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto flex items-center justify-center my-6">
      <svg
        viewBox="0 0 220 220"
        fill="none"
        stroke="#595F43"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
      >
        {/* Ramita izquierda orgánica más amplia */}
        <path
          d="M110,195 C62,188 24,154 24,110 C24,66 62,32 108,25"
          strokeWidth="1.4"
        />
        {/* Hojas rama izquierda */}
        <path d="M106,25 C98,16 88,18 86,26 C94,29 102,27 106,25 Z" fill="#595F43" fillOpacity="0.85" stroke="none" />
        <path d="M96,30 C88,22 80,27 82,35 C90,36 95,33 96,30 Z" fill="#707755" fillOpacity="0.75" stroke="none" />
        <path d="M72,44 C62,37 54,45 58,54 C66,52 72,48 72,44 Z" fill="#595F43" fillOpacity="0.85" stroke="none" />
        <path d="M56,60 C46,54 40,66 48,72 C56,70 59,64 56,60 Z" fill="#707755" fillOpacity="0.75" stroke="none" />
        <path d="M36,86 C24,84 22,96 28,102 C37,99 38,91 36,86 Z" fill="#595F43" fillOpacity="0.85" stroke="none" />
        <path d="M26,112 C16,114 17,126 26,130 C32,123 32,117 26,112 Z" fill="#707755" fillOpacity="0.75" stroke="none" />
        <path d="M36,140 C28,148 36,158 45,156 C46,148 41,141 36,140 Z" fill="#595F43" fillOpacity="0.85" stroke="none" />
        <path d="M52,166 C46,176 58,184 68,178 C66,169 59,166 52,166 Z" fill="#707755" fillOpacity="0.75" stroke="none" />
        <path d="M80,188 C76,198 90,204 98,194 C94,188 86,186 80,188 Z" fill="#595F43" fillOpacity="0.85" stroke="none" />

        {/* Ramita derecha orgánica más amplia */}
        <path
          d="M110,195 C158,188 196,154 196,110 C196,66 158,32 112,25"
          strokeWidth="1.4"
        />
        {/* Hojas rama derecha */}
        <path d="M114,25 C122,16 132,18 134,26 C126,29 118,27 114,25 Z" fill="#595F43" fillOpacity="0.85" stroke="none" />
        <path d="M124,30 C132,22 140,27 138,35 C130,36 125,33 124,30 Z" fill="#707755" fillOpacity="0.75" stroke="none" />
        <path d="M148,44 C158,37 166,45 162,54 C154,52 148,48 148,44 Z" fill="#595F43" fillOpacity="0.85" stroke="none" />
        <path d="M164,60 C174,54 180,66 172,72 C164,70 161,64 164,60 Z" fill="#707755" fillOpacity="0.75" stroke="none" />
        <path d="M184,86 C196,84 198,96 192,102 C183,99 182,91 184,86 Z" fill="#595F43" fillOpacity="0.85" stroke="none" />
        <path d="M194,112 C204,114 203,126 194,130 C188,123 188,117 194,112 Z" fill="#707755" fillOpacity="0.75" stroke="none" />
        <path d="M184,140 C192,148 184,158 175,156 C174,148 179,141 184,140 Z" fill="#595F43" fillOpacity="0.85" stroke="none" />
        <path d="M168,166 C174,176 162,184 152,178 C154,169 161,166 168,166 Z" fill="#707755" fillOpacity="0.75" stroke="none" />
        <path d="M140,188 C144,198 130,204 122,194 C126,188 134,186 140,188 Z" fill="#595F43" fillOpacity="0.85" stroke="none" />

        {/* Frutos / Acentos botánicos terracota */}
        <circle cx="108" cy="25" r="2.2" fill="#CA7C4B" />
        <circle cx="112" cy="25" r="2.2" fill="#CA7C4B" />
        <circle cx="110" cy="195" r="2.5" fill="#CA7C4B" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
        <span className="font-script text-3xl sm:text-4xl text-olive font-normal leading-none tracking-normal">
          {initials}
        </span>
        <Heart size={10} className="text-terracotta fill-terracotta mt-1.5" />
      </div>
    </div>
  );
}


function MemorialDoveSVG({ className = "w-6 h-6 sm:w-7 sm:h-7 inline-block ml-2 text-olive" }) {
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

/* ═══════════════════════════════════════════════════════
   VECTOR SVGs PARA EL ITINERARIO (ESTILO LINE ART ELEGANTE)
   ═══════════════════════════════════════════════════════ */
function ItineraryGuestsSVG() {
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

function ItineraryChurchSVG() {
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

function ItineraryCocktailSVG() {
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

function ItineraryDinnerSVG() {
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

function ItineraryDanceSVG() {
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

function renderItineraryIcon(type) {
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
function GiftsHouseSVG() {
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

function GiftsPhoneSVG() {
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
function DressWomanSVG() {
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

function DressManSVG() {
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

function WhatsAppIcon({ size = 20, className = "" }) {
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

/* ═══════════════════════════════════════════════════════
   1. PANTALLA DE APERTURA (SOBRE Y CARTA HD)
   ═══════════════════════════════════════════════════════ */
function EnvelopeModal({ onEnter }) {
  const [opened, setOpened] = useState(false);
  const [letterOut, setLetterOut] = useState(false);
  const [closedScreen, setClosedScreen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("lock");
    document.body.classList.add("lock");
  }, []);

  const handleOpenEnvelope = () => {
    if (opened) return;
    setOpened(true);
    // 600ms después de abrir la solapa, la carta se desliza hacia arriba
    setTimeout(() => {
      setLetterOut(true);
    }, 600);
  };

  const handleEnterWeb = () => {
    setClosedScreen(true);
    setTimeout(() => {
      document.documentElement.classList.remove("lock");
      document.body.classList.remove("lock");
      onEnter();
    }, 400);
  };

  if (closedScreen) return null;

  return (
    <div className="env-screen">
      <div className="env-wrap">
        <div className="env-box">
          {/* Fondo interior del sobre */}
          <div className="env-back">
            <div className="env-inner-lining" />
          </div>

          {/* CARTA DE INVITACIÓN HD */}
          <article className={`ltr-card ${letterOut ? "out" : ""}`}>
            <div className="ltr-inner-content">
              {/* Esquinas ornamentadas */}
              <span className="absolute top-2 left-2.5 text-olive opacity-50 text-xs">✦</span>
              <span className="absolute top-2 right-2.5 text-olive opacity-50 text-xs">✦</span>
              <span className="absolute bottom-2 left-2.5 text-olive opacity-50 text-xs">✦</span>
              <span className="absolute bottom-2 right-2.5 text-olive opacity-50 text-xs">✦</span>

              <div className="flex flex-col items-center">
                <Crown size={17} className="text-terracotta mb-0.5" />
                <span className="type-kicker text-muted">
                  {W.title}
                </span>
                <h2 className="type-envelope-title text-olive my-0.5">
                  {W.bride} & {W.groom}
                </h2>
                <div className="flex items-center gap-2 text-terracotta my-0.5">
                  <span className="h-[1px] w-8 bg-olive/35" />
                  <Heart size={8} fill="currentColor" />
                  <span className="h-[1px] w-8 bg-olive/35" />
                </div>
              </div>

              <div className="max-w-[280px]">
                <p className="type-body-small italic text-charcoal leading-snug">
                  "{W.verse.text}."
                </p>
                <span className="type-kicker text-terracotta mt-0.5 block">
                  {W.verse.ref}
                </span>
                <p className="type-body-small text-muted mt-1 leading-snug">
                  Con inmensa alegría queremos invitarte a celebrar el inicio de nuestra vida juntos.
                </p>
              </div>

              <div className="pt-0.5">
                <button
                  onClick={handleEnterWeb}
                  className="btn-pill-olive type-button py-2 px-7 flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Abrir Invitación</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </article>

          {/* Solapas frontales del sobre (bolsillo frontal) */}
          <div className="env-front">
            <span className="flap-l" />
            <span className="flap-r" />
            <span className="flap-b" />
          </div>

          {/* Solapa superior abatible (Debajo del sello de cera) */}
          <div className={`env-top ${opened ? "open" : ""}`} />

          {/* Sello de Cera Orgánico Realista (Forma Diseño 1 con Paleta Terracota) */}
          <button
            onClick={handleOpenEnvelope}
            className={`wax-seal-btn ${opened ? "opened" : ""}`}
            title="Haz clic para abrir la carta"
            aria-expanded={opened}
          >
            <div className="seal-ring" />
            <div className="seal-inner">
              <span className="seal-initials">Y & E</span>
              <span className="seal-action">ABRIR</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   2. REPRODUCTOR DE MÚSICA EMBEBIDO Y CLARO (CANVA STYLE)
   ═══════════════════════════════════════════════════ */
function InlineMusicPlayer({ audio }) {
  return (
    <div className="text-center my-6 max-w-xs mx-auto">
      <p className="type-body-small text-[#383A30] mb-3 flex items-center justify-center gap-1.5 font-medium">
        Escucha nuestra canción
      </p>

      <div className="px-3">
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={audio.progress}
          onChange={(event) => audio.seek(Number(event.target.value))}
          aria-label="Progreso de nuestra canción"
          className="song-progress"
          style={{ "--song-progress": `${audio.progress}%` }}
        />

        <div className="flex items-center justify-center gap-6 text-[#595F43] mt-2">
          <button
            onClick={() => audio.skip(-10)}
            className="audio-skip text-[#595F43] hover:text-[#444933] hover:scale-110 transition-all p-1 cursor-pointer"
            title="Retroceder 10 segundos"
          >
            <SkipBack size={20} />
          </button>

          <button
            onClick={audio.toggle}
            className="w-11 h-11 rounded-full bg-[#595F43] text-[#FAF7F2] flex items-center justify-center shadow-md hover:bg-[#444933] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title={audio.playing ? "Pausar música" : "Reproducir música"}
          >
            {audio.playing ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" className="ml-0.5" />
            )}
          </button>

          <button
            onClick={() => audio.skip(10)}
            className="audio-skip text-[#595F43] hover:text-[#444933] hover:scale-110 transition-all p-1 cursor-pointer"
            title="Avanzar 10 segundos"
          >
            <SkipForward size={20} />
          </button>
        </div>

        <p className="type-track text-muted mt-3">
          ♫ {W.song.title.toUpperCase()} · {W.song.artist.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   3. APLICACIÓN PRINCIPAL (DISEÑO 4)
   ═══════════════════════════════════════════════════ */
export default function App() {
  const music = useAudioPlayer(W.song.src || "./assets/song.m4a");
  const countdown = useCountdown(W.date);

  // Estados interactivos
  const [copiedBank, setCopiedBank] = useState("");
  const [attending, setAttending] = useState("si");
  const [guestNames, setGuestNames] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const copyToClipboard = async (text, bankName) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const fallback = document.createElement("textarea");
        fallback.value = text;
        fallback.setAttribute("readonly", "");
        fallback.style.position = "fixed";
        fallback.style.opacity = "0";
        document.body.appendChild(fallback);
        fallback.select();
        const copied = document.execCommand("copy");
        fallback.remove();
        if (!copied) throw new Error("Clipboard unavailable");
      }

      setCopiedBank(bankName);
      showToast(`¡Cuenta ${bankName} copiada con éxito!`);
      setTimeout(() => setCopiedBank(""), 2200);
    } catch {
      showToast(`Cuenta: ${text}`);
    }
  };

  const handleCalendar = () => {
    const start = W.date;
    const end = new Date(start.getTime() + 8 * 60 * 60 * 1000);
    const formatDate = (d) => d.toISOString().replace(/-|:|\.\d+/g, "");
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `Boda ${W.bride} & ${W.groom}`
    )}&dates=${formatDate(start)}/${formatDate(end)}&location=${encodeURIComponent(
      `${W.events[0].place}, ${W.events[0].address}`
    )}&details=${encodeURIComponent("Ceremonia y Recepción de Boda.")}`;
    window.open(url, "_blank");
  };

  const sendWhatsApp = (recipient) => {
    const isBride = recipient === "novia";
    const phone = isBride ? "51987147762" : "51914854112";
    const personName = isBride ? "Yuleisi" : "Elder";

    let message = "";
    if (attending === "si") {
      const names = guestNames.trim();
      if (!names) {
        showToast("Por favor ingresa los nombres y apellidos de los asistentes.");
        return;
      }
      message = `¡Hola ${personName}! Confirmo nuestra asistencia a su boda ✨💍\n\n👥 *Nombres y apellidos de los asistentes:*\n${names}\n\n¡Nos vemos el 24 de Octubre para celebrar juntos! 🎉`;
    } else {
      message = `¡Hola ${personName}! Lamentablemente no podré asistir a su boda, pero les deseo de todo corazón lo mejor y muchas bendiciones en esta hermosa etapa juntos ✨❤️`;
    }

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <>
      {/* 1. SOBRE Y CARTA DE APERTURA */}
      <EnvelopeModal onEnter={() => music.start()} />

      {/* 2. BOTÓN DE AUDIO FLOTANTE (MUTEAR / ACTIVAR SONIDO) */}
      <button
        onClick={music.toggleMute}
        className="floating-audio cursor-pointer"
        aria-label="Silenciar o activar música"
        title={music.muted ? "Activar sonido" : "Silenciar música"}
      >
        {music.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      {/* TOAST FLOTANTE */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#2E3027] text-[#FAF7F2] type-body-small px-5 py-2 rounded-full shadow-lg border border-olive/30 flex items-center gap-2"
          >
            <Check size={15} className="text-terracotta" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#FAF7F2] text-[#2E3027] pb-24">
        {/* ═══════════════════════════════════════════════════
            HERO: PORTADA EDITORIAL LIMPIA (SIN CUADROS)
            ═══════════════════════════════════════════════════ */}
        <header className="pt-12 sm:pt-16 pb-6 text-center max-w-xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BotanicalBranch />

            <h2 className="type-hero-kicker text-olive">
              El inicio de una vida juntos
            </h2>

            <h1 className="type-hero-names text-olive my-2">
              {W.bride}
              <span className="type-hero-ampersand text-terracotta my-1">
                &
              </span>
              {W.groom}
            </h1>

            {/* Mini Reproductor Canva Style */}
            <InlineMusicPlayer audio={music} />
          </motion.div>
        </header>

        {/* FOTOGRAFÍA 1 CON TRANSICIÓN ORGÁNICA */}
        <div className="relative w-full max-w-2xl mx-auto my-8 overflow-hidden">
          <TornEdge position="top" bg="#FAF7F2" />
          <img
            src="./assets/fotos/1-Foto-1.jpg"
            alt="Yuleisi y Elder abrazados en las escaleras de piedra junto al mar"
            width="1280"
            height="853"
            fetchPriority="high"
            className="couple-cover"
          />
          <TornEdge position="bottom" bg="#FAF7F2" />
        </div>

        {/* ═══════════════════════════════════════════════════
            FRASE, PADRES & PADRINO DE AROS
            ═══════════════════════════════════════════════════ */}
        <section className="max-w-xl mx-auto px-6 py-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="type-lead italic text-[#555848] leading-relaxed max-w-md mx-auto mb-8">
              "{W.quote}"
            </p>

            <span className="type-kicker text-terracotta block mb-2">
              Con la bendición de Dios
            </span>
            <h2 className="type-section-heading text-olive mb-10">
              y nuestros queridos padres
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-6">
              <div>
                <h3 className="type-kicker text-muted mb-2">
                  Padres de la Novia
                </h3>
                <p className="type-body text-charcoal leading-snug flex items-center justify-center">
                  <span>{W.parents.bride.father}</span>
                  {W.parents.bride.fatherDeceased && <MemorialDoveSVG />}
                </p>
                <p className="type-body text-charcoal leading-snug flex items-center justify-center">
                  <span>{W.parents.bride.mother}</span>
                  {W.parents.bride.motherDeceased && <MemorialDoveSVG />}
                </p>
              </div>

              <div>
                <h3 className="type-kicker text-muted mb-2">
                  Padres del Novio
                </h3>
                {W.parents.groom.aunt && (
                  <p className="type-body text-charcoal leading-snug flex items-center justify-center">
                    <span>
                      {W.parents.groom.aunt} <em>(Tía)</em>
                    </span>
                  </p>
                )}
                <p className="type-body text-charcoal leading-snug flex items-center justify-center">
                  <span>{W.parents.groom.father}</span>
                  {W.parents.groom.fatherDeceased && <MemorialDoveSVG />}
                </p>
                <p className="type-body text-charcoal leading-snug flex items-center justify-center">
                  <span>{W.parents.groom.mother}</span>
                  {W.parents.groom.motherDeceased && <MemorialDoveSVG />}
                </p>
              </div>
            </div>

            {W.godparents?.rings?.name && (
              <div className="mt-8 pt-4">
                <h3 className="type-kicker text-muted mb-1">
                  {W.godparents.rings.title}
                </h3>
                <p className="type-body text-charcoal font-medium">
                  {W.godparents.rings.name}
                </p>
              </div>
            )}

            <div className="editorial-divider">✦</div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════
            FECHA & CUENTA REGRESIVA
            ═══════════════════════════════════════════════════ */}
        <section className="max-w-xl mx-auto px-6 py-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="type-section-heading text-olive">
              Tenemos el agrado de invitarlos
            </h3>
            <h4 className="type-section-subheading text-olive mb-6">
              a Nuestra Boda
            </h4>

            <div className="inline-flex flex-col items-center justify-center border-y border-olive/25 py-3.5 px-6 sm:px-10 my-2">
              <div className="flex items-center justify-center gap-6 sm:gap-10 font-serif text-olive">
                <span className="type-kicker text-muted">
                  SÁBADO
                </span>
                <span className="type-countdown-number text-charcoal">24</span>
                <span className="type-kicker text-muted">
                  OCTUBRE 2026
                </span>
              </div>
              <p className="type-body text-charcoal font-medium mt-2.5">
                Hora: <strong className="text-olive font-bold text-xl sm:text-2xl ml-1">{W.displayTime || "4:00 PM"}</strong>
              </p>
            </div>

            <div className="mt-8">
              <h4 className="type-section-subheading text-olive mb-3">Faltan</h4>
              <div className="flex items-center justify-center gap-4 sm:gap-6 text-olive font-serif">
                <div className="flex flex-col items-center">
                  <span className="type-countdown-number text-charcoal">{pad(countdown.d)}</span>
                  <span className="type-meta text-muted">
                    DÍAS
                  </span>
                </div>
                <span className="text-xl opacity-30 font-light">:</span>
                <div className="flex flex-col items-center">
                  <span className="type-countdown-number text-charcoal">{pad(countdown.h)}</span>
                  <span className="type-meta text-muted">
                    HORAS
                  </span>
                </div>
                <span className="text-xl opacity-30 font-light">:</span>
                <div className="flex flex-col items-center">
                  <span className="type-countdown-number text-charcoal">{pad(countdown.m)}</span>
                  <span className="type-meta text-muted">
                    MINUTOS
                  </span>
                </div>
                <span className="text-xl opacity-30 font-light">:</span>
                <div className="flex flex-col items-center">
                  <span className="type-countdown-number text-charcoal">{pad(countdown.s)}</span>
                  <span className="type-meta text-muted">
                    SEGUNDOS
                  </span>
                </div>
              </div>
            </div>

            <div className="editorial-divider my-8">✦</div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════
            DÓNDE & CUÁNDO (CEREMONIA & RECEPCIÓN)
            ═══════════════════════════════════════════════════ */}
        <section className="max-w-xl mx-auto px-6 py-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Ceremonia y Recepción con conector 'y' */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6">
              {/* Columna Ceremonia */}
              <div className="flex flex-col items-center flex-1 max-w-[190px]">
                <ItineraryChurchSVG />
                <h3 className="type-section-subheading text-olive mb-1">
                  {W.events[0].type}
                </h3>
              </div>

              {/* Conector Y */}
              <div className="type-section-subheading text-terracotta px-1 -mt-2 select-none">
                y
              </div>

              {/* Columna Recepción */}
              <div className="flex flex-col items-center flex-1 max-w-[190px]">
                <ItineraryCocktailSVG />
                <h3 className="type-section-subheading text-olive mb-1">
                  {W.events[1].type}
                </h3>
              </div>
            </div>

            {/* Lugar común sin dirección */}
            <div className="flex flex-col items-center">
              <p className="type-lead text-charcoal font-medium mb-5">
                {W.events[0].place}
              </p>

              <div className="flex items-center justify-center">
                <a
                  href={W.events[0].google}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pill-olive type-button py-2 px-6"
                >
                  <MapPin size={15} />
                  <span>Ver mapa</span>
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FOTOGRAFÍA 2 CON TRANSICIÓN ORGÁNICA */}
        <div className="relative w-full max-w-2xl mx-auto my-8 overflow-hidden">
          <TornEdge position="top" bg="#FAF7F2" />
          <img
            src="./assets/fotos/33.jpg"
            alt="Manos de la novia abrazando al novio y luciendo el anillo"
            className="w-full h-72 sm:h-88 object-cover"
          />
          <TornEdge position="bottom" bg="#FAF7F2" />
        </div>

        {/* ═══════════════════════════════════════════════════
            DRESSCODE & RECEPCIÓN ADULTOS (ILUSTRACIONES VERDE OLIVO)
            ═══════════════════════════════════════════════════ */}
        <section className="max-w-xl mx-auto px-6 py-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="type-section-title text-olive mb-1">
              {W.dress.title}
            </h2>
            <span className="type-meta text-charcoal block mb-6">
              {W.dress.type}
            </span>

            <div className="flex items-center justify-center gap-12 sm:gap-16 my-7">
              <div className="flex flex-col items-center">
                <DressWomanSVG />
                <span className="type-body text-olive font-medium mt-2.5">Damas</span>
                <span className="type-body-small text-charcoal mt-0.5">{W.dress.women}</span>
              </div>
              <div className="h-16 w-[1px] bg-olive/20" />
              <div className="flex flex-col items-center">
                <DressManSVG />
                <span className="type-body text-olive font-medium mt-2.5">Caballeros</span>
                <span className="type-body-small text-charcoal mt-0.5">{W.dress.men}</span>
              </div>
            </div>

            <p className="type-body-small italic text-[#555848] max-w-lg mx-auto mt-6 leading-relaxed">
              {W.dress.note}
            </p>

            <div className="mt-8 pt-4">
              <span className="type-section-subheading text-olive block">
                {W.dress.adultsTitle || "Solo Adultos"}
              </span>
              {W.dress.adults ? (
                <p className="type-body-small italic text-charcoal max-w-md mx-auto leading-relaxed mt-2">
                  "{W.dress.adults}"
                </p>
              ) : null}
            </div>

            <div className="editorial-divider">✦</div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════
            ✨ ITINERARIO CON ESPACIADO VERTICAL AJUSTADO (MÁS COMPACTO Y ELEGANTE)
            ═══════════════════════════════════════════════════ */}
        <section className="max-w-xl mx-auto px-4 sm:px-6 py-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="type-section-title text-olive mb-1">
              Itinerario
            </h2>
            <span className="type-kicker text-muted block mb-8">
              De nuestro gran día · Juntos todo es más especial
            </span>

            <div className="relative max-w-lg mx-auto py-2">
              <div
                className="absolute left-1/2 -translate-x-1/2 top-3 bottom-3 w-[2px] bg-[#595F43]"
                style={{ opacity: 0.65 }}
              />

              <div className="space-y-6 sm:space-y-7">
                {W.itinerary.map((item, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="relative flex items-center justify-center min-h-[75px]"
                    >
                      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#595F43] text-[#FAF7F2] flex items-center justify-center shadow-xs">
                        <Heart size={13} fill="currentColor" />
                      </div>

                      <div className="w-full grid grid-cols-2 gap-6 sm:gap-10 items-center">
                        <div
                          className={`flex flex-col items-center justify-center pr-3 sm:pr-4 text-center ${isLeft ? "visible" : "invisible"
                            }`}
                        >
                          {isLeft && (
                            <div className="flex flex-col items-center max-w-[190px] sm:max-w-[220px] mx-auto">
                              {renderItineraryIcon(item.type)}
                              <span className="type-event-time text-terracotta">
                                {item.time}
                              </span>
                              <h3 className="type-event-title text-[#2E3027] mt-0.5">
                                {item.title}
                              </h3>
                              <p className="type-event-description text-muted mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          )}
                        </div>

                        <div
                          className={`flex flex-col items-center justify-center pl-3 sm:pl-4 text-center ${!isLeft ? "visible" : "invisible"
                            }`}
                        >
                          {!isLeft && (
                            <div className="flex flex-col items-center max-w-[190px] sm:max-w-[220px] mx-auto">
                              {renderItineraryIcon(item.type)}
                              <span className="type-event-time text-terracotta">
                                {item.time}
                              </span>
                              <h3 className="type-event-title text-[#2E3027] mt-0.5">
                                {item.title}
                              </h3>
                              <p className="type-event-description text-muted mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="editorial-divider mt-10">✦</div>
          </motion.div>
        </section>

        <section className="couple-memories" aria-labelledby="memories-title">
          <h2 id="memories-title" className="type-section-title text-olive mb-6">
            Nosotros
          </h2>
          <div className="couple-memories-pair">
            <img
              src="./assets/fotos/7.jpg"
              alt="Yuleisi y Elder tomados de las manos bajo los olivos"
              width="1080"
              height="1620"
              loading="lazy"
              decoding="async"
            />
            <img
              src="./assets/fotos/30.jpg"
              alt="Yuleisi y Elder abrazados, juntando sus frentes"
              width="1080"
              height="1620"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="type-lead italic text-muted mt-6">
            {W.verse.text}.
          </p>
          <p className="type-caption text-muted mt-1">{W.verse.ref}</p>
          <div className="editorial-divider my-8">✦</div>
        </section>

        {/* ═══════════════════════════════════════════════════
            MESA DE REGALOS (BLOQUE ÚNICO CONTINUO - SIN SEPARADORES INTERNOS)
            ═══════════════════════════════════════════════════ */}
        <section className="max-w-xl mx-auto px-6 py-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="type-kicker text-terracotta block mb-2">
              Un Detalle Especial
            </span>
            <h2 className="type-section-title text-olive mb-3">
              {W.gifts.title || "Sugerencia de Regalo"}
            </h2>

            <p className="type-lead italic text-[#555848] max-w-md mx-auto leading-relaxed mb-8">
              {W.gifts.intro}
            </p>

            {/* Dirección de obsequio físico */}
            <div className="my-6">
              <GiftsHouseSVG />
              <p className="type-gift-note italic text-[#555848] max-w-md mx-auto mb-3 leading-relaxed">
                {W.gifts.homeNote}
              </p>
              <p className="type-body text-charcoal font-medium leading-snug">
                Psj. Las Rosas Mz C Lt 12
              </p>
              <p className="type-body-small text-muted mt-0.5">
                Asoc. Las Begonias – Carabayllo
              </p>
            </div>

            {/* Transferencias / Cuentas digitales */}
            <div className="my-8">
              <GiftsPhoneSVG />
              <p className="type-gift-note italic text-[#555848] max-w-md mx-auto mb-6 leading-relaxed">
                {W.gifts.accountNote}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-2">
                {/* Columna BCP */}
                <div>
                  <h4 className="type-card-title text-olive mb-0.5">
                    BCP
                  </h4>
                  <p className="type-body-small text-charcoal">
                    Yuleisi Paola Diaz Vergaray
                  </p>
                  <p className="type-account-row type-account text-charcoal mt-1">
                    <span>Cuenta: <strong>19197570498056</strong></span>
                    <button
                      onClick={() => copyToClipboard("19197570498056", "BCP")}
                      className="icon-button text-terracotta hover:scale-105 transition-transform cursor-pointer"
                      title="Copiar número de cuenta"
                    >
                      <Copy size={12} />
                    </button>
                  </p>
                  <p className="type-account-row type-account text-muted mt-0.5">
                    <span>CCI: <strong>00219119757049805656</strong></span>
                    <button
                      onClick={() => copyToClipboard("00219119757049805656", "CCI")}
                      className="icon-button text-terracotta hover:scale-105 transition-transform cursor-pointer"
                      title="Copiar CCI"
                    >
                      <Copy size={11} />
                    </button>
                  </p>
                </div>

                {/* Columna Yape */}
                <div>
                  <h4 className="type-card-title text-olive mb-0.5">
                    Yape
                  </h4>
                  <p className="type-body-small text-charcoal">
                    Yuleisi Paola Diaz Vergaray
                  </p>
                  <p className="type-account-row type-account text-charcoal mt-2">
                    <strong>987 147 762</strong>
                    <button
                      onClick={() => copyToClipboard("987147762", "Yape")}
                      className="icon-button text-terracotta hover:scale-105 transition-transform cursor-pointer"
                      title="Copiar número Yape"
                    >
                      <Copy size={13} />
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Separador editorial */}
            <div className="editorial-divider my-8">✦</div>

            {/* Agradecimiento */}
            <div>
              <h3 className="type-section-subheading text-olive mb-1">
                ¡Gracias!
              </h3>
              <p className="type-body-small italic text-muted max-w-sm mx-auto">
                Por ser parte de esta historia tan especial.
              </p>
            </div>

            {/* Único separador al final del bloque para dividirlo de la siguiente sección */}
            <div className="editorial-divider mt-10">✦</div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════
            CONFIRMACIÓN DE ASISTENCIA (LÓGICA DISEÑO 1 - SIN WHATSAPP)
            ═══════════════════════════════════════════════════ */}
        <section className="max-w-lg mx-auto px-6 py-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="type-section-title text-olive mb-2">
              Confirmación de asistencia
            </h2>
            <p className="type-lead text-charcoal max-w-md mx-auto mb-8 leading-relaxed">
              Tu presencia es muy importante para nosotros. Por favor, confírmanos tu asistencia antes del 30 de setiembre de 2026.
            </p>

            <div className="space-y-6 text-left">
              {/* 1. Selección Asistir / No Asistir */}
              <div>
                <label className="type-kicker text-muted block mb-2.5">
                  ¿Nos acompañarás en nuestro día? *
                </label>
                <div className="space-y-2 type-body text-charcoal">
                  <label className="rsvp-option flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-olive/5 transition-colors">
                    <input
                      type="radio"
                      name="asistencia"
                      value="si"
                      checked={attending === "si"}
                      onChange={() => setAttending("si")}
                      className="accent-[#595F43] w-4 h-4 cursor-pointer"
                    />
                    <span>¡Sí, con mucho gusto asistiré!</span>
                  </label>
                  <label className="rsvp-option flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-olive/5 transition-colors">
                    <input
                      type="radio"
                      name="asistencia"
                      value="no"
                      checked={attending === "no"}
                      onChange={() => setAttending("no")}
                      className="accent-[#595F43] w-4 h-4 cursor-pointer"
                    />
                    <span>Lo siento, no podré asistir</span>
                  </label>
                </div>
              </div>

              {/* 2. Si ASISTE: Cuadro grande para nombres */}
              {attending === "si" && (
                <div className="space-y-2 pt-1">
                  <label className="type-kicker text-muted block">
                    Nombre y apellidos de los asistentes *
                  </label>
                  <textarea
                    rows={4}
                    value={guestNames}
                    onChange={(e) => setGuestNames(e.target.value)}
                    placeholder="Escribe aquí los nombres y apellidos de las personas que asistirán..."
                    className="w-full bg-transparent border border-olive/35 focus:border-olive rounded-xl p-3.5 type-body text-charcoal outline-none transition-colors resize-none placeholder:italic placeholder:text-muted/60"
                  />
                </div>
              )}

              {/* 3. Botones de WhatsApp para Novia y Novio */}
              <div className="pt-2 space-y-3">
                <p className="type-kicker text-muted text-center">
                  Enviar confirmación por WhatsApp a:
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => sendWhatsApp("novia")}
                    className="btn-pill-olive type-button w-full sm:flex-1 py-3 px-4 justify-center gap-2.5 shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer"
                  >
                    <WhatsAppIcon size={19} />
                    <span>WhatsApp Novia</span>
                  </button>

                  <span className="font-serif italic text-2xl sm:text-3xl text-olive font-medium px-2 select-none">
                    o
                  </span>

                  <button
                    type="button"
                    onClick={() => sendWhatsApp("novio")}
                    className="btn-pill-olive type-button w-full sm:flex-1 py-3 px-4 justify-center gap-2.5 shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer bg-[#4F553B]"
                  >
                    <WhatsAppIcon size={19} />
                    <span>WhatsApp Novio</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════
            CIERRE Y DESPEDIDA
            ═══════════════════════════════════════════════════ */}
        <footer className="max-w-xl mx-auto px-6 pt-12 pb-6 text-center">
          <figure className="couple-farewell">
            <img
              src="./assets/fotos/42.jpg"
              alt="Yuleisi y Elder abrazados junto al mar, rodeados por las olas"
              width="1080"
              height="1620"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MonogramWreath initials={W.monogram} />

            <p className="type-lead italic text-[#555848] leading-relaxed max-w-sm mx-auto mt-4 mb-3">
              "{W.closing}"
            </p>

            <h3 className="type-section-title text-olive mb-6">
              ¡Te esperamos!
            </h3>

            <BotanicalBranch />

            <div className="type-kicker text-terracotta mt-4">
              {W.hashtag}
            </div>
            <p className="type-caption text-muted mt-1">
              © 2026 Con amor para todos nuestros seres queridos.
            </p>
          </motion.div>
        </footer>
      </div>
    </>
  );
}
