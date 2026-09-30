import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const ContactCard = ({ title = "Are you our next hire?" }) => (
  <div className="w-full h-full  overflow-hidden bg-white border-2 border-purple-200 flex items-center justify-center">
    <div className="p-6 text-center">
      <h3 className="text-2xl font-bold text-purple-900 mb-4">{title}</h3>
      <button className="px-6 py-3 bg-purple-700 text-white rounded-lg font-medium hover:bg-purple-800 transition-colors flex items-center gap-2">
        Get In Touch <span aria-hidden>→</span>
      </button>
    </div>
  </div>
);

const cards = [
  { id: 1, img: "/img1.png", name: "Name", designation: "Designation" },
  { id: 2, img: "/img2.png", name: "Name", designation: "Designation" },
  { id: 3, img: "/img3.png", name: "Name", designation: "Designation" },
  { id: 4, img: "/img1.png", name: "Name", designation: "Designation" },
  { id: 5, img: "/img2.png", name: "Name", designation: "Designation" },
  { id: 6, img: "/img3.png", name: "Name", designation: "Designation" },
  { id: 7, img: "/img2.png", isFinal: true }, // CTA card
];

const sizes = [
  (isFinal) => `w-[254px] h-[333px] ${isFinal ? "p-0" : "p-[25px]"}`,
  (isFinal) => `w-[174px] h-[333px] ${isFinal ? "p-0" : "p-[25px]"}`,
  (isFinal) => `w-[123px] h-[333px] ${isFinal ? "p-0" : "p-[25px]"}`,
];

export default function TechThatPowers() {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => {
        if (prev >= cards.length - 3) {
          clearInterval(interval); // stop animating
          return prev; // stay there
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cards.length]);

  // Pick 3 visible cards starting from startIndex
  const visibleCards = (() => {
    setTimeout(() => {
      if (startIndex === cards.length - 3) {
        return [
          { ...cards[cards.length - 3], widthClass: sizes[2] }, // second last shrinks
          { ...cards[cards.length - 2], widthClass: sizes[1] }, // second last shrinks
          { ...cards[cards.length - 1], widthClass: sizes[0] }, // CTA takes big
        ];
      }
    }, 200);

    return cards.slice(startIndex, startIndex + 3).map((c, idx) => ({
      ...c,
      widthClass: sizes[idx](c.isFinal),
    }));
  })();

  return (
    <section className="hidden lg:flex  flex-row items-center justify-between gap-8">
      {/* Left Section */}
      <div className=" max-w-[400px] xl:max-w-[582px]">
        <h2 className="text-h2">
          Tech That Powers <span className="text-red-500">Zedfo</span>
        </h2>
        <p className="text-body mt-4">
          Lorem ipsum dolor sit amet consectetur. Eget adipiscing feugiat risus
          mauris erat a justo adipiscing. Tempus tristique ut vel cras pharetra.
        </p>
        <div className="flex gap-4 mt-6">
          <button className="bg-red-500 text-white px-6 py-2 rounded-md">
            Read More
          </button>
          <button className="bg-white border border-red-500 text-red-500 px-6 py-2 rounded-md">
            Get In Touch
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-end gap-4 overflow-hidden">
        <AnimatePresence initial={false}>
          {visibleCards.map((card, idx) => (
            <motion.div
              key={card.id || "final"}
              initial={{ x: 0, opacity: idx === 0 ? 0 : 1 }} // only first fades in
              animate={{ x: 0, opacity: 1 }}
              exit="exit"
              transition={{
                type: "tween",
                duration: 0.9,
                ease: "easeInOut",
              }}
              className={`flex flex-col justify-end items-start flex-shrink-0 rounded-2xl relative overflow-hidden ${card.widthClass}`}
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
                  <div className="relative z-10 text-white p-4">
                    <p className="font-bold">{card.name}</p>
                    <p className="text-sm opacity-80">{card.designation}</p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
