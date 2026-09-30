import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const AnimatedSlider = () => {
  const [imgNo, setImgNo] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("");
  const imageRef = useRef(null);

  const images = [
    "/Kuro5.jpg",
    "/Kuro1.jpg",
    "/Kuro2.jpg",
    "/Kuro3.jpg",
    "/Kuro4.jpg",
  ];
  const totalImages = images.length;
  const prevImgIndex = imgNo === 0 ? totalImages - 1 : imgNo - 1;
  const nextImgIndex = imgNo === totalImages - 1 ? 0 : imgNo + 1;

  const handleLeftSlider = () => {
    setAnimationDirection("left");
    setImgNo(prevImgIndex);
  };

  const handleRightSlider = () => {
    setAnimationDirection("right");
    setImgNo(nextImgIndex);
  };

  useEffect(() => {
    if (imageRef.current) {
      const offsetX = window.innerWidth * 0.05; // 5% of viewport width
      gsap.fromTo(
        imageRef.current,
        { x: animationDirection === "left" ? -offsetX : offsetX, opacity: 1 },
        { x: 0, opacity: 1.5, scale: 1, duration: 0.5 }
      );
    }
  }, [imgNo, animationDirection]);
  return (
    <div className="absolute inset-0 bg-black/90 flex justify-center items-center caret-transparent ">
      <button
        onClick={handleLeftSlider}
        className="text-white text-4xl font-bold cursor-pointer"
      >
        <img src="/Lef.svg" alt="" />
      </button>
      <div className="mx-2 relative gap-4 h-full flex items-center justify-center ">
        <div
          onClick={handleLeftSlider}
          className="hidden absolute -left-[14vw] bottom-[22vh] md:block h-[8vw] overflow-hidden transition-all hover:scale-105"
        >
          <div className="w-full h-full aspect-video">
            <img
              src={images[prevImgIndex]}
              className="w-full h-full object-cover opacity-70"
            />
          </div>
        </div>

        <div className="z-10 relative transition-all ease-in-out transform hover:scale-103 duration-150">
          <img
            ref={imageRef}
            src={images[imgNo]}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          onClick={handleRightSlider}
          className="hidden absolute -right-[10vw] bottom-[22vh] xl:-right-[14vw] lg:bottom-[22vh] md:block h-[8vw] z-0 overflow-hidden transition-all hover:scale-105"
        >
          <div className="w-full h-full aspect-video">
            <img
              src={images[nextImgIndex]}
              className="w-full h-full object-cover opacity-70"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleRightSlider}
        className="mt-[2px] text-white text-4xl font-bold cursor-pointer"
      >
        <img src="/Right.svg" alt="" />
      </button>
    </div>
  );
};

export default AnimatedSlider;

// const images = [
//   "https://media-cdn-zspms.kurogame.net/pnswebsite/website2.0/images/1740326400000/z6mo0ddo7tyb0371pa-1740380183557kv-970x545.jpg",
//   "https://media-cdn-zspms.kurogame.net/pnswebsite/website2.0/images/1740326400000/31z9y2teueqdtdlq3u-1740380125203kv2-970x545.jpg",
//   "https://media-cdn-zspms.kurogame.net/pnswebsite/website2.0/images/1740326400000/n37z2rovmau4dskfat-17403800235173-970x545.jpg",
//   "https://media-cdn-zspms.kurogame.net/pnswebsite/website2.0/images/1740326400000/ce7unp4fghi5h5jq2i-17403800730174-970x545.jpg",
//   "https://media-cdn-zspms.kurogame.net/pnswebsite/website2.0/images/1740326400000/12w4y4qk0nmg60xuq4-17403799836942-970x545.jpg",
// ];
