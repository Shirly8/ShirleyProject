import { useState } from "react";
import { motion } from "framer-motion";
import { Music, Globe, Heart } from "lucide-react";
import "./FF.css";

interface Fact {
  id: number;
  icon: JSX.Element;
  text: string;
  isLie: boolean;
  flipText?: string;
  
}

const facts: Fact[] = [
  {
    id: 1,
    icon: <Music size={40} />,
    text: "I really like to songwrite, singing, and produce my own music.",
    isLie: true,
    flipText: "I have my own studio and record my own music.",

  },
  {
    id: 2,
    icon: <Globe size={40} />,
    text: "I've been on exchange in UK (University of Lancaster) for 1 semester.",
    isLie: false,
    flipText: "I was supposed to go on exchange in UK but I accepted this internship instead.",
  },
  {
    id: 3,
    icon: <Heart size={40} />,
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
