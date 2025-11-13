import React from "react";
import TitleSetter from "../Components/TitleSetter";
import { useTranslation } from "react-i18next";
import { BsBodyText } from "react-icons/bs";

const Card_Prop = ({ selectedComponent, handlePropChange }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <TitleSetter
        compName={selectedComponent.type}
        handlePropChange={handlePropChange}
        defaultValue={selectedComponent.props?.title}
      />

      <div className=" flex  items-center gap-2 text-lg font-bold">
        <BsBodyText size={25} /> {t("EditProps.Card_Props.Content")}
      </div>
      <textarea
        value={selectedComponent.props?.content || ""}
        onChange={(e) => handlePropChange("content", e.target.value)}
        className="w-full border rounded-md px-3 font-semibold py-2 outline-none"
      />
    </div>
  );
};

export default Card_Prop;
