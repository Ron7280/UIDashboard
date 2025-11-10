import React, { useContext, useEffect, useState } from "react";
import TitleSetter from "../Components/TitleSetter";
import { FaChartPie } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { TbAxisY } from "react-icons/tb";
import { TbAxisX } from "react-icons/tb";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";

const Chart_Prop = ({ selectedComponent, handlePropChange, selectedIndex }) => {
  const [tempDataSource, setTempDataSource] = useState("");
  const [chartKeys, setChartKeys] = useState([]);
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();

  useEffect(() => {
    setTempDataSource(selectedComponent?.props?.dataSource ?? "");
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedComponent?.props?.dataSource) {
      fetch(selectedComponent.props.dataSource)
        .then((res) => res.json())
        .then((data) => {
          const arr = Array.isArray(data) ? data : data.data || [];
          if (arr.length > 0) {
            setChartKeys(Object.keys(arr[0]));
          }
        })
        .catch(() => setChartKeys([]));
    }
  }, [selectedComponent?.props?.dataSource]);

  return (
    <div className="space-y-3">
      <TitleSetter
        compName={selectedComponent.type}
        handlePropChange={handlePropChange}
        defaultValue={selectedComponent.props?.title}
      />

      <div>
        <label
          className={`${
            changeTheme ? "text-white" : ""
          } text-lg flex items-center gap-2 pb-3 font-bold`}
        >
          <FaChartPie size={25} />
          {t("EditProps.Chat_Props.Type")}
        </label>
        <select
          value={selectedComponent.props?.type || "bar"}
          onChange={(e) => handlePropChange("type", e.target.value)}
          className="w-full border rounded-md px-3 py-2 outline-none"
        >
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
          <option value="doughnut">Doughnut</option>
          <option value="polarArea">Polar Area</option>
          <option value="radar">Radar</option>
        </select>
      </div>

      <div>
        <label
          className={`${
            changeTheme ? "text-white" : ""
          } text-lg flex items-center gap-2 pb-3 font-bold`}
        >
          <IoIosLink size={25} /> {t("EditProps.Chat_Props.Link")}
        </label>
        <input
          type="text"
          value={tempDataSource}
          onChange={(e) => setTempDataSource(e.target.value)}
          placeholder={t("EditProps.Chat_Props.Placeholder")}
          className="w-full border rounded-md px-3 py-2 outline-none"
        />
        <button
          type="button"
          className={`mt-3 px-4 py-2  text-white rounded-md 
            ${
              changeTheme
                ? "bg-SecondryTeal hover:bg-SecondryTeal"
                : "bg-lightIndigo hover:bg-mainColor"
            } `}
          onClick={() => handlePropChange("dataSource", tempDataSource)}
        >
          {t("EditProps.Chat_Props.Set")}
        </button>
      </div>

      {chartKeys.length > 0 && (
        <>
          <div>
            <label
              className={`${
                changeTheme ? "text-white" : ""
              } text-lg flex items-center gap-2 pb-3 font-bold`}
            >
              <TbAxisX size={25} />
              {t("EditProps.Chat_Props.X_Label")}
            </label>
            <select
              value={selectedComponent.props.labelKey || ""}
              onChange={(e) => handlePropChange("labelKey", e.target.value)}
              className="w-full border rounded-md px-3 py-2 outline-none"
            >
              <option value="">{t("EditProps.Chat_Props.Select")}</option>
              {chartKeys.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`${
                changeTheme ? "text-white" : ""
              } text-lg flex items-center gap-2 pb-3 font-bold`}
            >
              <TbAxisY size={25} />
              {t("EditProps.Chat_Props.Y_Label")}
            </label>
            <select
              multiple
              value={selectedComponent.props.valueKeys || []}
              onChange={(e) =>
                handlePropChange(
                  "valueKeys",
                  Array.from(e.target.selectedOptions, (opt) => opt.value)
                )
              }
              className="w-full border rounded-md px-3 py-2 h-32 outline-none"
            >
              {chartKeys.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
            <div
              className={`text-sm ${
                changeTheme ? "text-white" : "text-gray-500 "
              }`}
            >
              {t("EditProps.Chat_Props.Tip")}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chart_Prop;
