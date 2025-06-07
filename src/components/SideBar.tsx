import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBarItems } from "./SideBarItems";

interface filterProps {
  filter: "all" | "youtube" | "twitter";
  setFilter: (filter: "all" | "youtube" | "twitter") => void;
  isOpen: boolean; // Sidebar visibility state passed from parent
  onClose: () => void; // Function to close the sidebar
}

export function SideBar({ filter, setFilter, isOpen, onClose }: filterProps) {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`h-screen w-72 bg-white shadow-md fixed z-40 transform transition-transform duration-300 top-[60px]
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Sidebar content */}
        <div>
          <div
            onClick={() => {
              setFilter("all");
              onClose(); // Close sidebar after selecting filter
            }}
          >
            <SideBarItems text="All" active={filter === "all"} />
          </div>
          <div
            onClick={() => {
              setFilter("twitter");
              onClose(); // Close sidebar after selecting filter
            }}
          >
            <SideBarItems
              text="Twitter"
              icon={<TwitterIcon />}
              active={filter === "twitter"}
            />
          </div>
          <div
            onClick={() => {
              setFilter("youtube");
              onClose(); // Close sidebar after selecting filter
            }}
          >
            <SideBarItems
              text="Youtube"
              icon={<YoutubeIcon />}
              active={filter === "youtube"}
            />
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 top-[60px]"
          onClick={onClose} // Close sidebar when clicking outside
        />
      )}
    </>
  );
}
