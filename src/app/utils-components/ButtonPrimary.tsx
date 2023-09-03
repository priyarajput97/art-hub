import React from "react";

const ButtonPrimary = ({
  title,
  classes,
  onClick,
  disabled,
}: {
  title: string;
  classes?: string;
  onClick?: any;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-pink-700 text-white border border-pink-700 w-32 py-2 rounded hover:bg-pink-800 disabled:hover:bg-pink-700 transition ease ${classes}`}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default ButtonPrimary;
