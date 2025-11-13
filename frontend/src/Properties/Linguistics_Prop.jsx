import React, { useContext } from "react";
import TitleSetter from "../Components/TitleSetter";
import { GrAction } from "react-icons/gr";
import { Change_Theme_context } from "../Contexts";
import { MdGTranslate } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { AiFillInteraction } from "react-icons/ai";

const Linguistics_Prop = ({
  components,
  selectedComponent,
  handlePropChange,
}) => {
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

      <div
        className={`text-lg flex items-center gap-2 font-bold ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <MdGTranslate size={25} />
        {t("EditProps.Linguistics_Prop.TranslateTo")}
      </div>

      <select
        onChange={(e) => handlePropChange("translateTo", e.target.value)}
        value={selectedComponent.props?.translateTo || ""}
        className="w-full border rounded-md px-3 py-2 font-semibold outline-none"
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

      <div
        className={`text-lg flex items-center gap-2 font-bold ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <AiFillInteraction size={25} />
        {t("EditProps.Linguistics_Prop.InteractWith")}
      </div>

      <select
        className="border rounded-md px-3 py-2 w-full font-semibold outline-none"
        value={selectedComponent.props?.targetId || ""}
        onChange={(e) => {
          const selectedId = e.target.value;
          const targetComp = components.find((c) => c.id === selectedId);
          handlePropChange("targetId", selectedId);
          handlePropChange("InteractWith", targetComp?.props?.title || "");
        }}
      >
        <option value="">{t("EditProps.Sort_Prop.Select")}</option>
        {components
          .filter(
            (compo) =>
              compo.id !== selectedComponent.id && compo?.type === "Notepad"
          )
          .map((compo) => (
            <option key={compo.id} value={compo.id}>
              {compo.type}
              {compo.props?.title ? ` - ${compo.props.title}` : " - no title"}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Linguistics_Prop;
