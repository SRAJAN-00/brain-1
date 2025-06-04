import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "./config";
enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}
interface ContentModelProps {
  open: boolean;
  onClose: () => void;
}

export function ContentModel({ open, onClose }: ContentModelProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);
  //prettier-ignore
  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {
        title,
        link,
        type,
      },
      {
        headers: {
          "Authorization": localStorage.getItem("token"),
        },
      }
    );
    onClose();
  }
  return (
    <div>
      {open && (
        <div className="bg-slate-200 h-screen w-full flex justify-center items-center fixed top-0 left-0 z-50 backdrop-blur-sm bg-opacity-50">
          <div>
            <div className="bg-white shadow-sm rounded-lg h-[700px] w-[800px] p-1 border gap-2 p-6 mt-4">
              <div className="flex justify-end size-26" onClick={onClose}>
                <CrossIcon />
              </div>
              <div className="justify-center items-center ml-20 mt-9">
                <div className="mb-8 mt-34">
                  <Input reference={titleRef} placeholder={"Title"} />
                </div>
                <Input reference={linkRef} placeholder={"Link"} />
              </div>
              <div className="flex justify-center items-center mt-15 p-8 gap-5">
                <Button
                  variant={
                    type === ContentType.Youtube ? "primary" : "secondary"
                  }
                  text="Youtube"
                  onClick={() => setType(ContentType.Youtube)}
                />
                <Button
                  onClick={() => setType(ContentType.Twitter)}
                  variant={
                    type === ContentType.Twitter ? "primary" : "secondary"
                  }
                  text="Twitter"
                />
              </div>
              <div className="flex justify-center items-center mt-15 p-8">
                <Button
                  onClick={addContent}
                  variant="primary"
                  text="Submit Brain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
