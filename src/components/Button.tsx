import { ReactElement } from "react";
import { motion } from "motion/react";
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
const defaultStyle =
  " sm:py-2 sm:px:5 py-1 px-6 rounded-lg flex items-center gap-2";

export function Button({
  variant,
  text,
  startIcon,
  fullWidth,
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 0.95 }}
      transition={{ duration: 0.09 }}
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
