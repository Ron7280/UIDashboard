import React, { useContext } from "react";
import TitleSetter from "../Components/TitleSetter";
import { GrAction } from "react-icons/gr";
import { Change_Theme_context } from "../Contexts";
import { MdGTranslate } from "react-icons/md";
import { useTranslation } from "react-i18next";

const Linguistics_Prop = ({ selectedComponent, handlePropChange }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();
  const languages = [
    "English",
    "Arabic",
    "Spanish",
    "French",
    "German",
    "Japanese",
    "Korean",
    "Italian",
  ];

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
        <MdGTranslate size={25} />
        {t("EditProps.Linguistics_Prop.TranslateTo")}
      </label>

      <select
        onChange={(e) => handlePropChange("translateTo", e.target.value)}
        value={selectedComponent.props?.translateTo || ""}
        className="w-full border rounded-md px-3 py-2 outline-none"
      >
        <option value="" disabled>
          {t("EditProps.Linguistics_Prop.Select")}
        </option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Linguistics_Prop;
