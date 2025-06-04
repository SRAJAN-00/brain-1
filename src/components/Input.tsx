import React from "react";

interface InputProps {
  placeholder: string;
  reference: React.Ref<HTMLInputElement>;
}
export function Input({ reference, placeholder }: InputProps) {
  return (
    <div>
      <input
        ref={reference}
        type="text"
        placeholder={placeholder}
        className=" py-4 pl-3 border rounded-md w-[550px] mr-3 shadow-sm  mb-5 mt5 rounded-xl transition-all duration-300 ease-in-out focus:outline-none hover:border-blue-500 hover:shadow-md"
      />
    </div>
  );
}
