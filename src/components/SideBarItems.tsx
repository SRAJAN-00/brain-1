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
      whileTap={{ scale: 1, transition: { duration: 0.3 } }}
      
      className={`flex gap-5 pl-2 mt-2 items-center p-4 text-black hover:  rounded-lg  cursor-pointer  transition-all duration-300 ease-in-out focus:outline-none   ${
        active ? " text-neutral-800" : "text-neutral-500 hover:none"
      }`}
    >
      <div className="pl-5 ">{icon}</div>
      <div className=" ">{text}</div>
    </motion.div>
  );
}
