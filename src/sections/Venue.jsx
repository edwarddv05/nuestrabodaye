import { MapPin } from "lucide-react";
import { wedding as W } from "../data";
import { ItineraryChurchSVG, ItineraryCocktailSVG } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { TornPhoto } from "../components/Photo";

/* ═══════════════════════════════════════════════════
   CEREMONIA Y RECEPCIÓN (MISMO LUGAR)
   ═══════════════════════════════════════════════════ */
export function Venue() {
  const [ceremony, reception] = W.events;
  return (
    <>
      <section className="max-w-xl mx-auto px-6 py-10 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6">
            <div className="flex flex-col items-center flex-1 max-w-[190px]">
              <ItineraryChurchSVG />
              <h3 className="type-section-subheading text-olive mb-1">{ceremony.type}</h3>
            </div>

            <div className="type-section-subheading text-terracotta px-1 -mt-2 select-none">y</div>

            <div className="flex flex-col items-center flex-1 max-w-[190px]">
              <ItineraryCocktailSVG />
              <h3 className="type-section-subheading text-olive mb-1">{reception.type}</h3>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="type-lead text-charcoal font-medium mb-5">{ceremony.place}</p>
            <a
              href={ceremony.google}
              target="_blank"
              rel="noreferrer"
              className="btn-pill-olive type-button py-2 px-6"
            >
              <MapPin size={15} />
              <span>Ver mapa</span>
            </a>
          </div>
        </Reveal>
      </section>

      {/* h-72 con object-cover: en móvil la altura manda, así que pide algo más de ancho */}
      <TornPhoto
        name="playa"
        widths={[640, 1280]}
        sizes="(max-width: 672px) 120vw, 672px"
        width="1280"
        height="853"
        loading="lazy"
        alt="Yuleisi y Elder abrazados en la orilla del mar"
        className="w-full h-72 sm:h-88 object-cover"
      />
    </>
  );
}
