import React, { useContext, useState } from "react";
import TitleSetter from "../Components/TitleSetter";
import { CiText } from "react-icons/ci";
import { IoIosColorPalette } from "react-icons/io";
import { Change_Theme_context, Set_MainName_context } from "../Contexts";
import { useTranslation } from "react-i18next";
import { BiSolidPurchaseTag } from "react-icons/bi";

const Text_Prop = ({ selectedComponent, handlePropChange }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [set_MainName, setSet_MainName] = useContext(Set_MainName_context);
  const [textAs, setTextAs] = useState("");
  const { t } = useTranslation();

  const UseText = ({ As }) => {
    if (As === "MainName") {
      setSet_MainName(selectedComponent.props?.text);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <TitleSetter
        compName={selectedComponent.type}
        handlePropChange={handlePropChange}
        defaultValue={selectedComponent.props?.title}
      />

      <label
        className={`text-lg flex items-center gap-2 font-bold ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <CiText size={25} />
        {t("EditProps.Text_Prop.Text")}
      </label>
      <input
        value={selectedComponent.props?.text || ""}
        onChange={(e) => handlePropChange("text", e.target.value)}
        className="w-full border rounded-md px-3 py-2 outline-none"
      />

      <label
        className={`text-lg flex items-center gap-2 font-bold ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <IoIosColorPalette size={25} />
        {t("EditProps.Text_Prop.Color")}
      </label>
      <input
        type="color"
        value={selectedComponent.props?.color || "#3B82F6"}
        onChange={(e) => handlePropChange("color", e.target.value)}
        className="w-[50%] h-14 cursor-pointer outline-none"
      />

      <label
        className={`text-lg flex items-center gap-2 font-bold ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <BiSolidPurchaseTag className="rotate-90" size={25} />
        {t("EditProps.Text_Prop.SetAs")}
      </label>
      <select
        value={selectedComponent.props?.setAs || ""}
        onChange={(e) => {
          handlePropChange("setAs", e.target.value);
          setTextAs(e.target.value);
        }}
        className="w-full border rounded-md px-3 py-2 outline-none"
      >
        <option value="" disabled>
          {t("EditProps.Text_Prop.Select")}
        </option>
        <option value="MainName">{t("EditProps.Text_Prop.MainName")} </option>
      </select>

      <button
        type="button"
        className={`mt-2 px-4 py-2 ${
          changeTheme
            ? "bg-mainColor2 hover:bg-SecondryTeal"
            : "bg-lightIndigo hover:bg-mainColor"
        } text-white rounded-lg font-bold`}
        onClick={() => UseText({ As: selectedComponent.props?.setAs })}
      >
        {t("EditProps.Text_Prop.Set")}
      </button>
    </div>
  );
};

export default Text_Prop;
