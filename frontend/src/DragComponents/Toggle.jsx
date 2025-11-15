import React, { useContext, useEffect, useState } from "react";
import {
  Change_Language_context,
  Change_Theme_context,
  Stop_Timer_context,
  Toggle_context,
} from "../Contexts";

const Toggle = ({ props, handlePropChange }) => {
  const [toggle, setToggle] = useContext(Toggle_context);
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [changeLanguage, setChangeLanguage] = useContext(
    Change_Language_context
  );
  const [stopTimer, setStopTimer] = useContext(Stop_Timer_context);
  const [localChecked, setLocalChecked] = useState(
    props.checked ?? changeTheme ?? false
  );

  useEffect(() => {
    if (props.actionType === "changeTheme") {
      setLocalChecked(changeTheme);
    } else {
      setLocalChecked(props.checked ?? false);
    }
  }, [props.checked, changeTheme, props.actionType]);

  const handleClick = () => {
    const newValue = !localChecked;
    setLocalChecked(newValue);
    handlePropChange("checked", newValue);
    setToggle({ active: newValue, targetTitle: props.title });

    if (props.actionType === "changeTheme") {
      setChangeTheme(newValue);
    }
    if (props.actionType === "changeLanguage") {
      setChangeLanguage({
        status: !props.status,
        lang1: props.lang1,
        lang2: props.lang2,
      });
    }
    if (props.actionType === "stopTimer") {
      setStopTimer(!stopTimer);
    }
  };

  return (
    <div
      title={props.title}
      className="flex cursor-pointer select-none items-center"
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={localChecked}
          onChange={handleClick}
          className="sr-only"
        />

        <div
          className={`box block h-7 w-14 rounded-full transition-colors duration-300 ${
            localChecked
              ? changeTheme
                ? "bg-lightTeal"
                : "bg-lightIndigo"
              : "bg-gray-300"
          }`}
        ></div>

        <div
          className={`absolute left-1 top-1 flex h-5 w-6 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${
            localChecked ? "translate-x-full" : ""
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Toggle;
