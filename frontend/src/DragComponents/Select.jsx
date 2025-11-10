import React, { useContext } from "react";
import { Change_Theme_context } from "../Contexts";

const Select = ({ props, handlePropChange, DEFAULT_PROPS }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  return (
    <select
      className={`w-full h-full border rounded-md px-2 py-1 outline-none shadow-md  ${
        changeTheme ? "shadow-lightTeal" : "shadow-mainColor"
      } `}
      value={props.selected ?? ""}
      onChange={(e) => handlePropChange("selected", e.target.value)}
    >
      {(props.options ?? DEFAULT_PROPS.Select.options).map((o, i) => (
        <option key={i} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
};

export default Select;
