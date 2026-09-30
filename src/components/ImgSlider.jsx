import { useState } from "react";

const ImgSlider = () => {
  const [imgNo, setImgNo] = useState(0);
  const images = ["/Buddha.jpeg", "/images.jpeg", "/Thumbnail.jpeg"];
  const totalImages = images.length;
  const prevImgIndex = imgNo === 0 ? totalImages - 1 : imgNo - 1;
  const nextImgIndex = imgNo === totalImages - 1 ? 0 : imgNo + 1;

  const handleLeftSlider = () => {
    setImgNo((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const handleRightSlider = () => {
    setImgNo((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  console.log("ImgNo:", imgNo);
  return (
    <div className="fixed inset-0 bg-black/80  flex justify-center items-center  caret-transparent">
      <button
        onClick={handleLeftSlider}
        className={`text-white text-4xl font-bold cursor-pointer `}
      >
        ❮
      </button>
      <div className="mx-2 sm:mx-6  gap-4 h-full flex items-center justify-center">
        <div className="hidden sm:block w-[3vw]  overflow-hidden">
          <div
            className="
        max-w-[24rem] sm:w-lg lg:w-2xl aspect-square"
          >
            <img
              src={images[prevImgIndex]}
              className="w-full h-full object-cover rounded-2xl opacity-70"
            />
          </div>
        </div>

        <div className="max-w-[24rem] xs:w-[28rem] sm:w-lg aspect-square lg:w-2xl  ">
          <img
            src={images[imgNo]} // current image
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="hidden sm:block w-[3vw]  overflow-hidden">
          <div
            className="
        max-w-[24rem] sm:w-lg lg:w-2xl aspect-square"
          >
            <img
              src={images[nextImgIndex]}
              className="w-full h-full object-cover rounded-2xl opacity-70"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleRightSlider}
        className={`text-white text-4xl font-bold cursor-pointer `}
      >
        ❯
      </button>
    </div>
  );
};

export default ImgSlider;
