"use client";

import { useEffect, useState } from "react";

function ToggleDark() {
  const [theme, setTheme] = useState("");

  // Initialize theme once
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (
      (!storedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) ||
      storedTheme === "dark"
    ) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  function toggleTheme() {
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <div className="h-screen grid place-items-center bg-gray-100 dark:bg-slate-800">
      <div className="w-3/4 h-42 rounded-lg bg-cyan-300 dark:bg-cyan-900">
        <div className="p-5">
          <div className="flex flex-row">
            <h1 className="font-bold text-2xl dark:text-slate-200">Welcome</h1>

            <button
              className="ml-auto text-xl dark:text-slate-200"
              onClick={toggleTheme}
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>

          <p className="pt-3 leading-8 dark:text-slate-200">
            This is the text dark mode using Next.js and Tailwind.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ToggleDark;
