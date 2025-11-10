import React, { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { BiSolidHide } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
import RenderComponent from "../Components/RenderComponent";
import Text_Prop from "../Properties/Text_Prop";
import Button_Prop from "../Properties/Button_Prop";
import AI_Prop from "../Properties/AI_Prop";
import ProgressBar_Prop from "../Properties/ProgressBar_Prop";
import Select_Prop from "../Properties/Select_Prop";
import Chart_Prop from "../Properties/Chart_Prop";
import Card_Prop from "../Properties/Card_Prop";
import Table_Prop from "../Properties/Table_Prop";
import Avatar_Prop from "../Properties/Avatar_Prop";
import Image_Prop from "../Properties/Image_Prop";
import QR_Prop from "../Properties/QR_Prop";
import Loader_Prop from "../Properties/Loader_Prop";
import Map_Prop from "../Properties/Map_Prop";
import CountdownTimer_Prop from "../Properties/CountdownTimer_Prop";
import DigitalClock_Prop from "../Properties/DigitalClock_Prop";
import Notepad_Prop from "../Properties/Notepad_Prop";
import Video_Prop from "../Properties/Video_Prop";
import TitleSetter from "../Components/TitleSetter";
import DEFAULT_PROPS from "./DEFAULT_PROPS";
import { BiSolidComponent } from "react-icons/bi";
import { Change_Theme_context } from "../Contexts";
import API_Prop from "../Properties/Api_Prop";
import Toggle_prop from "../Properties/Toggle_prop";
import Speedometer_Prop from "../Properties/Speedometer_Prop";
import { useTranslation } from "react-i18next";
import Linguistics_Prop from "../Properties/Linguistics_Prop";
import LatestBooks_Prop from "../Properties/LatestBooks_Prop";
import LatestMovie_Prop from "../Properties/LatestMovie_Prop";
import Sort_Prop from "../Properties/Sort_Prop";

const RightSide = ({
  components,
  setComponents,
  selectedIndex,
  setSelectedIndex,
  handlePropChange,
}) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [panelWidth, setPanelWidth] = useState(320);
  const [hidePreview, setHidePreview] = useState(true);
  const selectedComponent =
    selectedIndex !== null ? components[selectedIndex] : null;

  const initPanelResize = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = panelWidth;

    const onMouseMove = (eMove) => {
      const newWidth = Math.min(
        600,
        Math.max(250, startWidth - (eMove.clientX - startX))
      );
      setPanelWidth(newWidth);
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const removeSelected = () => {
    if (selectedIndex === null) return;
    setComponents((prev) => prev.filter((_, i) => i !== selectedIndex));
    setSelectedIndex(null);
  };

  const { t } = useTranslation();

  return (
    <div
      className={`relative border-l border-r  p-5 overflow-auto pr-2 
      scrollbar-thin ${
        changeTheme
          ? "bg-gray-600 scrollbar-thumb-lightTeal border-lightTeal"
          : "bg-white scrollbar-thumb-lightIndigo border-mainColor"
      } scrollbar-track-transparent`}
      style={{
        width: `${panelWidth}px`,
        minWidth: "250px",
        maxWidth: "600px",
      }}
    >
      <div
        onMouseDown={initPanelResize}
        className={`absolute left-0 top-0 h-full w-2 cursor-ew-resize bg-transparent
         ${
           changeTheme ? "hover:bg-teal-200 " : "hover:bg-indigo-300 "
         } transition-colors`}
      />
      <div className="flex items-center justify-between p-2">
        <div
          className={`flex items-center gap-2 ${
            changeTheme ? "text-lightTeal" : "text-mainColor"
          } font-bold text-xl`}
        >
          <FaEdit size={30} />
          {t("RightSide.Properties")}
        </div>
        {selectedComponent ? (
          <div className="flex items-center gap-2">
            <button
              onClick={removeSelected}
              className="p-2 rounded-full hover:bg-red-300"
            >
              <AiOutlineDelete className="text-red-600 w-5 h-5" />
            </button>
          </div>
        ) : null}
      </div>
      <AnimatePresence>
        {selectedComponent ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
          >
            <div
              className={`font-bold flex gap-2 items-center text-lg mb-3  ${
                changeTheme ? "text-white" : ""
              }`}
            >
              <BiSolidComponent size={25} /> {t("RightSide.Type")} :
              <div
                className={` ${
                  changeTheme ? "text-lightTeal" : "text-mainColor"
                }`}
              >
                {selectedComponent.type}
              </div>
            </div>

            {(() => {
              const propComponents = {
                AI: AI_Prop,
                API: API_Prop,
                Avatar: Avatar_Prop,
                Books: LatestBooks_Prop,
                Button: Button_Prop,
                Card: Card_Prop,
                Chart: Chart_Prop,
                CountdownTimer: CountdownTimer_Prop,
                DigitalClock: DigitalClock_Prop,
                Image: Image_Prop,
                Linguistics: Linguistics_Prop,
                Loader: Loader_Prop,
                Map: Map_Prop,
                Movies: LatestMovie_Prop,
                Notepad: Notepad_Prop,
                ProgressBar: ProgressBar_Prop,
                QR: QR_Prop,
                Select: Select_Prop,
                Sort: Sort_Prop,
                Speedometer: Speedometer_Prop,
                Table: Table_Prop,
                Text: Text_Prop,
                Toggle: Toggle_prop,
                Video: Video_Prop,
              };

              const DynamicProp = propComponents[selectedComponent.type];
              if (DynamicProp) {
                return (
                  <DynamicProp
                    selectedComponent={selectedComponent}
                    handlePropChange={handlePropChange}
                    components={components}
                    DEFAULT_PROPS={DEFAULT_PROPS}
                    selectedIndex={selectedIndex}
                  />
                );
              }

              const titleSetTypes = [
                "Toggle",
                "Input",
                "Textarea",
                "Checkbox",
                "Slider",
                "Game",
                "RatingStars",
              ];

              if (titleSetTypes.includes(selectedComponent.type)) {
                return (
                  <TitleSetter
                    compName={selectedComponent.type}
                    handlePropChange={handlePropChange}
                    defaultValue={selectedComponent.props?.title}
                  />
                );
              }

              return null;
            })()}

            <div className="mt-6 ">
              <div
                className={`flex items-center ${
                  changeTheme ? "text-lightTeal" : "text-mainColor"
                } justify-center gap-2
               text-lg font-bold mb-3 cursor-pointer`}
                onClick={() => setHidePreview(!hidePreview)}
              >
                {hidePreview ? t("RightSide.Preview") : t("RightSide.Show")}
                <div>
                  {hidePreview ? <BiSolidHide size={20} /> : <IoMdEye />}
                </div>
              </div>

              {hidePreview && (
                <div className="flex justify-center">
                  <RenderComponent
                    key={JSON.stringify(selectedComponent.props)}
                    comp={selectedComponent}
                  />
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div
              className={`${changeTheme ? "text-white" : ""} font-bold text-lg`}
            >
              {t("RightSide.Tip")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RightSide;
