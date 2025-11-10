import React, { useContext } from "react";
import TitleSetter from "../Components/TitleSetter";
import { CiText } from "react-icons/ci";
import { IoIosColorPalette, IoIosNotifications } from "react-icons/io";
import { AiFillInteraction } from "react-icons/ai";
import { GrAction } from "react-icons/gr";
import { FaKeyboard } from "react-icons/fa6";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";

const Button_Prop = ({ components, selectedComponent, handlePropChange }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();

  const targetComp = components.find(
    (c) => c.id === selectedComponent.props?.targetId
  );

  const isRatingTarget = targetComp?.type === "RatingStars";

  const selectoptions = [
    {
      type: "Chart",
      key_value: ["moreData"],
      text: [`${t("EditProps.Button_Props.MoreData")}`],
    },
    {
      type: "Toggle",
      key_value: ["Toggle"],
      text: [`${t("EditProps.Button_Props.Toggle")}`],
    },
    {
      type: "AI",
      key_value: ["Ask"],
      text: [`${t("EditProps.Button_Props.Ask")}`],
    },
    {
      type: "Checkbox",
      key_value: ["Check"],
      text: [`${t("EditProps.Button_Props.Check")}`],
    },
    {
      type: "RatingStars",
      key_value: ["ChangeRate"],
      text: [`${t("EditProps.Button_Props.NewRate")}`],
    },
    {
      type: "Image",
      key_value: ["Image"],
      text: [`${t("EditProps.Button_Props.ChangeImage")}`],
    },
  ];

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
        <CiText size={25} />
        {t("EditProps.Button_Props.Text")}
      </label>
      <input
        value={selectedComponent.props?.text || ""}
        onChange={(e) => handlePropChange("text", e.target.value)}
        className="w-full border rounded-md px-3 py-2 outline-none"
      />

      <label
        className={`text-lg flex items-center gap-2 font-bold ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <IoIosColorPalette size={25} />
        {t("EditProps.Button_Props.Color")}
      </label>
      <input
        type="color"
        value={selectedComponent.props?.color || "#3B82F6"}
        onChange={(e) => handlePropChange("color", e.target.value)}
        className="w-[50%] h-14 cursor-pointer outline-none"
      />

      <label
        className={`text-lg flex items-center gap-2 font-bold ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <GrAction size={25} />
        {t("EditProps.Button_Props.Action")}
      </label>
      <select
        value={selectedComponent.props?.actionType || "alert"}
        onChange={(e) => handlePropChange("actionType", e.target.value)}
        className="w-full border rounded-md px-3 py-2 outline-none"
      >
        <option value="alert">{t("EditProps.Button_Props.ShowAlert")}</option>
        <option value="link">{t("EditProps.Button_Props.OpenLink")}</option>

        {selectedComponent.props?.targetId &&
          (() => {
            if (!targetComp) return null;

            const extraOptions = [];

            const matchedOption = selectoptions.find(
              (op) => op.type === targetComp.type
            );

            if (matchedOption) {
              matchedOption.key_value.forEach((key, i) => {
                extraOptions.push(
                  <option key={key} value={key}>
                    {matchedOption.text[i]}
                  </option>
                );
              });
            }

            return extraOptions;
          })()}
      </select>
      <label
        className={`text-lg flex items-center gap-2 font-bold ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <IoIosNotifications size={25} />
        {t("EditProps.Button_Props.AlertType")}
      </label>
      <select
        onChange={(e) => {
          handlePropChange("AlertType", e.target.value || "info");
        }}
      >
        <option value="info">Info</option>
        <option value="success">Success</option>
        <option value="warning">Warning</option>
        <option value="error">Error</option>
      </select>

      <label
        className={`text-lg flex items-center gap-2 font-bold ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <FaKeyboard size={25} />
        {t("EditProps.Button_Props.ActionValue")}
      </label>

      {isRatingTarget ? (
        <input
          type="number"
          min="1"
          max="5"
          value={selectedComponent.props?.actionValue || ""}
          onChange={(e) =>
            handlePropChange(
              "actionValue",
              Math.min(5, Math.max(1, e.target.value))
            )
          }
          className="w-full border rounded-md px-3 py-2 outline-none"
        />
      ) : (
        <input
          value={selectedComponent.props?.actionValue || ""}
          onChange={(e) => handlePropChange("actionValue", e.target.value)}
          placeholder={
            selectedComponent.props?.actionType === "link"
              ? "https://example.com"
              : "Alert message"
          }
          className="w-full border rounded-md px-3 py-2 outline-none"
        />
      )}

      <label
        className={`text-lg flex items-center gap-2 font-bold ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <AiFillInteraction size={25} />
        {t("EditProps.Button_Props.InteractWith")}
      </label>
      <select
        className="border rounded-md px-3 py-2 w-full outline-none"
        value={selectedComponent.props?.targetId || ""}
        onChange={(e) => {
          const selectedId = e.target.value;
          const targetComp = components.find((c) => c.id === selectedId);
          handlePropChange("targetId", selectedId);
          handlePropChange("InteractWith", targetComp?.props?.title || "");
        }}
      >
        <option value="">{t("EditProps.Button_Props.Select")}</option>
        {components
          .filter(
            (compo) =>
              compo.id !== selectedComponent.id && compo?.type !== "Button"
          )
          .map((compo) => (
            <option key={compo.id} value={compo.id}>
              {compo.type}
              {compo.props?.title ? ` - ${compo.props.title}` : " - no title"}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Button_Prop;
