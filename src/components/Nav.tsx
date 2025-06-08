import { useState, useEffect } from "react";
import { BrainIcon } from "../icons/BrainIcon";
import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";

export default function Nav({
  search,
  setSearch,
  onMenuToggle,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onMenuToggle: () => void;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check the initial mode
    const htmlElement = document.documentElement;
    setIsDarkMode(htmlElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle("dark");
    setIsDarkMode(!isDarkMode); // Update state
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-[60px] bg-white border-b border-white/10 dark:bg-black shadow-sm z-50 flex items-center px-4">
      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 text-purple-500 dark:text-purple-300"
        onClick={onMenuToggle} // Toggle sidebar visibility
      >
        ☰
      </button>

      {/* Logo section */}
      <div className="flex items-center gap-2">
        <div className="text-purple-500 dark:text-purple-300 text-sm">
          <BrainIcon />
        </div>
        <span className="text-purple-500 dark:text-purple-300 font-bold text-3xl">
          DropPost
        </span>
      </div>

      {/* Push search box and toggle button to the end */}
      <div className="flex items-center ml-auto gap-4">
        {/* Search box */}
        <div className="flex items-center bg-gray-100 dark:bg-neutral-900 rounded-lg px-3 py-2 w-20 sm:w-full sm:max-w-md sm:px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 dark:text-gray-300 block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm6-2l4 4"
            />
          </svg>
          {/* Input field */}
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-gray-700 dark:text-gray-300 w-full text-sm sm:text-base"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>

        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="">
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  );
}
