import React, { useContext, useEffect, useState } from "react";
import { Change_Theme_context, Check_Box_context } from "../Contexts";
import { useTranslation } from "react-i18next";

const Checkbox = ({ props, handlePropChange = () => {} }) => {
  const [check_Box, setCheck_Box] = useContext(Check_Box_context);
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [localChecked, setLocalChecked] = useState(props.checked ?? false);
  const { t } = useTranslation();

  const isTargeted = check_Box?.targetTitle === props.title;

  useEffect(() => {
    if (isTargeted) {
      setLocalChecked(check_Box.active);
      handlePropChange("checked", check_Box.active);
    }
  }, [check_Box, isTargeted]);

  const handleChange = (e) => {
    const newValue = e.target.checked;
    setLocalChecked(newValue);
    handlePropChange("checked", newValue);
    setCheck_Box({ active: newValue, targetTitle: props.title });
  };

  return (
    <label
      title={props.title}
      className="inline-flex justify-center items-center gap-2 w-full h-full"
    >
      <input
        type="checkbox"
        checked={localChecked}
        onChange={handleChange}
        className="w-4 h-4 outline-none"
      />
      <div className={`${changeTheme ? "text-white" : ""}`}>
        {localChecked
          ? t("DragCompo.Checkbox.Checked")
          : t("DragCompo.Checkbox.NotChecked")}
      </div>
    </label>
  );
};

export default Checkbox;
