import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const SliderAnimated = () => {
  const [items, setItems] = useState([
    { id: 1, image: "Kuro1.jpg" },
    { id: 2, image: "Kuro4.jpg" },
    { id: 3, image: "Kuro3.jpg" },
    { id: 4, image: "Kuro2.jpg" },
    { id: 5, image: "Kuro5.jpg" },
    { id: 6, image: "Kuro2.jpg" },
  ]);

  const handleNext = () => {
    setItems((prev) => [...prev.slice(1), prev[0]]);
  };

  const handlePrev = () => {
    setItems((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
  };

  return (
    <div className="container absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] p-12 bg-[#f5f5f5] shadow-xl ">
      <div className=" mt-12 w-max h-full">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute top-1/2 -translate-y-1/2 bg-cover bg-center transition-all duration-500 rounded-lg shadow-lg ${
              index === 0 || index === 1
                ? "left-0 top-0 w-full h-full translate-0 rounded-none shadow-none"
                : index === 2
                ? "left-1/2  w-[200px] h-[300px]"
                : index === 3
                ? "left-[calc(50%+220px)] w-[200px] h-[300px]"
                : index === 4
                ? "left-[calc(50%+440px)] w-[200px] h-[300px]"
                : "left-[calc(50%+660px)] opacity-0 w-[200px] h-[300px]"
            }`}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div
              className={`absolute top-1/2 left-24 w-[300px] text-left text-white ${
                index === 1 ? "opacity-100 block" : "opacity-0 hidden"
              }`}
            >
              <div className="text-4xl font-bold showcontent">Samir</div>
              <div className="mt-4 showcontent">Tinh ru anh di chay pho...</div>
              <button className="showcontent mt-4 px-4 py-2 bg-white text-black rounded-md">
                See more
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="buttons absolute bottom-8 w-full text-center">
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border border-gray-600 hover:bg-gray-400 mx-2 transition"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-gray-600 hover:bg-gray-400 mx-2 transition"
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
};

export default SliderAnimated;
