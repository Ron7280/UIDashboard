import React, { useContext } from "react";
import TitleSetter from "../Components/TitleSetter";
import { FaBarsProgress } from "react-icons/fa6";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";

const ProgressBar_Prop = ({ selectedComponent, handlePropChange }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <TitleSetter
        compName={selectedComponent.type}
        handlePropChange={handlePropChange}
        defaultValue={selectedComponent.props?.title}
      />
      <div
        className={`text-lg flex items-center gap-2 pt-3 font-bold ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <FaBarsProgress size={25} />
        {t("EditProps.ProgressBar_Prop.Value")}
      </div>
      <input
        type="number"
        value={selectedComponent.props?.value ?? 0}
        min={0}
        max={100}
        onChange={(e) =>
          handlePropChange(
            "value",
            Math.max(0, Math.min(100, Number(e.target.value || 0)))
          )
        }
        className="w-full border rounded-md px-3 py-2 font-semibold outline-none"
      />
    </div>
  );
};

export default ProgressBar_Prop;
