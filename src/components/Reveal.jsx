import { motion } from "motion/react";

// Aparición suave al entrar en pantalla (una sola vez). Empieza un poco antes
// de que el bloque asome para que al bajar rápido no se vean huecos en blanco.
export function Reveal({ as = "div", children, className }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px 120px 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </Tag>
  );
}
