import { wedding as W } from "../data";
import { MemorialDoveSVG } from "../components/Decor";
import { Reveal } from "../components/Reveal";

function ParentName({ name, deceased, note }) {
  return (
    <p className="type-body text-charcoal leading-snug flex items-center justify-center">
      <span>
        {name}
        {note && <> <em>({note})</em></>}
      </span>
      {deceased && <MemorialDoveSVG />}
    </p>
  );
}

/* ═══════════════════════════════════════════════════
   FRASE Y PADRES
   ═══════════════════════════════════════════════════ */
export function Parents() {
  const { bride, groom } = W.parents;
  return (
    <section className="max-w-xl mx-auto px-6 py-10 text-center">
      <Reveal>
        <p className="type-lead italic text-[#555848] leading-relaxed max-w-md mx-auto mb-8">
          "{W.quote}"
        </p>

        <span className="type-kicker text-terracotta block mb-2">Con la bendición de Dios</span>
        <h2 className="type-section-heading text-olive mb-10">y nuestros queridos padres</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-6">
          <div>
            <h3 className="type-kicker text-muted mb-2">Padres de la Novia</h3>
            <ParentName name={bride.father} deceased={bride.fatherDeceased} />
            <ParentName name={bride.mother} deceased={bride.motherDeceased} />
          </div>

          <div>
            <h3 className="type-kicker text-muted mb-2">Padres del Novio</h3>
            {groom.aunt && <ParentName name={groom.aunt} note="Tía" />}
            <ParentName name={groom.father} deceased={groom.fatherDeceased} />
            <ParentName name={groom.mother} deceased={groom.motherDeceased} />
          </div>
        </div>

        <div className="editorial-divider">✦</div>
      </Reveal>
    </section>
  );
}
