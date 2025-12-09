import { useState } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { ThrashIcon } from "../icons/ThrashIcon";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import axios from "axios";
import { BACKEND_URL } from "./config";
import ConfirmModel from "./ConfirmModel";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  onDelete: () => void;
  _id: string;
}

export function Card({ title, link, type, onDelete, _id }: CardProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirm,setConfirm]=useState(false)

  // Animation variants for staggered summary lines
  const summaryLines = summary
    ? summary
        .split(/\n+/)
        .map((l) => l.replace(/^[-•\s]+/, "").trim())
        .filter(Boolean)
    : [];

  const parent = {
    hidden: { opacity: 1 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.08, 
        delayChildren: 0.05 
      } 
    },
  };

  const child = {
    hidden: { opacity: 0, y: 8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.28, 
        ease: "easeOut" 
      } 
    },
  };

  // Function to summarize - FIXED!
  async function handleSummarize() {
    console.log("summarize clicked", _id);
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/content/${_id}/summarize`,
        {},
        {
          headers: {
            Authorization: token || "",
          },
        }
      );

      console.log("Full response:", response);
      console.log("Response data:", response.data);

      // Check if summary exists in response
      if (response.data.summary) {
        console.log("Setting summary:", response.data.summary);
        setSummary(response.data.summary);
      } else if (response.data.success && response.data.summary) {
        setSummary(response.data.summary);
      } else {
        setError(response.data.error || response.data.message || "No summary received");
      }
    } catch (err: any) {
      console.error("Summarize error:", err);
      setError(err.response?.data?.error || "Failed to summarize");
    }

    setLoading(false);
  }

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
          className="bg-white dark:bg-neutral-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg w-full max-w-xs sm:max-w-sm lg:max-w-sm xl:max-w-sm min-h-[380px] sm:min-h-72 lg:min-h-[380]  sm:p-5 lg:p-6 border 
          border-white/10 mt-4"
        >
          <div className="flex justify-between items-center text-md">
            <div className="font-bold text-2xl dark:text-purple-400 ml-2">
              {title}
            </div>
            <div className="text-gray-500 pl-4"></div>

            <div className="flex">
              <div className="pr-3">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <ShareIcon />
                </a>
              </div>
              <div>
                <button onClick={()=> setConfirm(true)} className="text-red-500">
                  <ThrashIcon />
                </button>
                {confirm&&<ConfirmModel
                open={confirm}
                title="Delete Content"
                message="Are you sure you want to delete this"
                onConfirm={()=>{
                  onDelete()
                  setConfirm(false)
                }}
                onCancel={()=>{

                  setConfirm(false)
                }}

                />}
              </div>
            </div>
          </div>

          <div className="mt-4">
            {type === "youtube" && (
              <iframe
                className="w-full rounded-lg"
                width="560"
                height="220"
                src={link
                  .replace("watch?v=", "embed/")
                  .replace("youtu.be/", "youtube.com/embed/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            )}
            {type === "twitter" && (
              <div className="h-[220px] flex items-center justify-center bg-gray-50 dark:bg-neutral-800 rounded-lg">
                <blockquote className="twitter-tweet rounded-lg w-full h-full">
                  <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>
              </div>
            )}
          </div>

          {/* Summarize Button - Only for YouTube */}
          {type === "youtube" && (
            <div className="mt-4">
              <button
                onClick={handleSummarize}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 
                         text-white font-semibold py-2 px-4 rounded-lg 
                         transition-colors duration-200 cursor-pointer disabled:cursor-wait"
              >
                {loading ? "⏳ Summarizing..." : "🤖 Summarize with AI"}
              </button>

              {/* Error Message */}
              {error && (
                <div className="mt-2 text-red-500 text-sm">❌ {error}</div>
              )}

              {/* Summary Display with Staggered Animation */}
              {summary && (
                <div className="mt-3 p-3 bg-gray-100 dark:bg-neutral-800 rounded-lg overflow-scroll">
                  <div className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
                    📝 Summary:
                  </div>
                  <motion.ul
                    className="list-none space-y-1"
                    variants={parent}
                    initial="hidden"
                    animate="visible"
                  >
                    {summaryLines.map((line, i) => (
                      <motion.li
                        key={i}
                        variants={child}
                        className="text-sm text-gray-700 dark:text-gray-300"
                      >
                        • {line}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
