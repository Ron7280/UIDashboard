import React, { useContext } from "react";
import TitleSetter from "../Components/TitleSetter";
import { FaFont } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoIosColorPalette } from "react-icons/io";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";

const DigitalClock_Prop = ({ selectedComponent, handlePropChange }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();

  return (
    <div className="space-y-3 ">
      <TitleSetter
        compName={selectedComponent.type}
        handlePropChange={handlePropChange}
        defaultValue={selectedComponent.props?.title}
      />
      <div className="flex flex-col  gap-2">
        <label
          className={`text-lg flex items-center gap-2 font-bold ${
            changeTheme ? "text-white" : ""
          }`}
        >
          <IoIosColorPalette size={30} />
          {t("EditProps.DigitalClock_Prop.Color")}
        </label>
        <input
          type="color"
          value={selectedComponent.props?.color || "#374151"}
          onChange={(e) => handlePropChange("color", e.target.value)}
          className="w-[50%] h-14 cursor-pointer outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          className={`text-lg flex items-center gap-2 font-bold ${
            changeTheme ? "text-white" : ""
          }`}
        >
          <FaFont size={25} />
          {t("EditProps.DigitalClock_Prop.Size")}
        </label>
        <input
          type="number"
          value={parseInt(selectedComponent.props?.fontSize) || 32}
          onChange={(e) => handlePropChange("fontSize", e.target.value + "px")}
          className="w-full border rounded-md px-3 py-2 outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          className={`text-lg flex items-center gap-2 font-bold ${
            changeTheme ? "text-white" : ""
          }`}
        >
          <FaClockRotateLeft size={25} />
          {t("EditProps.DigitalClock_Prop.Format")}
        </label>
        <select
          value={selectedComponent.props?.format || "24h"}
          onChange={(e) => handlePropChange("format", e.target.value)}
          className="w-full border rounded-md px-3 py-2 outline-none"
        >
          <option value="24h">{t("EditProps.DigitalClock_Prop.24Hour")}</option>
          <option value="12h">{t("EditProps.DigitalClock_Prop.12Hour")}</option>
        </select>
      </div>
    </div>
  );
};

export default DigitalClock_Prop;
