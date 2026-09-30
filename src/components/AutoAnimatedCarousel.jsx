"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TechCards = [
  {
    id: 1,
    img: "/TechImg1.png",
    name: "Name",
    designation: "Designation",
    isFinal: false,
  },
  {
    id: 2,
    img: "/TechImg2.png",
    name: "Name",
    designation: "Designation",
    isFinal: false,
  },
  {
    id: 3,
    img: "/TechImg3.png",
    name: "Name",
    designation: "Designation",
    isFinal: false,
  },
  {
    id: 4,
    img: "/TechImg4.png",
    name: "Name",
    designation: "Designation",
    isFinal: false,
  },
  {
    id: 5,
    img: "/TechImg5.png",
    name: "Name",
    designation: "Designation",
    isFinal: false,
  },
  {
    id: 6,
    img: "/TechImg6.png",
    name: "Name",
    designation: "Designation",
    isFinal: false,
  },
  {
    id: 7,
    img: "/TechImg7.png",
    name: "Name",
    designation: "Designation",
    isFinal: false,
  },
  { id: 8, isFinal: true },
];
const TechSizes = [
  (isFinal) => `w-[254px] h-[333px] ${isFinal ? "p-0" : "p-[25px]"}`,
  (isFinal) => `w-[174px] h-[333px] ${isFinal ? "p-0" : "p-[25px]"}`,
  (isFinal) => `w-[123px] h-[333px] ${isFinal ? "p-0" : "p-[25px]"}`,
];

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

// ----- Component -----
export default function TechAnimatedCarousel({ inView, ref }) {
  const GAP_PX = 16;
  const ANIMATION_DURATION = 0.8; // seconds
  const DURATION = ANIMATION_DURATION * 1000;

  const [startIndex, setStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(
    TechCards.slice(0, 4).map((c, idx) => ({
      ...c,
      widthClass: TechSizes[Math.min(idx, 2)](c.isFinal),
    }))
  );

  const [finalPhase, setFinalPhase] = useState("normal");
  const [animating, setAnimating] = useState(false);
  const animRef = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [paused, setPaused] = useState(false);

  // Determine base slot widths for the *current visible slice* (based on finalPhase)
  const getBaseSlotWidthsFor = (cardsSlice) => {
    // You used three patterns earlier — keep same numbers
    const SLOT_WIDTHS_NORMAL = [254, 174, 123, 0];
    const SLOT_WIDTHS_SECONDFINAL = [123, 254, 174, 0];
    const SLOT_WIDTHS_FINAL = [123, 174, 254, 0];

    const sliceHasFinal = cardsSlice.slice(0, 3).some((c) => c.isFinal);
    if (!sliceHasFinal) return SLOT_WIDTHS_NORMAL;
    if (finalPhase === "secondBig") return SLOT_WIDTHS_SECONDFINAL;
    if (finalPhase === "thirdBig") return SLOT_WIDTHS_FINAL;
    return SLOT_WIDTHS_NORMAL;
  };

  // compute positions (left offsets) from widths + gap
  const computePositions = (widths, gap = GAP_PX) => {
    const pos = [];
    let cur = 0;
    for (let i = 0; i < widths.length; i++) {
      pos.push(cur);
      cur += (widths[i] ?? 0) + gap;
    }
    return pos;
  };

  // active widths & positions that cards animate TO
  const [activeSlotWidths, setActiveSlotWidths] = useState(
    getBaseSlotWidthsFor(visibleCards)
  );
  const [positions, setPositions] = useState(
    computePositions(getBaseSlotWidthsFor(visibleCards))
  );
  console.log(positions[0], positions[1], positions[2], positions[3]);
  // keep isFinalStage (used elsewhere if you want)
  const isFinalStage = visibleCards.slice(0, 3).some((c) => c.isFinal);

  // Recompute base widths/positions whenever visibleCards or finalPhase changes and we're not animating.
  useEffect(() => {
    if (animRef.current) return; // avoid stomping while animating
    const baseWidths = getBaseSlotWidthsFor(visibleCards);
    setActiveSlotWidths(baseWidths);
    setPositions(computePositions(baseWidths));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCards, finalPhase]);

  // handleNext: animate positions & widths, then swap slice
  const handleNext = () => {
    if (animRef.current) return;
    if (startIndex >= TechCards.length - 3) return;

    const baseWidths = getBaseSlotWidthsFor(visibleCards);
    const shift = baseWidths[0] + GAP_PX;

    // during widths (keep a small buffer for exiting slot)
    const duringWidths = [16, baseWidths[0], baseWidths[1], baseWidths[2]];

    // compute base positions (positions for the current base widths)
    const basePositions = computePositions(baseWidths);

    // Model B: target positions (card i moves into previous slot's left offset)
    const targetPositions = visibleCards.map((_, i) =>
      i === 0 ? basePositions[0] - shift : basePositions[i - 1]
    );

    // Start coordinated animation
    animRef.current = true;
    setAnimating(true);

    // 1) tell cards what widths to animate to
    setActiveSlotWidths(duringWidths);

    // 2) ensure positions state is exactly the current left offsets at animation start
    const startPositions = computePositions(activeSlotWidths);
    setPositions(startPositions);

    // 3) in next frame animate positions to targetPositions
    requestAnimationFrame(() => {
      setPositions(targetPositions);
    });

    // prepare nextCards as you already do...
    const newStart = startIndex + 1;
    const nextCards =
      newStart === TechCards.length - 3
        ? [
            {
              ...TechCards[TechCards.length - 3],
              widthClass: TechSizes[2](false),
            },
            {
              ...TechCards[TechCards.length - 2],
              widthClass: TechSizes[1](false),
            },
            {
              ...TechCards[TechCards.length - 1],
              widthClass: TechSizes[0](true),
            },
          ]
        : TechCards.slice(newStart, newStart + 4).map((c, idx) => ({
            ...c,
            widthClass: TechSizes[Math.min(idx, 2)](c.isFinal),
          }));

    // After anim duration: swap the visibleCards and reset base widths/positions for new slice
    setTimeout(() => {
      // swap data (existing DOM nodes for continuing cards keep their identity via keys)
      setVisibleCards(nextCards);
      setStartIndex(newStart);

      // compute new base widths/positions for the new slice
      const newBaseWidths = getBaseSlotWidthsFor(nextCards);
      const newBasePositions = computePositions(newBaseWidths);
      setActiveSlotWidths(newBaseWidths);
      setPositions(newBasePositions);
      // stop animating — set animating false first so subsequent setPositions doesn't animate
      setAnimating(false);
      animRef.current = false;

      // set widths/positions to new base (instant)
    }, DURATION);
  };

  // Auto-advance (similar to yours)
  useEffect(() => {
    if (!inView) {
      setHovered(false);
      return;
    }
    if (!hovered || animRef.current || paused) {
      return;
    }
    const interval = setInterval(() => {
      if (!animRef.current && startIndex < TechCards.length - 3) {
        handleNext();
      }
    }, DURATION);
    return () => clearInterval(interval);
  }, [startIndex, hovered, inView, paused]); // eslint-disable-line

  // Final-phase sequencing (keeps your behavior)
  useEffect(() => {
    const slideHandling = 1000;
    if (isFinalStage && finalPhase === "normal") {
      const t = setTimeout(() => {
        setFinalPhase("secondBig");
      }, slideHandling);
      return () => clearTimeout(t);
    }
  }, [isFinalStage, finalPhase]);

  useEffect(() => {
    const slideHandling = 1200;
    if (finalPhase === "secondBig") {
      const t = setTimeout(() => {
        setFinalPhase("thirdBig");
      }, slideHandling);
      return () => clearTimeout(t);
    }
  }, [finalPhase]);

  useEffect(() => {
    const slideHandling = 1200;
    if (finalPhase === "thirdBig") {
      const t = setTimeout(() => {
        setStartIndex(0);
        setVisibleCards(
          TechCards.slice(0, 4).map((c, idx) => ({
            ...c,
            widthClass: TechSizes[Math.min(idx, 2)](c.isFinal),
          }))
        );
        setFinalPhase("normal");
        setAnimating(false);
        animRef.current = false;
        // reset base widths/positions to initial
        const base = getBaseSlotWidthsFor(
          TechCards.slice(0, 4).map((c, idx) => ({
            ...c,
            widthClass: TechSizes[Math.min(idx, 2)](c.isFinal),
          }))
        );
        setActiveSlotWidths(base);
        setPositions(computePositions(base));
      }, slideHandling);
      return () => clearTimeout(t);
    }
  }, [finalPhase]); // eslint-disable-line

  useEffect(() => {
    const handleVisibilityChange = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // layout container width can be larger; overflow-hidden prevents seeing outside
  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        setHovered(true);
        handleNext();
      }}
      className="relative w-full max-w-[600px] h-[333px] overflow-hidden "
      style={{ touchAction: "pan-y" }}
    >
      {/* each card is absolutely positioned; positions[] holds left offsets */}
      {visibleCards.map((card, i) => {
        const left = positions[i] ?? 0;
        const width = activeSlotWidths[i] ?? 0;

        // Make sure images have intrinsic size or aspect ratio to avoid repaint jank
        return (
          <motion.div
            key={card.id ?? `slot-${i}-${startIndex}`}
            initial={false}
            animate={{
              x: left,
              width,
              height: 333,
            }}
            transition={{
              // animate smoothly only while animating; otherwise snap quickly
              duration: animating ? ANIMATION_DURATION : 0.25,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 1,
              minWidth: 0,
              overflow: "hidden",
              padding: card.isFinal ? 0 : 25,
              borderRadius: 16,
              zIndex: visibleCards.length - i,
            }}
            className="relative flex flex-col justify-end"
          >
            {card.isFinal ? (
              <ContactCard />
            ) : (
              <>
                <img
                  src={card.img}
                  alt={card.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                  // if you can, add width/height attributes or inline style aspectRatio to avoid reflow
                />
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{
                    opacity: i === 0 || i === 1 ? 1 : 0,
                    y: i === 0 || i === 1 ? 0 : 10,
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
    </div>
  );
}
