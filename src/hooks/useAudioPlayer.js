import { useState, useEffect, useRef, useCallback } from "react";

export function useAudioPlayer(src) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const updateProgress = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleVolumeChange = () => setMuted(audio.muted);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handlePause);
    audio.addEventListener("volumechange", handleVolumeChange);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handlePause);
      audio.removeEventListener("volumechange", handleVolumeChange);
      audio.pause();
      audio.src = "";
    };
  }, [src]);

  const start = useCallback(() => {
    // Puede fallar por las restricciones de autoplay; el usuario puede darle a play
    audioRef.current?.play().catch(() => {});
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }, []);

  const seek = useCallback((percent) => {
    const audio = audioRef.current;
    if (!audio?.duration) return;
    audio.currentTime = (percent / 100) * audio.duration;
  }, []);

  return { playing, muted, progress, toggle, toggleMute, start, seek };
}
