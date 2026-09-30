import { Fragment } from "react";
import { wedding as W } from "../data";
import { useCountdown } from "../hooks/useCountdown";
import { Reveal } from "../components/Reveal";

const dateText = (options) => W.date.toLocaleDateString("es-PE", options).toUpperCase();
const pad = (n) => String(n).padStart(2, "0");

/* ═══════════════════════════════════════════════════
   FECHA Y CUENTA REGRESIVA
   ═══════════════════════════════════════════════════ */
export function DateCountdown() {
  const countdown = useCountdown(W.date);
  const units = [
    [countdown.d, "DÍAS"],
    [countdown.h, "HORAS"],
    [countdown.m, "MINUTOS"],
    [countdown.s, "SEGUNDOS"],
  ];

  return (
    <section className="max-w-xl mx-auto px-6 py-6 text-center">
      <Reveal>
        <h3 className="type-section-heading text-olive">Tenemos el agrado de invitarlos</h3>
        <h4 className="type-section-subheading text-olive mb-6">a Nuestra Boda</h4>

        <div className="inline-flex flex-col items-center justify-center border-y border-olive/25 py-4 px-6 sm:px-10 my-2">
          <div className="flex items-center justify-center gap-5 sm:gap-10 text-olive">
            <span className="type-kicker text-muted">{dateText({ weekday: "long" })}</span>
            <span className="type-date-day text-charcoal">{W.date.getDate()}</span>
            <span className="type-kicker text-muted">
              {dateText({ month: "long" })} {W.date.getFullYear()}
            </span>
          </div>
          <p className="type-body text-charcoal font-medium mt-3">
            Hora: <strong className="text-olive font-bold text-xl sm:text-2xl ml-1">{W.displayTime}</strong>
          </p>
        </div>

        <div className="mt-9">
          <p className="type-kicker text-muted mb-3">Faltan</p>
          <div className="flex items-center justify-center gap-2 sm:gap-5 text-olive font-serif">
            {units.map(([value, label], i) => (
              <Fragment key={label}>
                {i > 0 && (
                  <span className="self-start text-2xl leading-none text-olive/60" aria-hidden="true">:</span>
                )}
                <div className="flex flex-col items-center min-w-[3rem]">
                  <span className="type-countdown-small text-charcoal">{pad(value)}</span>
                  <span className="type-meta text-muted mt-1">{label}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="editorial-divider my-8">✦</div>
      </Reveal>
    </section>
  );
}
