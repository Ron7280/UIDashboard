import React, { useContext, useState } from "react";
import TitleSetter from "../Components/TitleSetter";
import { LuLoader } from "react-icons/lu";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";
import Loader from "../DragComponents/Loader";

const Loader_Prop = ({ selectedComponent, handlePropChange }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [loaderType, setLoaderType] = useState("spinner");
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <TitleSetter
        compName={selectedComponent.type}
        handlePropChange={handlePropChange}
        defaultValue={selectedComponent.props?.title}
      />
      <label
        className={`text-lg flex items-center gap-4 font-bold ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <Loader type={loaderType} size={25} />
        {t("EditProps.Loader_Prop.Type")}
      </label>
      <select
        value={selectedComponent.props?.type || "spinner"}
        onChange={(e) => {
          setLoaderType(e.target.value),
            handlePropChange("type", e.target.value);
        }}
        className="w-full border rounded-md px-3 py-2 font-semibold outline-none"
      >
        <option value="spinner">Spinner</option>
        <option value="dots">Dots</option>
        <option value="pulse">Pulse</option>
        <option value="bars">Bars</option>
        <option value="ring">Ring</option>
      </select>
    </div>
  );
};

export default Loader_Prop;
