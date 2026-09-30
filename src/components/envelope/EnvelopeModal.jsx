import { useState, useEffect, useRef } from "react";
import { ArrowRight, Crown, Heart } from "lucide-react";
import { wedding as W } from "../../data";
import { WaxSeal } from "./WaxSeal";

/* ═══════════════════════════════════════════════════════
   PANTALLA DE APERTURA (SOBRE Y CARTA)
   ═══════════════════════════════════════════════════════ */
// Fases: closed → opening (se rompe el sello y se abre la solapa)
// → rising (la carta asoma del sobre) → extracting (el sobre baja mientras la
// carta sigue subiendo hasta salir entera) → presented (el sobre se desvanece y
// la carta queda al centro) → leaving (todo se desvanece hacia la web) → done.
const ENVELOPE_TIMING = { rise: 1050, extract: 1750, present: 2850, leave: 1000 };

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export function EnvelopeModal({ onEnter }) {
  const [phase, setPhase] = useState("closed");
  const timers = useRef([]);
  const cardRef = useRef(null);
  const screenRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.add("lock");
    document.body.classList.add("lock");
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const later = (fn, ms) => {
    timers.current.push(setTimeout(fn, prefersReducedMotion() ? 60 : ms));
  };

  // Todo el sobre es tocable; el sello es además un botón para teclado y lectores.
  const handleOpenEnvelope = () => {
    if (phase !== "closed") return;
    setPhase("opening");
    later(() => setPhase("rising"), ENVELOPE_TIMING.rise);
    later(() => setPhase("extracting"), ENVELOPE_TIMING.extract);
    later(() => setPhase("presented"), ENVELOPE_TIMING.present);
  };

  const handleEnterWeb = () => {
    if (phase !== "presented") return;
    // Escala para que la carta cubra toda la pantalla al salir hacia la web
    const card = cardRef.current;
    if (card && screenRef.current) {
      const fill = Math.max(
        window.innerWidth / card.offsetWidth,
        window.innerHeight / card.offsetHeight
      ) * 1.15;
      screenRef.current.style.setProperty("--fill", fill.toFixed(2));
    }
    // La música arranca dentro del clic para respetar las políticas de autoplay.
    onEnter();
    setPhase("leaving");
    later(() => {
      document.documentElement.classList.remove("lock");
      document.body.classList.remove("lock");
      setPhase("done");
    }, ENVELOPE_TIMING.leave);
  };

  if (phase === "done") return null;

  const isOpen = phase !== "closed";
  const isOut = ["rising", "extracting", "presented", "leaving"].includes(phase);
  const isExtracting = ["extracting", "presented", "leaving"].includes(phase);
  const isPresented = phase === "presented" || phase === "leaving";
  const screenClass = [
    "env-screen",
    isOpen && "is-open",
    isOut && "is-out",
    isExtracting && "is-extracting",
    isPresented && "is-presented",
    phase === "leaving" && "is-leaving",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={screenClass} ref={screenRef}>
      <div className="env-stage">
        <div className="env-wrap" onClick={handleOpenEnvelope}>
          {/* Fondo interior del sobre */}
          <div className="env-back env-piece">
            <div className="env-inner-lining" />
          </div>

          {/* CARTA DE INVITACIÓN: recortada por el borde inferior del sobre mientras sale */}
          <div className="ltr-slot">
          <article className="ltr-card" ref={cardRef} aria-hidden={!isOut}>
            <div className="ltr-inner-content">
              {/* Esquinas ornamentadas */}
              <span className="absolute top-2 left-2.5 text-olive opacity-50 text-xs">✦</span>
              <span className="absolute top-2 right-2.5 text-olive opacity-50 text-xs">✦</span>
              <span className="absolute bottom-2 left-2.5 text-olive opacity-50 text-xs">✦</span>
              <span className="absolute bottom-2 right-2.5 text-olive opacity-50 text-xs">✦</span>

              {/* Los bloques aparecen en cascada (--i) mientras la carta asoma */}
              <div className="ltr-reveal flex flex-col items-center" style={{ "--i": 0 }}>
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

              <div className="ltr-reveal max-w-[280px]" style={{ "--i": 1 }}>
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

              <div className="ltr-reveal ltr-cta pt-0.5" style={{ "--i": 2 }}>
                <button
                  onClick={handleEnterWeb}
                  tabIndex={isPresented ? 0 : -1}
                  className="btn-pill-olive type-button py-2 px-7 flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Abrir Invitación</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </article>
          </div>

          {/* Solapas frontales del sobre (bolsillo frontal) */}
          <div className="env-front env-piece">
            <span className="flap-l"><span className="flap-face" /></span>
            <span className="flap-r"><span className="flap-face" /></span>
            <span className="flap-b"><span className="flap-face" /></span>
          </div>

          {/* Solapa superior abatible (debajo del sello de cera) */}
          <div className="env-top"><div className="flap-face" /></div>

          {/* Sello de cera: se parte en dos al abrir */}
          {/* Sin onClick propio: el clic (o Enter/Espacio) sube hasta .env-wrap */}
          <button
            type="button"
            className="wax-seal-btn"
            aria-label="Abrir el sobre"
            aria-expanded={isOpen}
            disabled={isOpen}
          >
            <span className="seal-half seal-left"><WaxSeal id="seal-l" /></span>
            <span className="seal-half seal-right"><WaxSeal id="seal-r" /></span>
          </button>
        </div>

        <p className="env-hint type-body-small">Toca el sobre para abrir</p>
      </div>
    </div>
  );
}
