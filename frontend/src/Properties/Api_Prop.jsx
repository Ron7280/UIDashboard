// src/Props/API_Prop.js
import React, { useContext, useState } from "react";
import TitleSetter from "../Components/TitleSetter";
import { VscJson } from "react-icons/vsc";
import { VscSymbolMethod } from "react-icons/vsc";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";

const API_Prop = ({ selectedComponent, handlePropChange }) => {
  const [tempApi, setTempApi] = useState(selectedComponent.props?.api || "");
  const [tempMethod, setTempMethod] = useState(
    selectedComponent.props?.method || "GET"
  );
  const [tempBody, setTempBody] = useState(selectedComponent.props?.body || "");
  const [changeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();
  const applyApiChange = () => {
    handlePropChange("api", tempApi);
    handlePropChange("method", tempMethod);
    handlePropChange("body", tempBody);
  };

  const methodsWithBody = ["POST", "PUT", "PATCH", "DELETE"];

  return (
    <div className="space-y-3">
      <TitleSetter
        compName={selectedComponent.type}
        handlePropChange={handlePropChange}
        defaultValue={selectedComponent.props?.title}
      />

      <label
        className={`flex items-center gap-2 text-lg font-bold ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <VscJson size={25} />
        {t("EditProps.API_Props.Set")}
      </label>

      <input
        value={tempApi}
        onChange={(e) => setTempApi(e.target.value)}
        placeholder={t("EditProps.API_Props.Placeholder")}
        className="w-full border rounded-md px-3 py-2 outline-none"
      />

      <label
        className={`flex items-center gap-2 text-lg font-bold ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <VscSymbolMethod size={25} />
        {t("EditProps.API_Props.Method")}
      </label>

      <select
        value={tempMethod}
        onChange={(e) => setTempMethod(e.target.value)}
        className="w-full border rounded-md px-3 py-2 outline-none"
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
        <option value="PATCH">PATCH</option>
      </select>

      {methodsWithBody.includes(tempMethod) && (
        <>
          <label
            className={`text-lg font-bold ${changeTheme ? "text-white" : ""}`}
          >
            Body (JSON)
          </label>
          <textarea
            value={tempBody}
            onChange={(e) => setTempBody(e.target.value)}
            placeholder='{"key":"value"}'
            className="w-full border rounded-md px-3 py-2 outline-none h-28"
          />
        </>
      )}

      <button
        onClick={applyApiChange}
        className={`w-full ${
          changeTheme
            ? "bg-SecondryTeal hover:bg-SecondryTeal"
            : "bg-lightIndigo hover:bg-mainColor"
        } text-white font-semibold rounded-md py-2`}
      >
        {t("EditProps.API_Props.SetBTN")}
      </button>
    </div>
  );
};

export default API_Prop;
