import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  server: {
    // ngrok resuelve localhost como ::1 en este equipo; escuchar en IPv6
    // permite que el túnel alcance la invitación al reiniciar Vite.
    host: "::",
    port: 4175,
    strictPort: true,
    allowedHosts: true,
  },
});
