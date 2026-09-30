import { Heart } from "lucide-react";
import { wedding as W } from "../data";
import { ItineraryIcon } from "../components/Icons";
import { Reveal } from "../components/Reveal";

function ItineraryEntry({ item }) {
  return (
    <div className="flex flex-col items-center max-w-[190px] sm:max-w-[220px] mx-auto">
      <ItineraryIcon type={item.type} />
      <span className="type-event-time text-terracotta">{item.time}</span>
      <h3 className="type-event-title text-[#2E3027] mt-0.5">{item.title}</h3>
      <p className="type-event-description text-muted mt-0.5">{item.desc}</p>
    </div>
  );
}

function TimelineDot() {
  return (
    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#595F43] text-[#FAF7F2] flex items-center justify-center shadow-xs">
      <Heart size={13} fill="currentColor" />
    </div>
  );
}

// Móvil: línea a la izquierda y cada evento a todo el ancho (se lee de corrido)
function MobileTimeline() {
  return (
    <div className="sm:hidden relative max-w-sm mx-auto text-left">
      <div className="absolute left-[13px] top-4 bottom-4 w-[2px] bg-[#595F43] opacity-65" aria-hidden="true" />
      <ol>
        {W.itinerary.map((item) => (
          <Reveal as="li" key={item.title} className="relative flex items-start gap-4 pb-7 last:pb-0">
            <div className="relative z-10 shrink-0 mt-3">
              <TimelineDot />
            </div>
            <div className="w-12 shrink-0">
              <ItineraryIcon type={item.type} />
            </div>
            <div className="pt-1 min-w-0">
              <span className="type-event-time text-terracotta block">{item.time}</span>
              <h3 className="type-event-title text-[#2E3027] mt-0.5">{item.title}</h3>
              <p className="type-event-description text-muted mt-0.5">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

// Pantallas grandes: línea central y eventos alternados
function DesktopTimeline() {
  return (
    <div className="hidden sm:block relative max-w-lg mx-auto py-2">
      <div
        className="absolute left-1/2 -translate-x-1/2 top-3 bottom-3 w-[2px] bg-[#595F43]"
        style={{ opacity: 0.65 }}
      />
      <div className="space-y-7">
        {W.itinerary.map((item, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <Reveal key={item.title} className="relative flex items-center justify-center min-h-[75px]">
              <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <TimelineDot />
              </div>
              <div className="w-full grid grid-cols-2 gap-10 items-center">
                <div className="flex flex-col items-center justify-center pr-4 text-center">
                  {isLeft && <ItineraryEntry item={item} />}
                </div>
                <div className="flex flex-col items-center justify-center pl-4 text-center">
                  {!isLeft && <ItineraryEntry item={item} />}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ITINERARIO
   ═══════════════════════════════════════════════════ */
export function Itinerary() {
  return (
    <section className="max-w-xl mx-auto px-5 sm:px-6 py-8 text-center">
      <Reveal>
        <h2 className="type-section-title text-olive mb-1">Itinerario</h2>
        <span className="type-kicker text-muted block mb-8">
          De nuestro gran día · Juntos todo es más especial
        </span>

        <MobileTimeline />
        <DesktopTimeline />

        <div className="editorial-divider mt-10">✦</div>
      </Reveal>
    </section>
  );
}
