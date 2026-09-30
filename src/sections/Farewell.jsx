import { wedding as W } from "../data";
import { BotanicalBranch, MonogramWreath } from "../components/Decor";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";

/* ═══════════════════════════════════════════════════
   CIERRE Y DESPEDIDA
   ═══════════════════════════════════════════════════ */
export function Farewell() {
  return (
    <footer className="max-w-xl mx-auto px-6 pt-12 pb-6 text-center">
      <figure className="couple-farewell">
        <Photo
          name="mar"
          widths={[540, 1080]}
          sizes="(max-width: 408px) 88vw, 360px"
          width="1080"
          height="1620"
          loading="lazy"
          alt="Yuleisi y Elder abrazados junto al mar, rodeados por las olas"
        />
      </figure>
      <Reveal>
        <MonogramWreath initials={W.monogram} />

        <p className="type-lead italic text-[#555848] leading-relaxed max-w-sm mx-auto mt-4 mb-3">
          "{W.closing}"
        </p>

        <h3 className="type-script-title text-olive mb-6">¡Te esperamos!</h3>

        <BotanicalBranch />

        <div className="type-kicker text-terracotta mt-4">{W.hashtag}</div>
        <p className="type-caption text-muted mt-1">
          © {W.date.getFullYear()} Con amor para todos nuestros seres queridos.
        </p>
      </Reveal>
    </footer>
  );
}
