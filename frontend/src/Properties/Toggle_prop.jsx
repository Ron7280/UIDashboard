import React, { useContext } from "react";
import TitleSetter from "../Components/TitleSetter";
import { FaToggleOn } from "react-icons/fa";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";

const Toggle_prop = ({ selectedComponent, handlePropChange }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();
  const LanguagesOptions = [
    {
      title: "EN",
    },
    {
      title: "AR",
    },
    {
      title: "SP",
    },
    {
      title: "FR",
    },
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
        <FaToggleOn size={25} />
        {t("EditProps.Toggle_prop.Action")}
      </label>

      <select
        value={selectedComponent.props?.actionType}
        onChange={(e) => handlePropChange("actionType", e.target.value)}
        className="w-full border rounded-md px-3 py-2 outline-none"
      >
        <option value="toggle">{t("EditProps.Toggle_prop.Toggle")}</option>
        <option value="changeTheme">
          {t("EditProps.Toggle_prop.ChangeTheme")}
        </option>
        <option value="changeLanguage">
          {t("EditProps.Toggle_prop.ChangeLanguage")}
        </option>
        <option value="stopTimer">
          {t("EditProps.Toggle_prop.StopTimer")}
        </option>
      </select>

      {selectedComponent.props?.actionType === "changeLanguage" && (
        <>
          <label
            className={`text-lg flex items-center gap-2 font-bold ${
              changeTheme ? "text-white" : ""
            }`}
          >
            <GrLanguage size={25} /> {t("EditProps.Toggle_prop.Lang")}
          </label>

          <div className="flex gap-2">
            <select
              value={selectedComponent.props?.lang1}
              onChange={(e) => handlePropChange("lang1", e.target.value)}
              className="w-full border rounded-md px-3 py-2 outline-none"
            >
              {LanguagesOptions.map((lang, index) => (
                <option key={index} value={lang.title}>
                  {lang.title}
                </option>
              ))}
            </select>

            <select
              value={selectedComponent.props?.lang2}
              onChange={(e) => handlePropChange("lang2", e.target.value)}
              className="w-full border rounded-md px-3 py-2 outline-none"
            >
              {LanguagesOptions.map((lang, index) => (
                <option key={index} value={lang.title}>
                  {lang.title}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default Toggle_prop;
