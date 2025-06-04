import { BrainIcon } from "../icons/BrainIcon";
import { TwitterIcon } from "../icons/TwitterIcon";

import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBarItems } from "./SideBarItems";
interface filterProps {
  filter: "all" | "youtube" | "twitter";
  setFilter: (filter: "all" | "youtube" | "twitter") => void;
}
export function SideBar({ filter, setFilter }: filterProps) {
  return (
    <div className="h-screen w-72 bg-white shadow-md border-r-2 border-gray-200 fixed">
      <div className="text-3xl  b pl-4 pt-4 pb-5 flex items-center">
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
  );
}
