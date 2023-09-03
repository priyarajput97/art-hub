import React from "react";

const Input = ({
  value,
  setValue,
  placeholder,
  classes,
  type,
}: {
  value?: string | number;
  setValue?: any;
  placeholder: string;
  classes?: string;
  type: string;
}) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={`w-28 bg-slate-200 dark:bg-stone-900 p-2 border border-gray-500 focus:outline focus:outline-gray-500 rounded text-sm ${classes}`}
    />
  );
};

export default Input;
