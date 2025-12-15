import { ReactElement } from "react";
import { easeInOut, motion } from "motion/react";
interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
}
//prettier-ignore

const variantClasses = {
  "primary": "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white transition-all duration-300 hover:from-purple-600 hover:via-purple-700 hover:to-purple-800 font-bold hover:shadow-lg",
  "secondary": "bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600  ",
};
const defaultStyle = "  py-[5px] px-3 rounded-lg flex items-center gap-2";

export function Button({
  variant,
  text,
  startIcon,
  fullWidth,
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      transition={{ duration: 0.02, ease: easeInOut }}
      className={
        variantClasses[variant] +
        " " +
        defaultStyle +
        `${fullWidth ? " w-full flex justify-center items-center" : ""}`
      }
      onClick={onClick}
    >
      {startIcon}
      {text}
    </motion.button>
  );
}
