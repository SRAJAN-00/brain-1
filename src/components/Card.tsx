import { ShareIcon } from "../icons/ShareIcon";
import { ThrashIcon } from "../icons/ThrashIcon";
import { AnimatePresence, easeInOut, motion } from "motion/react";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  onDelete: () => void; // Add onDelete callback
}

export function Card({ title, link, type, onDelete }: CardProps) {
  console.log("title", title);
  return (
    <div>
      <AnimatePresence>
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
          transition={{ duration: 0.5, ease: easeInOut }}
          className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg max-w-80 min-w-80 min-h-64 max-h- p-1 border gap-2 p-6 mt-4"
        >
          <div className="flex justify-between item-center text-md">
            <div className="text-gray-500 pl-4">
             
            </div>

            <div className="flex">
              <div className="pr-3">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <ShareIcon />
                </a>
              </div>
              <div>
                <button onClick={onDelete} className="text-red-500">
                  <ThrashIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="font-bold text-2xl  bottom-10 ml-2 ">{title}</div>
          <div className="mt-4">
            {type === "youtube" && (
              <iframe
                className="w-full rounded-lg"
                width="560"
                height="315"
                src={link.replace("watch?v=", "embed/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            )}
            {type === "twitter" && (
              <blockquote className="twitter-tweet rounded-lg">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
