import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ContentModel } from "../components/ContentModel";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { SideBar } from "../components/SideBar";
import { useContent } from "./hooks/useContent";
import toast, { Toaster } from "react-hot-toast";
import Nav from "./Nav";

export function DashBoard() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "youtube" | "twitter">("all");
  
  const [modelopen, setModelOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const { contents, refresh, deleteContent } = useContent();

  useEffect(() => {
    refresh();
  }, [modelopen, refresh]);

  const filteredContents = useMemo(() => {
    return contents
      .filter((item) => filter === "all" || item.type === filter)
      .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
  }, [contents, filter, search]);

  return (
    <div className="flex">
      <Nav
        search={search}
        setSearch={setSearch}
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <div className="flex gap-3 px-3">
          <Button
            onClick={() => setModelOpen(true)}
            variant="primary"
            text={window.innerWidth < 640 ? "Add" : "Add Content"}
            startIcon={<PlusIcon />}
          />
          <Button
            onClick={() => {
              toast.error("Share feature is not implemented yet.");
            }}
            variant="secondary"
            text={window.innerWidth < 640 ? "Share" : "Share Content"}
            startIcon={<ShareIcon />}
          />
        </div>
      </Nav>
      
      <SideBar
        filter={filter}
        setFilter={setFilter}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <Toaster />

      <div className="flex-1 min-h-screen bg-gray-50 dark:bg-neutral-950 transition-colors duration-300 ml-0 md:ml-72 px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Content</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage and explore your saved links.</p>
        </div>

        <div className="flex flex-col items-center max-w-7xl mx-auto">
          {filteredContents.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 p-12 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 w-full max-w-md text-neutral-500 dark:text-neutral-400">
              <div className="h-16 w-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mb-6">
                <PlusIcon />
              </div>
              <p className="text-xl font-medium text-gray-900 dark:text-gray-100">No content yet</p>
              <p className="text-sm mt-2 text-center">Click "Add Content" to save your first link and start building your collection!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full mt-2">
              {filteredContents.map((item, index) => (
                <Card
                  key={item._id || index}
                  title={item.title}
                  link={item.link}
                  type={item.type as "youtube" | "twitter"}
                  onDelete={() => deleteContent(String(item._id))}
                  _id={String(item._id)}
                  notes={item.notes}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {modelopen && (
        <ContentModel open={modelopen} onClose={() => setModelOpen(false)} />
      )}
    </div>
  );
}
