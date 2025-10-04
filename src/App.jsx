import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [page, setPage] = useState(1);
  const [typedText, setTypedText] = useState("");
  const fullText = "Happy Birthday, Pihu 💖 — You light up my world!";
  const [cakeCut, setCakeCut] = useState(false);
  const [visitorMessage, setVisitorMessage] = useState(
    "Hi Pihu,\nWishing you the happiest birthday ever! 🎉💖\nYou make every moment brighter and I hope your day is full of love and smiles."
  );
  const [sentMessages, setSentMessages] = useState([]);
  const audioRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [background, setBackground] = useState("from-pink-100 via-white to-purple-100");

  // Typewriter effect
  useEffect(() => {
    if (page !== 1) return;
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [page]);

  const handleStartMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => setPlay(false));
      setPlay(true);
    }
  };

  // Hearts
  const hearts = Array.from({ length: 15 }, () => ({
    left: Math.random() * 100,
    delay: Math.random() * 5,
    size: 0.8 + Math.random(),
    rotate: Math.random() * 360,
  }));

  // Balloons
  const balloons = Array.from({ length: 10 }, () => ({
    left: 10 + Math.random() * 80,
    delay: Math.random() * 5,
    color: ["#FF6B6B", "#FFD166", "#8FD3FE", "#C6A9FF"][Math.floor(Math.random() * 4)],
    size: 30 + Math.random() * 20,
    popped: false,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSentMessages([...sentMessages, visitorMessage]);
    setVisitorMessage("");
  };

  // Fireworks & confetti
  const [fireworks, setFireworks] = useState([]);
  const triggerFireworks = () => {
    const bursts = Array.from({ length: 5 }, () => {
      const baseLeft = 20 + Math.random() * 60;
      return Array.from({ length: 20 }, (_, i) => ({
        left: baseLeft,
        angle: (i / 20) * 360,
        radius: 50 + Math.random() * 100,
        size: 4 + Math.random() * 6,
        color: ["#FF6B6B", "#FFD166", "#8FD3FE", "#C6A9FF", "#8AFFC1"][Math.floor(Math.random() * 5)],
      }));
    }).flat();
    setFireworks(bursts);
    setTimeout(() => setFireworks([]), 2000);
  };

  // Stars
  const stars = Array.from({ length: 30 }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
  }));

  // Background day-night effect
  useEffect(() => {
    if (page === 2) setBackground("from-purple-200 via-indigo-200 to-purple-400");
  }, [page]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative overflow-hidden p-4 bg-gradient-to-br ${background}`}
    >
      <audio ref={audioRef} src="music/romantic-loop.mp3" loop />

      {/* Stars */}
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: s.delay }}
        />
      ))}

      {/* Hearts with sparkle trails */}
      {hearts.map((h, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0"
          style={{ left: `${h.left}%`, scale: h.size }}
          animate={{ y: [-20, -350], rotate: [0, h.rotate], opacity: [1, 0] }}
          transition={{ delay: h.delay, duration: 6, repeat: Infinity }}
        >
          <svg width={24} height={24} viewBox="0 0 24 24" fill="#FF6B6B">
            <path d="M12 21s-7-4.35-9-6.5C-1.2 11.7 2 6.5 7 7.5 9 8 12 11 12 11s3-3 5-3.5c5-.9 8.2 4.2 4 7C19 16.65 12 21 12 21z" />
          </svg>
          {/* Sparkles */}
          <motion.div className="absolute w-1 h-1 bg-white rounded-full" animate={{ x: [-3, 3], y: [-3, 3], opacity: [1,0,1] }} transition={{ repeat: Infinity, duration: 0.5 }} />
        </motion.div>
      ))}

      {/* Balloons with sparkle trails */}
      {balloons.map((b, i) =>
        !b.popped ? (
          <motion.div
            key={i}
            className="absolute bottom-0 cursor-pointer"
            style={{ left: `${b.left}%`, width: b.size, height: b.size }}
            animate={{ y: [-50, -450], rotate: [-10, 10] }}
            transition={{ delay: b.delay, duration: 6, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => (b.popped = true) && triggerFireworks()}
          >
            <svg viewBox="0 0 24 24" fill={b.color}>
              <path d="M12 2C9.243 2 7 6 7 9c0 2.5 2.5 6.5 5 6.5S17 11.5 17 9c0-3-2.243-7-5-7zm0 16c-4 0-8 3-8 7h16c0-4-4-7-8-7z" />
            </svg>
            <motion.div className="absolute w-[2px] h-6 bg-gray-500 left-1/2 top-full"
              animate={{ y: [0, 5, 0], opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} />
          </motion.div>
        ) : null
      )}

      {/* Page 1 */}
      {page === 1 && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-12 max-w-3xl w-full text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-pink-600">Happy Birthday, Pihu 🎉</h1>
          <p className="mt-3 text-gray-700 text-base md:text-lg">{typedText}</p>
          <button onClick={() => { setPage(2); handleStartMusic(); }} className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700">Go to the Cake 🎂</button>
        </motion.div>
      )}

      {/* Page 2: Interactive Cake */}
      {page === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="flex flex-col items-center">
          {!cakeCut ? (
            <motion.div className="relative w-48 h-48 cursor-pointer flex flex-col justify-end items-center" whileHover={{ scale: 1.05 }} onClick={() => { setCakeCut(true); triggerFireworks(); }}>
              <div className="absolute bottom-0 w-48 h-24 bg-pink-400 rounded-t-xl shadow-lg" />
              <div className="absolute bottom-24 w-40 h-12 bg-pink-300 rounded-t-xl shadow-md" />
              <div className="absolute -top-4 flex gap-2">
                <motion.span animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-yellow-400 text-2xl">🕯️</motion.span>
                <motion.span animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }} className="text-yellow-400 text-2xl">🕯️</motion.span>
              </div>
              <p className="absolute bottom-2 text-white font-bold text-sm">Click to Cut 🎂</p>
            </motion.div>
          ) : (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center mt-6">
              <h2 className="text-2xl font-bold text-pink-600">🎉 Cake Cut! 🎉</h2>
              <p className="mt-2 text-gray-700">Fireworks, confetti, balloons, and love for Pihu 💖</p>
              <button onClick={() => setPage(3)} className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700">Go to Wishes 📝</button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Page 3: Wishes */}
      {page === 3 && (
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-12 max-w-3xl w-full text-center">
          <h2 className="text-2xl font-bold text-pink-600">A little story for Pihu</h2>
          <p className="mt-3 text-gray-700 text-base md:text-lg">Today I made this page for you — hearts, balloons, fireworks, cake, and messages! Hope it makes you smile 💕</p>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center gap-3">
            <textarea rows={4} value={visitorMessage} onChange={(e) => setVisitorMessage(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-pink-200" />
            <button type="submit" className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700">Send Message</button>
          </form>
          {sentMessages.map((msg, i) => (
            <motion.div key={i} className="absolute bg-pink-100 px-3 py-1 rounded-lg shadow-md text-pink-700" style={{ left: `${10 + i*10}%`, bottom: 10 + i*30 }} animate={{ y: [0, -200], opacity: [1, 0] }} transition={{ duration: 6 }} >
              {msg}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Fireworks radial burst */}
      {fireworks.map((f, i) => (
        <motion.div key={i} className="absolute w-2 h-2 rounded-full" style={{ left: `calc(${f.left}% + ${f.radius * Math.cos(f.angle * Math.PI/180)}px)`, top: `${-f.radius * Math.sin(f.angle * Math.PI/180)}px`, backgroundColor: f.color }} animate={{ opacity: [1, 0] }} transition={{ duration: 1.8, ease: "easeOut" }} />
      ))}

      {/* Music Button */}
      <button onClick={() => { if (!play) handleStartMusic(); else { audioRef.current.pause(); setPlay(false); }}} className="fixed top-4 right-4 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">{play ? "Pause Music" : "Play Music"}</button>
    </div>
  );
}
