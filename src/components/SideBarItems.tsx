import { ReactElement } from "react";
import { motion } from "motion/react";

export function SideBarItems({
  text,
  icon,
  active = false,
}: {
  text: string;
  icon?: ReactElement;
  active?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ scale: 0.95, transition: { duration: 0.10 } }}
      whileTap={{ scale: 1.5, transition: { duration: 0.5 } }}
      className={`flex gap-5 pl-2 mt-2 items-center p-4 text-black hover:  rounded-lg  cursor-pointer  transition-all duration-300 ease-in-out focus:outline-none hover:border-blue-500 hover:shadow-md ${
        active ? "border-2 border-blue-400 shadow-md text-white-800" : ""
      }`}
    >
      <div className="pl-5 ">{icon}</div>
      <div className="text-white-800 pl-2">{text}</div>
    </motion.div>
  );
}
