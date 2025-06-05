import { useState } from "react";
import { BrainIcon } from "../icons/BrainIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBarItems } from "./SideBarItems";

interface filterProps {
  filter: "all" | "youtube" | "twitter";
  setFilter: (filter: "all" | "youtube" | "twitter") => void;
}

export function SideBar({ filter, setFilter }: filterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className={`md:hidden fixed p-3 top-8 left-2 z-50 p-2  
        ${isOpen ? "left-[242px] mt-14 shadow-none" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`
        h-screen w-72 bg-white shadow-md border-r-2 border-gray-200 
        fixed z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        <div className={`text-3xl pl-4 pb-5 flex items-center transition-all duration-300 ${
          isOpen ? "pt-16 text-[26px]" : "pt-4"
        } md:pt-4`}>
          <div className="pr-3 text-purple-500">
            <BrainIcon />
          </div>
          <div className="text-purple-500 font-bold pt-3">Second Brain</div>
        </div>
        <div>
          <div onClick={() => setFilter("all")}>
            <SideBarItems text="All" active={filter === "all"} />
          </div>
          <div onClick={() => setFilter("twitter")}>
            <SideBarItems
              text="Twitter"
              icon={<TwitterIcon />}
              active={filter === "twitter"}
            />
          </div>
          <div onClick={() => setFilter("youtube")}>
            <SideBarItems
              text="Youtube"
              icon={<YoutubeIcon />}
              active={filter === "youtube"}
            />
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
