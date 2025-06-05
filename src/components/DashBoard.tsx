import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ContentModel } from "../components/ContentModel";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { SideBar } from "../components/SideBar";
import { useContent } from "./hooks/useContent";


export function DashBoard() {
  const [modelopen, setModelOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "youtube" | "twitter">("all");
  const { contents, refresh, deleteContent } = useContent();

  useEffect(() => {
    refresh();
  }, [modelopen]);

  const filteredContents =
    filter === "all"
      ? contents
      : contents.filter((item) => item.type === filter);

  return (
    <div className="flex">
      <SideBar filter={filter} setFilter={setFilter} />

      {/* Main content - responsive margins */}
      <div className="flex-1 min-h-screen bg-gray-50 justify-center ml-0 md:ml-72 px-4 md:px-0">
        {/* Header buttons - responsive */}
        <div className="flex flex-col sm:flex-col justify-end gap-3 sm:gap-5 pt-10 mr-5 ml-5 mt-10 flex sm:mr-4">
          <Button
            onClick={() => setModelOpen(true)}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
          />
          <Button
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          />
        </div>

        {/* Cards grid - responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 ml-5 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-6 ml-0 sm:ml-5">
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

      {/* Modal for adding content */}
      {modelopen && (
        <ContentModel open={modelopen} onClose={() => setModelOpen(false)} />
      )}
    </div>
  );
}
