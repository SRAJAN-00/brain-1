import { cn } from "../../lib/utils";

import { Spotlight } from "./spotlight";

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
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          Embed.Organize <br /> Share.All in One Place
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
          DropPost lets you embed Youtube videos, Twitter posts, and more
          beautifully and easily.
        </p>
        <button className="rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all">
          Get Started
        </button>
      </div>
    </div>
  );
}
