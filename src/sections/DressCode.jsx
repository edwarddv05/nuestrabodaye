import { wedding as W } from "../data";
import { DressManSVG, DressWomanSVG } from "../components/Icons";
import { Reveal } from "../components/Reveal";

/* ═══════════════════════════════════════════════════
   DRESSCODE Y SOLO ADULTOS
   ═══════════════════════════════════════════════════ */
export function DressCode() {
  const { dress } = W;
  return (
    <section className="max-w-xl mx-auto px-6 py-6 text-center">
      <Reveal>
        <h2 className="type-section-title text-olive mb-1">{dress.title}</h2>
        <span className="type-meta text-charcoal block mb-6">{dress.type}</span>

        <div className="flex items-center justify-center gap-12 sm:gap-16 my-7">
          <div className="flex flex-col items-center">
            <DressWomanSVG />
            <span className="type-body text-olive font-medium mt-2.5">Damas</span>
            <span className="type-body-small text-charcoal mt-0.5">{dress.women}</span>
          </div>
          <div className="h-16 w-[1px] bg-olive/20" />
          <div className="flex flex-col items-center">
            <DressManSVG />
            <span className="type-body text-olive font-medium mt-2.5">Caballeros</span>
            <span className="type-body-small text-charcoal mt-0.5">{dress.men}</span>
          </div>
        </div>

        <p className="type-body-small italic text-[#555848] max-w-lg mx-auto mt-6 leading-relaxed">
          {dress.note}
        </p>

        <div className="mt-8 pt-4">
          <span className="type-section-subheading text-olive block">{dress.adultsTitle}</span>
          {dress.adults && (
            <p className="type-body-small italic text-charcoal max-w-md mx-auto leading-relaxed mt-2">
              "{dress.adults}"
            </p>
          )}
        </div>

        <div className="editorial-divider">✦</div>
      </Reveal>
    </section>
  );
}
