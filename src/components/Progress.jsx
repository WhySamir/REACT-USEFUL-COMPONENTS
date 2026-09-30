import { useEffect, useState } from "react";

const Progress = ({ progress }) => {
  const [animatedProgress, setanimatedProgress] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setanimatedProgress(progress);
    }, 100);
  }, [progress]);
  return (
    <>
      <div className="outer flex w-[30rem] h-14 rounded-lg border border-black overflow-hidden">
        {progress !== 0 && (
          <div
            className="inner  transition-all duration-500 ease-in justify-center items-center flex text-xs   h-14 bg-green-600 "
            style={{
              width: `${animatedProgress}%`,
            }}
          >
            {progress}%
          </div>
        )}
      </div>
    </>
  );
};

export default Progress;
