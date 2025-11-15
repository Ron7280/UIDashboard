import React, { useContext, useState } from "react";
import { PiNotePencilFill } from "react-icons/pi";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";

const TitleSetter = ({ compName, handlePropChange, defaultValue = "" }) => {
  const [title, setTitle] = useState(defaultValue || "");
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2 mt-3">
      <div className="flex flex-col  gap-2">
        <div
          className={`text-lg flex items-center gap-2 font-bold ${
            changeTheme ? "text-white" : ""
          }`}
        >
          <PiNotePencilFill size={25} />
          {t("TitleSetter.Title")} :
        </div>
        <input
          placeholder={t("TitleSetter.Placeholder")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="outline-none border px-3 py-2 rounded-lg font-semibold flex-1"
        />
      </div>
      <button
        type="button"
        className={`mt-2 px-4 py-2 ${
          changeTheme ? "bg-mainColor2 " : "bg-mainColor "
        }  text-white rounded-lg font-semibold `}
        onClick={() => {
          handlePropChange("title", title);
          setTitle("");
        }}
      >
        {t("TitleSetter.Set")}
      </button>
    </div>
  );
};

export default TitleSetter;
