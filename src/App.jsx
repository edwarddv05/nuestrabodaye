import { useState } from "react";
import { wedding as W } from "./data";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { EnvelopeModal } from "./components/envelope/EnvelopeModal";
import { FloatingAudioButton } from "./components/MusicPlayer";
import { Toast, useToast } from "./components/Toast";
import { Hero } from "./sections/Hero";
import { Parents } from "./sections/Parents";
import { DateCountdown } from "./sections/DateCountdown";
import { Venue } from "./sections/Venue";
import { DressCode } from "./sections/DressCode";
import { Itinerary } from "./sections/Itinerary";
import { Memories } from "./sections/Memories";
import { Gifts } from "./sections/Gifts";
import { Rsvp } from "./sections/Rsvp";
import { Farewell } from "./sections/Farewell";

export default function App() {
  const music = useAudioPlayer(W.song.src);
  const { message, showToast } = useToast();
  // La portada anima su entrada cuando se sale del sobre (antes está tapada)
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    music.start();
    setEntered(true);
  };

  return (
    <>
      <EnvelopeModal onEnter={handleEnter} />
      <FloatingAudioButton audio={music} />
      <Toast message={message} />

      <div className="min-h-screen bg-[#FAF7F2] text-[#2E3027] pb-24">
        <Hero audio={music} entered={entered} />
        <Parents />
        <DateCountdown />
        <Venue />
        <DressCode />
        <Itinerary />
        <Memories />
        <Gifts showToast={showToast} />
        <Rsvp showToast={showToast} />
        <Farewell />
      </div>
    </>
  );
}
