import React, { useContext, useState, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import {
  MdDashboard,
  MdOutlineScreenshotMonitor,
  MdDashboardCustomize,
} from "react-icons/md";
import DEFAULT_PROPS from "./DEFAULT_PROPS";
import DraggableComponent from "../Components/DraggableComponent";
import { GrLanguage } from "react-icons/gr";
import { FaArrowDown } from "react-icons/fa";
import { FiInbox } from "react-icons/fi";
import { IoIosMoon } from "react-icons/io";
import { MdLightMode } from "react-icons/md";
import {
  Change_Language_context,
  Change_Theme_context,
  Set_MainName_context,
} from "../Contexts";
import { useTranslation } from "react-i18next";
import i18n from "C:/Users/rani/Desktop/dashboard/i18n.js";
import { US, ES, FR, SY } from "country-flag-icons/react/3x2";
import { Tooltip } from "@mui/material";

const Dashboard = ({
  components,
  setComponents,
  selectedIndex,
  setSelectedIndex,
  handlePropChange,
  fullScreen,
  setFullScreen,
}) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [changeLanguage, setChangeLanguage] = useContext(
    Change_Language_context
  );

  const [set_MainName, setSet_MainName] = useContext(Set_MainName_context);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const { t } = useTranslation();
  const [lang, setLang] = useState("AR");
  const dropdownRef = useRef(null);
  const [LangText, setLangText] = useState("AR");

  const LanguagesOptions = [
    { title: "EN", flag: US },
    { title: "AR", flag: SY },
    { title: "SP", flag: ES },
    { title: "FR", flag: FR },
  ];

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item) => {
      if (!item.id) {
        const type = item?.type || "Text";
        const newCompo = {
          type,
          props: { ...(DEFAULT_PROPS[type] ? DEFAULT_PROPS[type] : {}) },
        };
        setComponents((p) => [...p, { id: `comp-${Date.now()}`, ...newCompo }]);
      }
    },
    collect: (m) => ({ isOver: !!m.isOver() }),
  }));

  const moveComponent = (from, to) => {
    setComponents((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  };

  const ChangeLanguage = (e) => {
    if (e?.target?.value) {
      const newLang = e.target.value;
      setLang(newLang);
      setLangText(newLang);
      i18n.changeLanguage(newLang);
      localStorage.setItem("lang", newLang);
      document.body.dir = newLang === "AR" ? "rtl" : "ltr";
      return;
    }

    const { lang1, lang2 } = changeLanguage;
    const currentLang = localStorage.getItem("lang") || lang1;
    const newLang = currentLang === lang1 ? lang2 : lang1;

    setLang(newLang);
    setLangText(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    document.body.dir = newLang === "AR" ? "rtl" : "ltr";
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "AR";
    setLang(savedLang);
    setLangText(savedLang);
    i18n.changeLanguage(savedLang);
    document.body.dir = savedLang === "AR" ? "rtl" : "ltr";
  }, [changeLanguage]);

  useEffect(() => {
    ChangeLanguage();
  }, [changeLanguage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLangDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        setChangeTheme((prev) => !prev);
      }
      if (e.ctrlKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setFullScreen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setChangeTheme, setFullScreen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

      if (["w", "a", "s", "d"].includes(e.key.toLowerCase())) {
        e.preventDefault();

        setSelectedIndex((prev) => {
          if (components.length === 0) return null;
          let newIndex = prev ?? 0;

          if (e.key.toLowerCase() === "w" || e.key.toLowerCase() === "a") {
            newIndex = prev > 0 ? prev - 1 : components.length - 1;
          }
          if (e.key.toLowerCase() === "s" || e.key.toLowerCase() === "d") {
            newIndex = prev < components.length - 1 ? prev + 1 : 0;
          }

          return newIndex;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [components.length, setSelectedIndex]);

  return (
    <div
      ref={dropRef}
      className={`flex-1 p-2 h-full ${
        isOver
          ? changeTheme
            ? "bg-gray-500"
            : "bg-indigo-100"
          : changeTheme
          ? "bg-gray-600"
          : ""
      }`}
    >
      <div
        className={`flex items-center h-[8%] justify-between ${
          changeTheme ? "text-lightTeal" : "text-mainColor"
        } font-bold`}
      >
        <div className="w-[30%] flex items-center gap-1 text-2xl">
          <MdDashboard size={40} />
          {set_MainName ?? t("Dashboard.Dashboard")}
        </div>

        <div className="flex w-[50%] justify-end items-center gap-5 text-xl">
          <div ref={dropdownRef} className="relative w-[12%]">
            <div
              className={`flex items-center justify-center gap-2 w-full p-1 border-2 rounded-xl cursor-pointer ${
                changeTheme
                  ? "border-lightTeal text-lightTeal"
                  : "border-mainColor text-mainColor"
              }`}
              onClick={() => setShowLangDropdown(!showLangDropdown)}
            >
              <GrLanguage size={25} />
              <div>{lang || "EN"}</div>
            </div>

            {showLangDropdown && (
              <div
                className={`absolute mt-1 w-full rounded-lg shadow-lg z-50 ${
                  changeTheme
                    ? "bg-gray-700 text-lightTeal"
                    : "bg-white text-mainColor"
                }`}
              >
                {LanguagesOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      ChangeLanguage({ target: { value: item.title } });
                      setShowLangDropdown(false);
                    }}
                    className="px-3 py-2 cursor-pointer justify-center hover:bg-opacity-50
                     hover:bg-gray-300 flex items-center gap-3"
                  >
                    <div className="text-xl w-8 h-4">
                      <item.flag className="w-10 h-6 rounded" />
                    </div>
                    <div>{item.title}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Tooltip title="Ctrl + C" arrow placement="bottom">
            <div
              className="cursor-pointer"
              onClick={() => setChangeTheme(!changeTheme)}
            >
              {changeTheme ? (
                <MdLightMode size={30} />
              ) : (
                <IoIosMoon size={30} />
              )}
            </div>
          </Tooltip>
          <Tooltip title="Ctrl + F" arrow placement="bottom">
            <div
              onClick={() => setFullScreen(!fullScreen)}
              className="flex items-center gap-2 cursor-pointer"
            >
              {!fullScreen ? (
                <>
                  <MdOutlineScreenshotMonitor size={30} />
                  <div>{t("Dashboard.FullScreen")}</div>
                </>
              ) : (
                <>
                  <MdDashboardCustomize size={30} />
                  <div> {t("Dashboard.EditMode")}</div>
                </>
              )}
            </div>
          </Tooltip>
          {components.length === 0 ? (
            <></>
          ) : (
            <div
              title="Components number"
              className={`min-w-[20%] pl-2 pr-2 w-fit text-center ${
                changeTheme ? "bg-lightTeal" : "bg-mainColor"
              } rounded-lg text-white`}
            >
              {components.length}
            </div>
          )}
        </div>
      </div>

      {components.length === 0 ? (
        !fullScreen ? (
          <div
            className={` h-[92%] rounded-lg border-2 border-dashed ${
              changeTheme
                ? "border-lightTeal text-lightTeal bg-gray-500"
                : "border-mainColor text-gray-700 bg-white"
            } 
              flex flex-col items-center justify-center gap-4`}
          >
            <div className="flex flex-col items-center justify-center">
              <FaArrowDown size={35} className="animate-bounce" />
              <FiInbox size={40} />
            </div>
            <div className={`text-xl font-bold `}>{t("Dashboard.Drop")}</div>
          </div>
        ) : null
      ) : (
        <div
          className={`flex h-[92%] flex-wrap gap-3 justify-center items-start w-full p-2 overflow-auto
           scrollbar-thin ${
             changeTheme
               ? "scrollbar-thumb-lightTeal"
               : "scrollbar-thumb-lightIndigo"
           } scrollbar-track-transparent`}
        >
          {components.map((comp, idx) => (
            <DraggableComponent
              key={comp.id}
              comp={comp}
              idx={idx}
              moveComponent={moveComponent}
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
              fullScreen={fullScreen}
              handlePropChange={handlePropChange}
              DEFAULT_PROPS={DEFAULT_PROPS}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
