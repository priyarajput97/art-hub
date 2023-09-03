import React from "react";

const ButtonOutline = ({
  title,
  classes,
}: {
  title: string;
  classes?: string;
}) => {
  return (
    <button
      className={`border border-1 border-pink-700 px-5 py-1 rounded hover:text-pink-700 transition text-sm ${classes}`}
    >
      {title}
    </button>
  );
};

export default ButtonOutline;
