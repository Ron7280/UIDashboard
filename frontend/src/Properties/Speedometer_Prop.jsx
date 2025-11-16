import React, { useContext, useEffect, useState } from "react";
import { IoSpeedometer } from "react-icons/io5";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";
import { API } from "../API_URL";

const Speedometer_Prop = ({ selectedComponent, handlePropChange }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [cpuData, setCpuData] = useState({});
  const { t } = useTranslation();

  const fetchCpuData = async () => {
    try {
      const res = await fetch(`${API}/dashboard/cpu`);
      const json = await res.json();
      setCpuData(json.data ?? json);
    } catch (err) {
      console.error("Failed to fetch CPU data:", err);
    }
  };

  useEffect(() => {
    fetchCpuData();
  }, []);

  const flattenData = (obj, prefix = "") =>
    Object.entries(obj || {}).flatMap(([key, value]) => {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        return flattenData(value, `${prefix}${key}.`);
      }
      const numericValue = Number(value);
      if (!isNaN(numericValue)) {
        return [{ key: `${prefix}${key}`, value: numericValue }];
      }
      return [];
    });

  const options = flattenData(cpuData);

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`flex items-center gap-2 font-bold text-lg ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <IoSpeedometer size={25} /> {t("EditProps.Speedometer_Prop.Select")}
      </div>
      <select
        value={selectedComponent.props?.speed || "speed"}
        onChange={(e) => handlePropChange("speed", e.target.value)}
        className="w-full border rounded-md px-3 py-2 font-semibold outline-none"
      >
        {options.map((opt) => (
          <option key={opt.key} value={opt.value}>
            {opt.key} ({opt.value})
          </option>
        ))}
      </select>
    </div>
  );
};

export default Speedometer_Prop;
