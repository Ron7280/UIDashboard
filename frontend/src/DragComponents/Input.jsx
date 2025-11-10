import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Change_Theme_context } from "../Contexts";

const Input = ({ props, DEFAULT_PROPS, handlePropChange }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();
  return (
    <input
      type="text"
      placeholder={
        t("DragCompo.Input.Placeholder") ||
        props.placeholder ||
        DEFAULT_PROPS.Input.placeholder
      }
      className={`border px-3 py-2 outline-none rounded-md w-full h-full
        shadow-md ${changeTheme ? "shadow-lightTeal" : "shadow-mainColor"}`}
      value={props.value || ""}
      onChange={(e) => handlePropChange("value", e.target.value)}
    />
  );
};

export default Input;
