import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { wedding as W } from "../data";

/* ═══════════════════════════════════════════════════
   REPRODUCTOR COMPACTO (PORTADA)
   ═══════════════════════════════════════════════════ */
export function MusicPill({ audio }) {
  return (
    <div className="music-pill">
      <button
        onClick={audio.toggle}
        className="music-pill-play"
        aria-label={audio.playing ? "Pausar nuestra canción" : "Reproducir nuestra canción"}
      >
        {audio.playing ? (
          <Pause size={17} fill="currentColor" />
        ) : (
          <Play size={17} fill="currentColor" className="ml-0.5" />
        )}
      </button>
      <div className="music-pill-info">
        <span className="music-pill-title type-body-small italic text-muted">
          ♫ {W.song.title} · {W.song.artist}
        </span>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={audio.progress}
          onChange={(event) => audio.seek(Number(event.target.value))}
          aria-label="Progreso de nuestra canción"
          className="song-progress"
          style={{ "--song-progress": `${audio.progress}%` }}
        />
      </div>
    </div>
  );
}

// Botón flotante para silenciar / activar la música
export function FloatingAudioButton({ audio }) {
  return (
    <button
      onClick={audio.toggleMute}
      className="floating-audio cursor-pointer"
      aria-label="Silenciar o activar música"
      title={audio.muted ? "Activar sonido" : "Silenciar música"}
    >
      {audio.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
}
