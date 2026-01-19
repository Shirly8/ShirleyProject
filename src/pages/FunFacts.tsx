import { useState } from "react";
import { motion } from "framer-motion";
import "./FF.css";

interface Fact {
  id: number;
  icon: JSX.Element;
  text: string;
  isLie: boolean;
  flipText?: string;
}

const MusicIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18V5l12-2v13M9 9h12M6 18h.01" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const HeartIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const facts: Fact[] = [
  {
    id: 1,
    icon: <MusicIcon />,
    text: "I write songs, sing, and produce my own music.",
    isLie: true,
    flipText: "I have my own studio and record my own music.",
  },
  {
    id: 2,
    icon: <GlobeIcon />,
    text: "I spent a semester on exchange at the University of Lancaster in the UK.",
    isLie: false,
    flipText: "I was supposed to go on exchange in UK but I accepted this internship instead.",
  },
  {
    id: 3,
    icon: <HeartIcon />,
    text: "I own a dog named Machiatto",
    isLie: false,
    flipText: "I don't own a pet, but I used to raise a turtle named Turtle.",
  },
];

export default function TwoTruthsALie() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [shaking, setShaking] = useState<Record<number, boolean>>({});

  const handleSelect = (id: number, isLie: boolean) => {
    if (flipped[id]) return; // Prevent re-flipping

    // All cards flip now
    setFlipped((prev) => ({ ...prev, [id]: true }));
    
    // If it's not a lie, also add a shake effect before flipping
    if (!isLie) {
      setShaking((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => setShaking((prev) => ({ ...prev, [id]: false })), 300);
    }
  };

  return (
    <div className="container">
      <h2>Fun Facts - Two Truths and A Lie</h2>
      <div className="facts-boxes">
        {facts.map(({ id, icon, text, isLie, flipText }) => (
          <motion.div
            key={id}
            className={`fact-box ${shaking[id] ? "shake" : ""} ${flipped[id] ? "flip" : ""}`}
            onClick={() => handleSelect(id, isLie)}
          >
            {!flipped[id] ? (
              <>
                {icon}
                <p className="box-text">{text}</p>
              </>
            ) : (
              <p className="lie-reveal">{flipText}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
