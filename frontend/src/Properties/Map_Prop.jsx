import React, { useContext } from "react";
import TitleSetter from "../Components/TitleSetter";
import { TbWorldLatitude } from "react-icons/tb";
import { TbWorldLongitude } from "react-icons/tb";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";

const Map_Prop = ({ selectedComponent, handlePropChange }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <TitleSetter
        compName={selectedComponent.type}
        handlePropChange={handlePropChange}
        defaultValue={selectedComponent.props?.title}
      />
      <div
        className={`${
          changeTheme ? "text-white" : ""
        } text-lg flex items-center gap-2 font-bold`}
      >
        <TbWorldLatitude size={25} />
        {t("EditProps.Map_Prop.Latitude")}
      </div>
      <input
        type="number"
        value={selectedComponent.props?.latitude || 0}
        onChange={(e) =>
          handlePropChange("latitude", parseFloat(e.target.value))
        }
        className="w-full border rounded-md px-3 py-2 font-semibold outline-none"
      />

      <div
        className={`${
          changeTheme ? "text-white" : ""
        } text-lg flex items-center gap-2 font-bold`}
      >
        <TbWorldLongitude size={25} />
        {t("EditProps.Map_Prop.Longitude")}
      </div>
      <input
        type="number"
        value={selectedComponent.props?.longitude || 0}
        onChange={(e) =>
          handlePropChange("longitude", parseFloat(e.target.value))
        }
        className="w-full border rounded-md px-3 py-2 font-semibold outline-none"
      />

      <div
        className={`text-sm ${changeTheme ? "text-white" : "text-gray-500"}`}
      >
        {t("EditProps.Map_Prop.Tip")}
      </div>
    </div>
  );
};

export default Map_Prop;
