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
  console.log("contents", contents);
  useEffect(() => {
    refresh();
  }, [modelopen]);
  
  const filteredContents =
    filter === "all"
      ? contents
      : contents.filter((item) => item.type === filter);
  return (
    <div>
      <SideBar filter={filter} setFilter={setFilter} />
      <div className="ml-72 min-h-screen  bg-gray-50 top-0 ">
        <ContentModel
          open={modelopen}
          onClose={() => {
            setModelOpen(false);
          }}
        />
        <div className=" flex justify-end  gap-5 pt-10 mr-9 5 bg-gray-50">
          <Button
            onClick={() => setModelOpen(true)}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
          ></Button>
          <Button
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          ></Button>
        </div>
        <div className="flex flex-wrap ml-5 gap-10">
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
  );
}
