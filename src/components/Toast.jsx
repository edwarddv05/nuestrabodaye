import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

export function useToast() {
  const [message, setMessage] = useState("");
  const timer = useRef(null);

  const showToast = useCallback((msg) => {
    clearTimeout(timer.current);
    setMessage(msg);
    timer.current = setTimeout(() => setMessage(""), 3000);
  }, []);

  return { message, showToast };
}

// Aviso flotante en la parte inferior
export function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#2E3027] text-[#FAF7F2] type-body-small px-5 py-2 rounded-full shadow-lg border border-olive/30 flex items-center gap-2"
        >
          <Check size={15} className="text-terracotta" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
