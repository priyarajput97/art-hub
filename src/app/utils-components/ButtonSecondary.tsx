import React from "react";

const ButtonSecondary = ({
  title,
  classes,
  onClick,
}: {
  title: string;
  classes?: string;
  onClick?: any;
}) => {
  return (
    <button
      className={`border w-32 py-2 rounded hover:bg-gray-500 hover:text-white transition ease ${classes}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ButtonSecondary;
