import React, { useContext } from "react";
import TitleSetter from "../Components/TitleSetter";
import { AiFillInteraction } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { Change_Theme_context } from "../Contexts";

const Sort_Prop = ({ components, selectedComponent, handlePropChange }) => {
  const { t } = useTranslation();

  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
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
        <AiFillInteraction size={25} />
        {t("EditProps.Video_Prop.InteractWith")}
      </label>

      <select
        className="border rounded-md px-3 py-2 w-full outline-none"
        value={selectedComponent.props?.targetId || ""}
        onChange={(e) => {
          const selectedId = e.target.value;
          const targetComp = components.find((c) => c.id === selectedId);
          handlePropChange("targetId", selectedId);
          handlePropChange("InteractWith", targetComp?.props?.title || "");
        }}
      >
        <option value="">{t("EditProps.Video_Prop.Select")}</option>
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

export default Sort_Prop;
