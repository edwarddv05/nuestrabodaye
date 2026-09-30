import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { wedding as W } from "../data";
import { GiftsHouseSVG, GiftsPhoneSVG } from "../components/Icons";
import { Reveal } from "../components/Reveal";

async function writeClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Respaldo para navegadores sin API de portapapeles
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

// Número + botón "Copiar" que pasa a "Copiado" unos segundos
function CopyRow({ label, value, copiedId, onCopy }) {
  const id = `${label}-${value}`;
  const copied = copiedId === id;
  return (
    <div className="mt-3">
      <p className="type-account text-charcoal">
        {label && <span className="text-muted">{label}: </span>}
        <strong>{value}</strong>
      </p>
      <button
        onClick={() => onCopy(id, value.replace(/\s/g, ""))}
        className={`copy-pill ${copied ? "is-copied" : ""}`}
        aria-label={`Copiar ${label || "número"} ${value}`}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        <span>{copied ? "Copiado" : "Copiar"}</span>
      </button>
    </div>
  );
}

// Cuenta bancaria (con CCI) o número de billetera (Yape: sin CCI)
function Account({ account, copiedId, onCopy }) {
  return (
    <div>
      <h4 className="type-card-title text-olive mb-0.5">{account.bank}</h4>
      <p className="type-body-small text-charcoal">{account.holder}</p>
      {account.cci ? (
        <>
          <CopyRow label="Cuenta" value={account.account} copiedId={copiedId} onCopy={onCopy} />
          <CopyRow label="CCI" value={account.cci} copiedId={copiedId} onCopy={onCopy} />
        </>
      ) : (
        <CopyRow value={account.account} copiedId={copiedId} onCopy={onCopy} />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SUGERENCIA DE REGALO
   ═══════════════════════════════════════════════════ */
export function Gifts({ showToast }) {
  const { gifts } = W;
  const [copiedId, setCopiedId] = useState("");
  const resetTimer = useRef(null);

  const copy = async (id, text) => {
    try {
      await writeClipboard(text);
      setCopiedId(id);
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopiedId(""), 2500);
    } catch {
      // Sin portapapeles: al menos se muestra el número para copiarlo a mano
      showToast(`Cuenta: ${text}`);
    }
  };

  return (
    <section className="max-w-xl mx-auto px-6 py-8 text-center">
      <Reveal>
        <span className="type-kicker text-terracotta block mb-2">Un Detalle Especial</span>
        <h2 className="type-section-title text-olive mb-3">{gifts.title}</h2>

        <p className="type-lead italic text-[#555848] max-w-md mx-auto leading-relaxed mb-8">
          {gifts.intro}
        </p>

        <div className="my-6">
          <GiftsHouseSVG />
          <p className="type-gift-note italic text-[#555848] max-w-md mx-auto mb-3 leading-relaxed">
            {gifts.homeNote}
          </p>
          <p className="type-body text-charcoal font-medium leading-snug">{gifts.home.line1}</p>
          <p className="type-body-small text-muted mt-0.5">{gifts.home.line2}</p>
        </div>

        <div className="my-8">
          <GiftsPhoneSVG />
          <p className="type-gift-note italic text-[#555848] max-w-md mx-auto mb-6 leading-relaxed">
            {gifts.accountNote}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-2">
            {gifts.accounts.map((account) => (
              <Account key={account.bank} account={account} copiedId={copiedId} onCopy={copy} />
            ))}
          </div>
        </div>

        <div className="editorial-divider my-8">✦</div>

        <div>
          <h3 className="type-section-subheading text-olive mb-1">¡Gracias!</h3>
          <p className="type-body-small italic text-muted max-w-sm mx-auto">
            Por ser parte de esta historia tan especial.
          </p>
        </div>

        <div className="editorial-divider mt-10">✦</div>
      </Reveal>
    </section>
  );
}
