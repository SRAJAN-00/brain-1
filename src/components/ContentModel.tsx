import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { easeInOut, motion } from "motion/react";
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
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.98,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            scale: 0.98,
            filter: "blur(10px)",
          }}
          transition={{ duration: 0.2, ease: easeInOut }}
          className=" h-screen w-full flex justify-center items-center fixed top-0 left-0 z-50 backdrop-blur-sm bg-opacity-50"
        >
          <div>
            <div className="bg-white shadow-sm rounded-lg h-[600px] w-[600px] pr-15 p-1 border gap-2 p-6 mt-4">
              <div className="flex justify-end size-26" onClick={onClose}>
                <CrossIcon />
              </div>
              <div className="  justify-center items-center  mt-9">
                <div className="justify-center item-center ml-12">
                  <div className="mb-8 pr-10 mt-34">
                    <Input reference={titleRef} placeholder={"Title"} />
                  </div>
                  <Input reference={linkRef} placeholder={"Link"} />
                </div>
              </div>
              <div className="flex justify-center items-center mt-15 p-8 gap-5">
                <div>
                  <Button
                    variant={
                      type === ContentType.Youtube ? "primary" : "secondary"
                    }
                    text="Youtube"
                    onClick={() => setType(ContentType.Youtube)}
                  />
                </div>
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
        </motion.div>
      )}
    </div>
  );
}
