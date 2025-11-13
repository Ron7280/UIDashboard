import React, { useContext } from "react";
import TitleSetter from "../Components/TitleSetter";
import { PiTimerFill } from "react-icons/pi";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";

const CountdownTimer_Prop = ({ selectedComponent, handlePropChange }) => {
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
        className={`text-lg flex items-center gap-2 font-bold ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <PiTimerFill size={25} />
        {t("EditProps.CountdownTimer_Prop.Start")}
      </div>
      <div className="flex gap-2 items-center">
        {["hours", "minutes", "seconds"].map((unit) => (
          <input
            key={unit}
            type="number"
            min={unit === "hours" ? 0 : 0}
            max={unit === "hours" ? 23 : 59}
            value={
              selectedComponent.props?.tempStartTime?.[unit] ??
              selectedComponent.props?.startTime?.[unit] ??
              0
            }
            onChange={(e) =>
              handlePropChange("tempStartTime", {
                ...selectedComponent.props.tempStartTime,
                [unit]: Number(e.target.value),
              })
            }
            className="w-16 border text-gray-700 font-semibold rounded-md px-2 py-1 outline-none"
          />
        ))}

        <button
          onClick={() => {
            const newStart =
              selectedComponent.props.tempStartTime ??
              selectedComponent.props.startTime;
            handlePropChange("startTime", newStart);
            handlePropChange("resetSignal", {});
          }}
          className="bg-green-500 shadow-black shadow-md text-white px-3 py-1 font-semibold rounded-lg"
        >
          {t("EditProps.CountdownTimer_Prop.Set")}
        </button>
      </div>

      <button
        onClick={() => handlePropChange("resetSignal", {})}
        className={`mt-2 transition text-white px-3 py-1 rounded-lg font-semibold
           ${changeTheme ? "bg-mainColor2 " : "bg-mainColor "} `}
      >
        {t("EditProps.CountdownTimer_Prop.ResetTimer")}
      </button>
    </div>
  );
};

export default CountdownTimer_Prop;
