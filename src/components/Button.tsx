import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
}
//prettier-ignore

const variantClasses = {
  "primary": "bg-black text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg ",
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
    <button
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
    </button>
  );
}
