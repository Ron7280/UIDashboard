import React, { useContext, useEffect, useState } from "react";
import { Change_Theme_context } from "../Contexts";

const Slider = ({ value: initial = 50, onChange }) => {
  const [value, setValue] = useState(initial);
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);

  useEffect(() => setValue(initial), [initial]);

  return (
    <div className="w-full flex items-center gap-4">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => {
          const newVal = Number(e.target.value);
          setValue(newVal);
          onChange?.(newVal);
        }}
        className={`w-full cursor-pointer outline-none ${
          changeTheme ? "accent-lightTeal" : "accent-lightIndigo"
        } `}
      />
      <div
        className={`text-sm font-medium w-10 text-right ${
          changeTheme ? "text-white" : ""
        }`}
      >
        {value}%
      </div>
    </div>
  );
};

export default Slider;
