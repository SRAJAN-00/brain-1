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
          Authorization: localStorage.getItem("token"),
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
          className="h-screen w-full flex justify-center items-center fixed top-0 left-0 z-50   bg-opacity-50 p-4"
        >
          <div className="w-full max-w-[600px] mx-auto">
            <div className="bg-white shadow-lg rounded-xl w-full h-auto max-h-[90vh] overflow-y-auto border p-6">
              {/* Header with close button */}
              <div className="flex justify-between items-center mb-6">
                <div></div> {/* Empty div for spacing */}
                <h2 className="text-2xl pl-8 text-purple-700 font-semibold text-gray-800">
                  Add Content
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <CrossIcon />
                </button>
              </div>

              {/* Form content */}
              <div className="space-y-6">
                {/* Input fields */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full max-w-md">
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
                      Title
                    </label>
                    <Input reference={titleRef} placeholder="Enter title" />
                  </div>
                  <div className="w-full max-w-md">
                    <label className="block text-sm font-medium text-gray-700  text-start">
                      Link
                    </label>
                    <Input reference={linkRef} placeholder="Enter link" />
                  </div>
                </div>

                {/* Content type buttons */}
                <div className="text-center">
                  <label className="block text-xl font-medium mb-5 text-purple-500 ">
                    Content Type
                  </label>
                  <div className="flex justify-center gap-3">
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
                </div>

                {/* Submit button */}
                <div className="flex justify-center pt-2">
                  <Button
                    onClick={addContent}
                    variant="primary"
                    text="Add to Brain"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
