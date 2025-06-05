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
        className="py-4 pl-3 border rounded-xl w-full max-w-[450px] sm:max-w-[200px] mr-3 shadow-sm mb-5 mt-2 transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500 hover:border-blue-500 hover:shadow-md"
      />
    </div>
  );
}
