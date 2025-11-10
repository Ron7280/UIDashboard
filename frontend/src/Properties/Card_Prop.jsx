import React from "react";
import TitleSetter from "../Components/TitleSetter";
import { useTranslation } from "react-i18next";

const Card_Prop = ({ selectedComponent, handlePropChange }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <TitleSetter
        compName={selectedComponent.type}
        handlePropChange={handlePropChange}
        defaultValue={selectedComponent.props?.title}
      />
      <label className="text-lg font-bold">
        {t("EditProps.Card_Props.Title")}
      </label>
      <input
        value={selectedComponent.props?.title || ""}
        onChange={(e) => handlePropChange("title", e.target.value)}
        className="w-full border rounded-md px-3 py-2 outline-none"
      />
      <label className="text-lg font-bold">
        {t("EditProps.Card_Props.Content")}
      </label>
      <textarea
        value={selectedComponent.props?.content || ""}
        onChange={(e) => handlePropChange("content", e.target.value)}
        className="w-full border rounded-md px-3 py-2 outline-none"
      />
    </div>
  );
};

export default Card_Prop;
