import React, { useContext } from "react";
import TitleSetter from "../Components/TitleSetter";
import { FaImage } from "react-icons/fa6";
import { IoMdLink } from "react-icons/io";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";

const Image_Prop = ({ selectedComponent, handlePropChange }) => {
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
        <IoMdLink size={25} />
        {t("EditProps.Image_Prop.Path")}
      </div>
      <input
        value={selectedComponent.props?.src || ""}
        onChange={(e) => handlePropChange("src", e.target.value)}
        className="w-full border rounded-md px-3 font-semibold py-2 outline-none"
      />

      <div
        className={`text-lg font-bold mt-4 flex items-center gap-2 ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <FaImage size={25} />
        {t("EditProps.Image_Prop.Choose")}
      </div>
      <div className="relative w-full ">
        <input
          type="file"
          accept="image/*"
          id="fileUpload"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (ev) =>
                handlePropChange("path", ev.target.result);
              reader.readAsDataURL(file);
            }
          }}
          className="absolute inset-0 opacity-0 cursor-pointer z-10 outline-none"
        />

        <button
          type="button"
          className={`w-full px-4 py-2 cursor-pointer rounded-md 
             text-white font-semibold ${
               changeTheme ? "bg-mainColor2 " : "bg-mainColor "
             }`}
        >
          {t("EditProps.Image_Prop.Image")}
        </button>
      </div>
    </div>
  );
};

export default Image_Prop;
