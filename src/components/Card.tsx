import { useEffect, useRef, useState } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { ThrashIcon } from "../icons/ThrashIcon";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import { Tooltip } from "./ui/Tooltip";
import axios from "axios";
import { BACKEND_URL } from "./config";
import ConfirmModel from "./ConfirmModel";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  onDelete: () => void;
  _id: string;
  notes?: string;
}

export function Card({
  title,
  link,
  type,
  onDelete,
  _id,
  notes: initialNotes = "",
}: CardProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [notes, setNotes] = useState(initialNotes);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const notesTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditingNotes) {
      const textarea = notesTextareaRef.current;
      textarea?.focus();
      textarea?.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, [isEditingNotes]);

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
        delayChildren: 0.05,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.28,
        ease: "easeOut" as const,
      },
    },
  };

  async function handleSummarize() {
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

      const receivedSummary = response.data?.summary;
      if (typeof receivedSummary === "string" && receivedSummary.trim()) {
        setSummary(receivedSummary);
      } else {
        setError(
          response.data.error || response.data.message || "No summary received"
        );
      }
    } catch (err: unknown) {
      console.error("Summarize error:", err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Failed to summarize");
      } else {
        setError("Failed to summarize");
      }
    }

    setLoading(false);
  }

  async function handleSaveNotes() {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BACKEND_URL}/api/v1/content/${_id}`,
        { notes },
        { headers: { Authorization: token || "" } }
      );
      setIsEditingNotes(false);
    } catch (err) {
      console.error("Failed to save notes:", err);
    }
  }

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
          className="bg-white dark:bg-neutral-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] hover:-translate-y-1 transition-all rounded-lg w-full max-w-xs sm:max-w-sm lg:max-w-sm xl:max-w-sm min-h-64 sm:min-h-72 lg:min-h-[380px] p-4 sm:p-5 lg:p-6 border border-white/10 mt-4"
        >
          <div className="flex justify-between items-center text-md">
            <div className="font-bold text-2xl dark:text-purple-400 ml-2">
              {title}
            </div>
            <div className="text-gray-500 pl-4"></div>

            <div className="flex">
              <div className="pr-3">
                <Tooltip content="Share Link">
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <ShareIcon />
                  </a>
                </Tooltip>
              </div>
              <div>
                <Tooltip content="Delete">
                  <button
                    onClick={() => setConfirm(true)}
                    className="text-red-500"
                  >
                    <ThrashIcon />
                  </button>
                </Tooltip>
                {confirm && (
                  <ConfirmModel
                    open={confirm}
                    title="Delete Content"
                    message="Are you sure you want to delete this?"
                    onConfirm={() => {
                      onDelete();
                      setConfirm(false);
                    }}
                    onCancel={() => {
                      setConfirm(false);
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-4">
            {type === "youtube" && (
              <iframe
                className="w-full rounded-lg"
                width="100%"
                height="200"
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
              <div className="flex items-center justify-center bg-gray-50 dark:bg-neutral-800 rounded-lg">
                <blockquote className="twitter-tweet rounded-lg w-full h-full overflow-hidden">
                  <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>
              </div>
            )}
          </div>

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

              {error && (
                <div className="mt-2 text-red-500 text-sm">❌ {error}</div>
              )}

              {summary && (
                <div className="mt-3 p-3 bg-gray-100 dark:bg-neutral-800 rounded-lg overflow-scroll max-h-48">
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

          <div className="mt-4 border-t border-gray-200 dark:border-neutral-700 pt-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                📝 Notes
              </h4>
              <button
                onClick={() => setIsEditingNotes(!isEditingNotes)}
                className="text-xs text-purple-600 dark:text-purple-400 hover:underline"
              >
                {isEditingNotes ? "Cancel" : "Edit"}
              </button>
            </div>

            {isEditingNotes ? (
              <div>
                <textarea
                  value={notes}
                  ref={notesTextareaRef}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your notes here..."
                  className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-lg 
                           bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-200
                           focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none max-h-[150px] overflow-y-auto"
                  rows={3}
                />
                <button
                  onClick={handleSaveNotes}
                  className="mt-2 px-4 py-1 bg-purple-600 hover:bg-purple-700 text-white 
                           rounded-lg text-sm transition-colors"
                >
                  Save Notes
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap max-h-[100px] overflow-y-auto">
                {notes || "No notes yet. Click Edit to add some!"}
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
