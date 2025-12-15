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
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const notes = noteRef.current?.value;
    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {
        title,
        link,
        notes,
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
          layout
          layoutId="open-Model"
          initial={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(4px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(4px)",
          }}
          transition={{
            duration: 0.2,
            ease: easeInOut,
            layout: { duration: 0.3 },
          }}
          className="h-screen w-full flex justify-center items-center fixed top-0 left-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm p-4"
        >
          <div className="w-full max-w-[600px] mx-auto">
            <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-xl w-full h-auto max-h-[90vh] overflow-y-auto border border-white/10 p-6">
              {/* Header with close button */}
              <div className="flex justify-between items-center mb-6">
                <div></div> {/* Empty div for spacing */}
                <h2 className="text-2xl pl-8 font-semibold text-purple-500 dark:text-purple-400">
                  Add Content
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:dark:text-neutral-300 rounded-full transition-colors"
                >
                  <CrossIcon />
                </button>
              </div>

              {/* Form content */}
              <div className="space-y-6">
                {/* Input fields */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full max-w-md">
                    <label className="block text-md font-medium dark:text-neutral-100 text-gray-700 mb-2 text-start">
                      Title
                    </label>
                    <Input reference={titleRef} placeholder="Enter title" />
                  </div>
                  <div className="w-full max-w-md">
                    <label className="block text-md font-medium dark:text-neutral-100 text-gray-700 text-start">
                      Link
                    </label>
                    <Input reference={linkRef} placeholder="Enter link" />
                  </div>
                  <div className="w-full max-w-md">
                    <label className="block text-md font-medium dark:text-neutral-100 text-gray-700 text-start">
                      Note
                    </label>
                    <textarea
                      ref={noteRef}
                      placeholder="Add notes (optional)"
                      rows={3}
                      className="w-full px-4 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Content type buttons */}
                <div className="text-center">
                  <label className="block text-xl font-medium mb-5 text-purple-500">
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
