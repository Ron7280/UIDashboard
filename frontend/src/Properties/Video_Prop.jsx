import React, { useContext, useEffect } from "react";
import TitleSetter from "../Components/TitleSetter";
import { FaYoutube } from "react-icons/fa6";
import { MdOndemandVideo } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { AiFillControl, AiFillInteraction } from "react-icons/ai";
import {
  Change_Theme_context,
  Video_Interact_context,
  Video_Progress_context,
} from "../Contexts";
import { useTranslation } from "react-i18next";

const Video_Prop = ({ components, selectedComponent, handlePropChange }) => {
  const [videoProgress, setVideoProgress] = useContext(Video_Progress_context);
  const [videoInteract, setVideoInteract] = useContext(Video_Interact_context);
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();

  useEffect(() => {
    if (selectedComponent.props?.targetId) {
      setVideoInteract({
        Prog: videoProgress,
        targetTitle: selectedComponent.props?.title,
      });
    }
  }, [videoProgress, selectedComponent.props?.targetId]);

  return (
    <div className="space-y-3">
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
        <FaYoutube size={25} />
        {t("EditProps.Video_Prop.Link")}
      </label>
      <input
        value={selectedComponent.props?.src || ""}
        onChange={(e) => handlePropChange("src", e.target.value)}
        placeholder={t("EditProps.Video_Prop.Placeholder")}
        className="w-full border rounded-md px-3 py-2 outline-none"
      />
      <div className="flex flex-col gap-2">
        <label
          className={`text-lg flex items-center gap-2 font-bold ${
            changeTheme ? "text-white" : ""
          }`}
        >
          <MdOndemandVideo size={25} />
          {t("EditProps.Video_Prop.Choose")}
        </label>
        <input
          id="videoFileInput"
          type="file"
          accept="video/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const fileURL = URL.createObjectURL(file);
              handlePropChange("src", fileURL);
            }
          }}
          className="hidden outline-none"
        />
        <button
          className={`px-3 py-2  text-white rounded-md 
          ${
            changeTheme
              ? " bg-SecondryTeal hover:bg-SecondryTeal"
              : " bg-lightIndigo hover:bg-mainColor"
          }`}
          onClick={() => document.getElementById("videoFileInput").click()}
        >
          {t("EditProps.Video_Prop.Choose")}
        </button>
      </div>
      <div className="flex items-center gap-4">
        <label
          className={`text-lg flex items-center gap-2 font-bold w-[50%]
          ${changeTheme ? "text-white" : ""}`}
        >
          <FaPlay />
          {t("EditProps.Video_Prop.Auto")}
        </label>
        <input
          type="checkbox"
          checked={selectedComponent.props?.autoplay || false}
          onChange={(e) => handlePropChange("autoplay", e.target.checked)}
          className="cursor-pointer outline-none "
        />
      </div>
      <div className="flex items-center gap-4">
        <label
          className={`text-lg flex items-center gap-2 font-bold w-[50%] ${
            changeTheme ? "text-white" : ""
          }`}
        >
          <AiFillControl size={25} />
          {t("EditProps.Video_Prop.Controls")}
        </label>
        <input
          type="checkbox"
          checked={selectedComponent.props?.controls ?? true}
          onChange={(e) => handlePropChange("controls", e.target.checked)}
          className="cursor-pointer outline-none"
        />
      </div>
      <label
        className={`text-lg flex items-center gap-2 font-bold ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <AiFillInteraction size={25} />
        {t("EditProps.Video_Prop.InteractWith")}
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
        <option value="">{t("EditProps.Video_Prop.Select")}</option>
        {components
          .filter(
            (compo) =>
              compo.id !== selectedComponent.id && compo?.type === "ProgressBar"
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

export default Video_Prop;
