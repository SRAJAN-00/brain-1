import { ReactElement } from "react";
import {motion} from"motion/react";
interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
}
//prettier-ignore

const variantClasses = {
  "primary": "bg-purple-600 text-white transition-all duration-300 hover:bg-pruple-700  font-bold hover:shadow-lg ",
  "secondary": "bg-white" ,
};
const defaultStyle = " py-2 px-5 border rounded-lg flex items-center gap-2 ";
export function Button({
  variant,
  text,
  startIcon,
  fullWidth,
  onClick,
}: ButtonProps) {
  return (
    <motion.button
    whileHover={{scale:0.95}
  }
  transition={{duration:0.09}}
      className={
        variantClasses[variant] +
        "" +
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
