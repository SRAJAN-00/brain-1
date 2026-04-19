import { motion } from "motion/react";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { PlusIcon } from "../../icons/PlusIcon";
import { ShareIcon } from "../../icons/ShareIcon";

const features = [
  {
    title: "Save YouTube Videos",
    description: "Store your favorite educational content, tutorials, and music in one highly organized dashboard.",
    icon: <YoutubeIcon />,
  },
  {
    title: "Capture Twitter Threads",
    description: "Never lose a valuable thread again. Archive the best tweets directly to your personal brain.",
    icon: <TwitterIcon />,
  },
  {
    title: "Organize with Tags",
    description: "Quickly filter your content by type so you can always find what you need instantly.",
    icon: <PlusIcon />,
  },
  {
    title: "Share Instantly",
    description: "Want to send a curated list to a friend? Share links seamlessly directly from your dashboard.",
    icon: <ShareIcon />,
  },
];

export function LandingFeatures() {
  return (
    <section className="w-full py-24 px-4 sm:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-500 mb-4">
            Everything You Need
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            DropPost is designed as a minimalist tool to help you organize the chaos of the internet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 cursor-pointer">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-neutral-900/40 border border-white/5 backdrop-blur-sm hover:bg-neutral-800/60 transition-all duration-300 group"
            >
              <div className="h-12 w-12 rounded-full bg-neutral-800 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 group-hover:bg-purple-900/30 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
