import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Button } from "../Button";

import { Spotlight } from "./spotlight";
import { motion } from "motion/react";

export default function SpotlightPreview() {
  return (
    <div className="relative flex h-screen w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
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
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          Embed.Organize <br /> Share.All in One Place
        </motion.h1>
        <motion.p
        initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
          DropPost lets you embed Youtube videos, Twitter posts, and more
          beautifully and easily.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex items-center justify-center gap-4 pt-5"
        >
          <Link to="/signup">
            <Button variant="primary" text="Get Started" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
