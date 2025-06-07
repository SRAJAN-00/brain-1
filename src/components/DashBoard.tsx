import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ContentModel } from "../components/ContentModel";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { SideBar } from "../components/SideBar";
import { useContent } from "./hooks/useContent";
import { Toaster } from "react-hot-toast";
import Nav from "./Nav";

export function DashBoard() {
  const [search, setSearch] = useState("");
  const [modelopen, setModelOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "youtube" | "twitter">("all");
  const { contents, refresh, deleteContent } = useContent();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    refresh();
  }, [modelopen]);

  const filteredContents = useMemo(() => {
    return contents
      .filter((item) => filter === "all" || item.type === filter)
      .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
  }, [contents, filter, search]);

  return (
    <div className="flex">
      {/* Pass the toggle function to Nav */}
      <Nav
        search={search}
        setSearch={setSearch}
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      {/* Pass the state and toggle function to SideBar */}
      <SideBar
        filter={filter}
        setFilter={setFilter}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <Toaster />

      {/* Main content - responsive margins */}
      <div className="flex-1 min-h-screen bg-neutral-10 justify-center ml-0 md:ml-72 px-4 md:px-0">
        {/* Mobile Header - Brain App title */}

        {/* Header buttons - centered on mobile, right-aligned on desktop */}
        <div className="flex flex-row sm:flex-row-2 justify-center sm:justify-end gap-3 sm:gap-5 sm:p-10 pt-10 px-2 sm:pr-14 sm:pl-8 mt-10 mr-0 sm:mr-9">
          <Button
            onClick={() => setModelOpen(true)}
            variant="primary"
            text={window.innerWidth < 640 ? "Add" : "Add Content"} // Check screen width
            startIcon={<PlusIcon />}
          />
          <Button
            variant="secondary"
            text={window.innerWidth < 640 ? "Share" : "Share Content"}
            startIcon={<ShareIcon />}
          />
        </div>

        {/* Cards grid - centered on mobile with proper spacing */}
        <div className="flex justify-center px-4 sm:px-6 lg:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-6 mt-2 w-full max-w-7xl">
            {filteredContents.map((item, index) => (
              <Card
                key={item._id || index}
                title={item.title}
                link={item.link}
                type={item.type as "youtube" | "twitter"}
                onDelete={() => deleteContent(String(item._id))}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal for adding content */}
      {modelopen && (
        <ContentModel open={modelopen} onClose={() => setModelOpen(false)} />
      )}
    </div>
  );
}

// In your Card.tsx file, update the container classes:
<div className="bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow w-full max-w-xs sm:max-w-sm"></div>;



