"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

/* --- same ContactCard / data / sizes --- */
const ContactCard = ({ title = "Are you our next hire?" }) => (
  <div className="w-full h-full overflow-hidden bg-white border-2 border-purple-200 flex items-center justify-center">
    <div className="p-6 text-center">
      <h3 className="text-2xl font-bold text-purple-900 mb-4">{title}</h3>
      <button className="px-6 py-3 bg-purple-700 text-white rounded-lg font-medium hover:bg-purple-800 transition-colors flex items-center gap-2">
        Get In Touch <span aria-hidden>→</span>
      </button>
    </div>
  </div>
);

// const cards = [
//   { id: 1, img: "/img1.png", name: "Name", designation: "Designation" },
//   { id: 2, img: "/img2.png", name: "Name", designation: "Designation" },
//   { id: 3, img: "/img3.png", name: "Name", designation: "Designation" },
//   { id: 4, img: "/img1.png", name: "Name", designation: "Designation" },
//   { id: 5, img: "/img2.png", name: "Name", designation: "Designation" },
//   { id: 6, img: "/img3.png", name: "Name", designation: "Designation" },
//   { id: 7, img: "/img2.png", isFinal: true },
// ];

const cards = [
  { id: 1, img: "/TechImg1.png", name: "Name", designation: "Designation" },
  { id: 2, img: "/TechImg2.png", name: "Name", designation: "Designation" },
  { id: 3, img: "/TechImg3.png", name: "Name", designation: "Designation" },
  { id: 4, img: "/TechImg4.png", name: "Name", designation: "Designation" },
  { id: 5, img: "/TechImg5.png", name: "Name", designation: "Designation" },
  { id: 6, img: "/TechImg6.png", name: "Name", designation: "Designation" },
  { id: 7, img: "/TechImg7.png", name: "Name", designation: "Designation" },
  { id: 8, isFinal: true },
];

const sizes = [
  (isFinal) => `w-[254px] h-[333px] ${isFinal ? "p-0" : "p-[25px]"}`,
  (isFinal) => `w-[174px] h-[333px] ${isFinal ? "p-0" : "p-[25px]"}`,
  (isFinal) => `w-[123px] h-[333px] ${isFinal ? "p-0" : "p-[25px]"}`,
];

export default function TechThatPowers() {
  const [threshold, setThreshold] = useState(0.8);

  const { ref, inView } = useInView({
    threshold,
    triggerOnce: false,
    onChange: (inView) => {
      if (inView) {
        setThreshold(0.5);
      } else {
        setThreshold(0.8);
      }
    },
  });
  const [paused, setPaused] = useState(false);
  const [exitingCard, setExitingCard] = useState(null);

  const [startIndex, setStartIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  // no of cards displaying with width thier corrsponding width sizes
  const [visibleCards, setVisibleCards] = useState(
    cards.slice(0, 4).map((c, idx) => ({
      ...c,
      widthClass: sizes[Math.min(idx, 2)](c.isFinal),
    }))
  );

  // animation / track control
  const [slideX, setSlideX] = useState(0);
  const [finalPhase, setFinalPhase] = useState("normal");
  const [animating, setAnimating] = useState(false);

  const trackRef = (useRef < HTMLDivElement) | (null > null);
  const animRef = useRef(false);

  const GAP_PX = 16; //  16px;
  const ANIMATION_DURATION = 1.2;
  const DURATION = ANIMATION_DURATION * 1000;

  // core logic advancing carousel
  const handleNext = () => {
    if (animRef.current) return; //stop if already animating
    if (startIndex >= cards.length - 3) return; //stop if startIndex is 3less equal to totalcards

    const firstEl = trackRef.current?.querySelector(".visible-card"); //grabs only first visible-card class
    const firstWidth = firstEl?.offsetWidth ?? 254; // fallback to your largest width
    const shift = firstWidth + GAP_PX;

    const firstCard = visibleCards[0];
    setExitingCard(firstCard.id);

    // start translate animation
    animRef.current = true;
    setAnimating(true);
    setSlideX(-shift);

    // after translate completes: swap visible cards and reset transform instantly
    setTimeout(() => {
      const newStart = startIndex + 1;

      // if we reached final CPT stage use special width layout
      if (newStart === cards.length - 3) {
        setVisibleCards([
          { ...cards[cards.length - 3], widthClass: sizes[2](false) },
          { ...cards[cards.length - 2], widthClass: sizes[1](false) },
          { ...cards[cards.length - 1], widthClass: sizes[0](true) },
        ]);
      } else {
        setVisibleCards(
          cards.slice(newStart, newStart + 4).map((c, idx) => ({
            ...c,
            widthClass: sizes[Math.min(idx, 2)](c.isFinal),
          }))
        );
      }

      setStartIndex(newStart);
      setExitingCard(null);
      // reset transform without animation (instant)
      setSlideX(0);
      setAnimating(false);
      animRef.current = false;
    }, DURATION);
  };

  // auto-advance interval
  useEffect(() => {
    if (!inView) {
      setHovered(false);
      return;
    }
    if (!hovered || animRef.current || paused) {
      return;
    }
    const interval = setInterval(() => {
      if (!animRef.current && startIndex < cards.length - 3) {
        handleNext();
      }
    }, DURATION);
    return () => clearInterval(interval);
  }, [startIndex, hovered, inView, paused]);

  const isFinalStage = visibleCards.slice(0, 3).some((c) => c.isFinal); //as visiblecards is state of currentIndexes

  const slideHandling = 1200; //only for three last cards
  // Phase handling
  useEffect(() => {
    if (isFinalStage && finalPhase === "normal") {
      const t = setTimeout(() => {
        setFinalPhase("secondBig");
      }, slideHandling);
      return () => clearTimeout(t);
    }
  }, [isFinalStage, finalPhase]);

  useEffect(() => {
    if (finalPhase === "secondBig") {
      const t = setTimeout(() => {
        setFinalPhase("thirdBig");
      }, slideHandling);
      return () => clearTimeout(t);
    }
  }, [finalPhase]);
  // Reset after final phase completes
  useEffect(() => {
    if (finalPhase === "thirdBig") {
      const t = setTimeout(() => {
        // reset everything instantly
        // setHovered(false);
        setStartIndex(0);
        setVisibleCards(
          cards.slice(0, 4).map((c, idx) => ({
            ...c,
            widthClass: sizes[Math.min(idx, 2)](c.isFinal),
          }))
        );
        setFinalPhase("normal");
        setSlideX(0);
        setAnimating(false);
        animRef.current = false;
      }, slideHandling);
      return () => clearTimeout(t);
    }
  }, [finalPhase]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setPaused(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        setHovered(true);
        handleNext();
      }}
      className="relative w-[600px] overflow-hidden flex"
    >
      <motion.div
        ref={trackRef}
        className="flex gap-4 items-end"
        animate={{ x: slideX }}
        transition={{
          duration: animating ? ANIMATION_DURATION : 0,
          ease: "easeInOut",
        }}
      >
        {visibleCards.map((card, pos) => {
          // slot widths (in px)
          const SLOT_WIDTHS_NORMAL = [254, 174, 123, 0]; // slot4 = hidden (0)
          const SLOT_WIDTHS_SECONDFINAL = [123, 254, 174];
          const SLOT_WIDTHS_FINAL = [123, 174, 254];
          let SLOT_WIDTHS;
          if (!isFinalStage) SLOT_WIDTHS = SLOT_WIDTHS_NORMAL;
          else if (finalPhase === "secondBig")
            SLOT_WIDTHS = SLOT_WIDTHS_SECONDFINAL;
          else if (finalPhase === "thirdBig") SLOT_WIDTHS = SLOT_WIDTHS_FINAL;
          else SLOT_WIDTHS = SLOT_WIDTHS_NORMAL;

          let targetWidth = SLOT_WIDTHS[pos] ?? 80;

          // While animating: shift widths left
          if (animating) {
            if (pos === 1) targetWidth = SLOT_WIDTHS[0];
            if (pos === 2) targetWidth = SLOT_WIDTHS[1];
            if (pos === 3) targetWidth = SLOT_WIDTHS[2];
            if (pos === 4) targetWidth = SLOT_WIDTHS[3];
          }

          return (
            <motion.div
              key={card.id ?? `final-${pos}`}
              style={{ right: "-10px" }}
              className="visible-card flex flex-col justify-end items-start flex-shrink-0 rounded-2xl relative overflow-hidden"
              initial={false}
              animate={{
                width: targetWidth,
                height: 333,
                padding: card.isFinal ? 0 : 25,
                // opacity: exitingCard === card.id ? 0 : 1,
              }}
              transition={{
                duration: animating ? ANIMATION_DURATION : 0.4,
                ease: "easeInOut",
              }}
            >
              {card.isFinal ? (
                <ContactCard />
              ) : (
                <>
                  <img
                    src={card.img}
                    alt={card.name}
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                  />
                  {/* <div className="relative z-10 text-white p-4">
                    <p className="font-bold">{card.name}</p>
                    <p className="text-sm opacity-80">{card.designation}</p>
                  </div> */}
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                      opacity: pos === 0 || pos === 1 ? 1 : 0,
                      y: pos === 0 || pos === 1 ? 0 : 20,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative z-10 flex justify-between w-full text-white"
                  >
                    <div className="flex flex-col">
                      <p className="font-bold">{card.name}</p>
                      <p className="text-sm opacity-80">{card.designation}</p>
                    </div>
                    <img
                      src="/linkedin.png"
                      alt="LinkedIn"
                      width={28}
                      height={28}
                      className="h-7 w-7 my-2"
                    />
                  </motion.div>
                </>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
