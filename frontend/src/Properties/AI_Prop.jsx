import React, { useContext } from "react";
import TitleSetter from "../Components/TitleSetter";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";

const AI_Prop = ({ selectedComponent, handlePropChange }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <TitleSetter
        compName={selectedComponent.type}
        handlePropChange={handlePropChange}
        defaultValue={selectedComponent.props?.title}
      />
      {selectedComponent.props?.response ? (
        <>
          <label
            className={`text-lg flex items-center gap-2 font-bold  ${
              changeTheme ? "text-white" : ""
            } `}
          >
            <RiQuestionAnswerFill size={20} />
            {t("EditProps.AI_Props.Answer")}
          </label>
          <div className="w-full border font-semibold rounded-md px-3 py-2 bg-gray-100 resize-none">
            {selectedComponent.props?.response}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default AI_Prop;
