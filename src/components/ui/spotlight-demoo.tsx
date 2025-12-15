import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Button } from "../Button";
import { Spotlight } from "./spotlight";
import { motion } from "motion/react";

export default function SpotlightPreview() {
  const features = [
    {
      title: "Save Anything",
      description: "YouTube videos, Twitter posts - all in one place",
      icon: "📌",
    },
    {
      title: "AI Summaries",
      description: "Get instant summaries of your saved videos",
      icon: "🤖",
    },
    {
      title: "Take Notes",
      description: "Add personal notes to every piece of content",
      icon: "📝",
    },
    {
      title: "Dark Mode",
      description: "Beautiful interface that's easy on your eyes",
      icon: "🌙",
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-black/[0.96] antialiased">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />

      <div className="relative z-20 mt-20 mx-auto w-full max-w-7xl p-6 py-20">
        {/* Hero Section */}
        <div className="mb-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl"
          >
            Your Second Brain
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300"
          >
            Save, organize, and remember everything that matters. Store your
            favorite content with AI-powered summaries and personal notes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <Link to="/signup">
              <Button variant="primary" text="Get Started Free" />
            </Link>
            <Link to="/signin">
              <button className="px-6 py-2 text-neutral-300 hover:text-white transition-colors">
                Sign In →
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Bento Grid Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 hover:border-neutral-700 transition-all hover:bg-neutral-900/70"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Simple Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-block rounded-full border border-neutral-800 bg-neutral-900/50 px-8 py-4">
            <p className="text-sm text-neutral-400">
              Built with modern tech stack • Fast • Secure • Open Source
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
