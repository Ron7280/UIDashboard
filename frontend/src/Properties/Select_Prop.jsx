import React, { useContext } from "react";
import TitleSetter from "../Components/TitleSetter";
import { BsMenuDown } from "react-icons/bs";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";

const Select_Prop = ({
  DEFAULT_PROPS,
  selectedComponent,
  handlePropChange,
}) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <TitleSetter
        compName={selectedComponent.type}
        handlePropChange={handlePropChange}
        defaultValue={selectedComponent.props?.title}
      />
      <label
        className={`${
          changeTheme ? "text-white" : ""
        } text-lg flex items-center gap-2 pt-3 font-bold`}
      >
        <BsMenuDown size={25} />
        {t("EditProps.Select_Prop.Options")}
      </label>
      <div className="space-y-1">
        {(selectedComponent.props.options ?? DEFAULT_PROPS.Select.options).map(
          (opt, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                className="border px-2 py-1 font-semibold rounded w-full outline-none"
                value={opt}
                onChange={(e) => {
                  const newOptions = [
                    ...(selectedComponent.props.options ?? []),
                  ];
                  newOptions[i] = e.target.value;
                  handlePropChange("options", newOptions);
                }}
              />
              <button
                className="bg-red-600 font-bold text-white px-2 rounded"
                onClick={() => {
                  const newOptions = (
                    selectedComponent.props.options ?? []
                  ).filter((_, idx) => idx !== i);
                  handlePropChange("options", newOptions);
                }}
              >
                ✕
              </button>
            </div>
          )
        )}
      </div>
      <button
        className={`mt-2 font-semibold ${
          changeTheme ? "bg-mainColor2" : "bg-mainColor"
        }   text-white px-3 py-1 rounded-md`}
        onClick={() => {
          const newOptions = [
            ...(selectedComponent.props.options ?? []),
            `Option ${(
              (selectedComponent.props.options?.length ?? 0) + 1
            ).toString()}`,
          ];
          handlePropChange("options", newOptions);
        }}
      >
        {t("EditProps.Select_Prop.Add")}
      </button>
    </div>
  );
};

export default Select_Prop;
