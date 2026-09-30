export default function LandingPage2() {
  return (
    <section className="relative  w-full h-screen flex">
      {/* Left Side */}
      <div className="relative w-1/2 h-full">
        <img
          src="/w.jpg"
          alt="For Her"
          className="object-cover brightness-90 h-full w-full"
          priority
        />
        <div className="absolute bottom-11 left-34 font-bebasNeue text-white font-bebasNeue text-5xl font-[300]">
          FOR HER
        </div>
      </div>
      <p className="absolute z-50 bottom-15 left-1/2 -translate-x-1/2 text-white text-sm mt-6 font-urbanist tracking-wide">
        Choose Your Fragrance Journey
      </p>

      {/* Right Side */}
      <div className="relative w-1/2 h-full">
        <img
          src="/t.jpg"
          alt="For Him"
          fill
          className="object-cover brightness-90 h-full w-full"
          priority
        />
        <div className="absolute bottom-11 right-34 text-white font-bebasNeue text-5xl font-[300]">
          FOR HIM
        </div>
      </div>

      {/* Overlay Text */}
      <div className="absolute top-16.5 left-35 flex flex-col ">
        <h3 className="text-[#EAE9E9]  text-[18.6vw] font-bebasNeue font-[400]  tracking-[-0.033em]">
          INDULGE
        </h3>
        <h3 className="text-[#EAE9E9]  pl-[12vw] text-[18.6vw] font-bebasNeue font-[400] leading-[62px] tracking-tight">
          YOUR SENSES
        </h3>
      </div>

      {/* Navbar */}
      <div className="absolute top-12 left-35 text-white font-urbanist text-sm tracking-widest">
        ABOUT
      </div>
      <div className="absolute top-12 right-8 text-white font-urbanist text-sm tracking-widest">
        CONTACT
      </div>
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-white font-bebasNeue font-[400] tracking-widest border-b border-white pb-1">
        PERFUMORA
      </div>
    </section>
  );
}
