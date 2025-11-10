import React, { useContext } from "react";
import TitleSetter from "../Components/TitleSetter";
import { CiLink } from "react-icons/ci";
import { FaQrcode } from "react-icons/fa6";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";

const QR_Prop = ({ selectedComponent, handlePropChange }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <TitleSetter
        compName={selectedComponent.type}
        handlePropChange={handlePropChange}
        defaultValue={selectedComponent.props?.title}
      />
      <label
        className={`text-lg flex items-center gap-2 font-bold ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <CiLink size={25} />
        {t("EditProps.QR_Prop.Link")}
      </label>
      <input
        value={selectedComponent.props?.value || ""}
        onChange={(e) => handlePropChange("value", e.target.value)}
        placeholder={t("EditProps.QR_Prop.Placeholder")}
        className="w-full border rounded-md px-3 py-2 outline-none"
      />

      <label
        className={`text-lg flex items-center gap-2 font-bold ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <FaQrcode size={25} />
        {t("EditProps.QR_Prop.Type")}
      </label>
      <select
        value={selectedComponent.props?.type || "qr"}
        onChange={(e) => handlePropChange("type", e.target.value)}
        className="w-full border rounded-md px-3 py-2 outline-none"
      >
        <option value="qr">QR Code</option>
        <option value="bar">Barcode</option>
      </select>
    </div>
  );
};

export default QR_Prop;
