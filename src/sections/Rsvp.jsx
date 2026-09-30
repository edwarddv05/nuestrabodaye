import { useState } from "react";
import { Check } from "lucide-react";
import { wedding as W } from "../data";
import { WhatsAppIcon } from "../components/Icons";
import { Reveal } from "../components/Reveal";

// "24 de Octubre" a partir de la fecha de la boda
const month = W.date.toLocaleDateString("es-PE", { month: "long" });
const weddingDay = `${W.date.getDate()} de ${month[0].toUpperCase()}${month.slice(1)}`;

function buildMessage(personName, attending, names) {
  if (attending === "si") {
    return `¡Hola ${personName}! Confirmo nuestra asistencia a su boda ✨💍\n\n👥 *Nombres y apellidos de los asistentes:*\n${names}\n\n¡Nos vemos el ${weddingDay} para celebrar juntos! 🎉`;
  }
  return `¡Hola ${personName}! Lamentablemente no podré asistir a su boda, pero les deseo de todo corazón lo mejor y muchas bendiciones en esta hermosa etapa juntos ✨❤️`;
}

/* ═══════════════════════════════════════════════════
   CONFIRMACIÓN DE ASISTENCIA POR WHATSAPP
   ═══════════════════════════════════════════════════ */
export function Rsvp({ showToast }) {
  const [attending, setAttending] = useState("si");
  const [guestNames, setGuestNames] = useState("");

  const sendWhatsApp = (contact) => {
    const names = guestNames.trim();
    if (attending === "si" && !names) {
      showToast("Por favor ingresa los nombres y apellidos de los asistentes.");
      return;
    }
    const message = buildMessage(contact.name, attending, names);
    window.open(`https://wa.me/${contact.phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="max-w-lg mx-auto px-6 py-6 text-center">
      <Reveal>
        <h2 className="type-section-title text-olive mb-2">Confirmación de asistencia</h2>
        <p className="type-lead text-charcoal max-w-md mx-auto mb-8 leading-relaxed">
          Tu presencia es muy importante para nosotros. Por favor, confírmanos tu asistencia antes del {W.rsvpDeadline}.
        </p>

        <div className="space-y-6 text-left">
          <fieldset>
            <legend className="type-kicker text-muted block mb-3">¿Nos acompañarás en nuestro día? *</legend>
            <div className="space-y-2.5 type-body text-charcoal">
              {[
                ["si", "¡Sí, con mucho gusto asistiré!"],
                ["no", "Lo siento, no podré asistir"],
              ].map(([value, label]) => {
                const selected = attending === value;
                return (
                  <label key={value} className={`rsvp-card ${selected ? "is-selected" : ""}`}>
                    <input
                      type="radio"
                      name="asistencia"
                      value={value}
                      checked={selected}
                      onChange={() => setAttending(value)}
                      className="sr-only"
                    />
                    <span className="rsvp-card-mark" aria-hidden="true">
                      {selected && <Check size={13} strokeWidth={3} />}
                    </span>
                    <span>{label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {attending === "si" && (
            <div className="space-y-2 pt-1">
              <label htmlFor="rsvp-names" className="type-kicker text-muted block">
                Nombre y apellidos de los asistentes *
              </label>
              <textarea
                id="rsvp-names"
                rows={4}
                value={guestNames}
                onChange={(e) => setGuestNames(e.target.value)}
                placeholder="Escribe aquí los nombres y apellidos de las personas que asistirán..."
                className="w-full bg-transparent border border-olive/35 focus:border-olive rounded-xl p-3.5 type-body text-charcoal outline-none transition-colors resize-none placeholder:italic placeholder:text-muted/60"
              />
            </div>
          )}

          <div className="pt-2 space-y-3">
            <p className="type-kicker text-muted text-center">Enviar confirmación por WhatsApp a:</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => sendWhatsApp(W.contact.bride)}
                className="btn-pill-olive type-button w-full sm:flex-1 py-3 px-4 justify-center gap-2.5 shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer"
              >
                <WhatsAppIcon size={19} />
                <span>WhatsApp Novia</span>
              </button>

              <button
                type="button"
                onClick={() => sendWhatsApp(W.contact.groom)}
                className="btn-pill-olive type-button w-full sm:flex-1 py-3 px-4 justify-center gap-2.5 shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer bg-[#4F553B]"
              >
                <WhatsAppIcon size={19} />
                <span>WhatsApp Novio</span>
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
