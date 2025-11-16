import React, { useContext } from "react";
import { Change_Theme_context } from "../Contexts";

const Avatar = ({ src, name }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const Username = localStorage.getItem("username");
  return (
    <div
      className={`shadow-md w-full h-full pl-2 pr-2 rounded-xl ${
        changeTheme ? "shadow-lightTeal" : "shadow-mainColor"
      } flex items-center gap-3`}
    >
      <img src={src} className="w-12 h-12 rounded-full border object-cover" />
      <div
        className={`font-medium ${
          changeTheme ? "text-white" : "text-gray-700 "
        }`}
      >
        {Username || name}
      </div>
    </div>
  );
};

export default Avatar;
