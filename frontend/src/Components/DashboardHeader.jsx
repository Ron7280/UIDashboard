import { GrLanguage } from "react-icons/gr";
import { IoIosMoon } from "react-icons/io";
import {
  MdLightMode,
  MdOutlineScreenshotMonitor,
  MdDashboardCustomize,
} from "react-icons/md";
import { Tooltip } from "@mui/material";
import { IoRemoveCircle } from "react-icons/io5";
import { US, ES, FR, SY } from "country-flag-icons/react/3x2";
import { BiSolidDashboard } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { FaCircleUser } from "react-icons/fa6";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const DashboardHeader = ({
  changeTheme,
  setChangeTheme,
  fullScreen,
  setFullScreen,
  lang,
  setShowLangDropdown,
  showLangDropdown,
  ChangeLanguage,
  dropdownRef,
  pages,
  removePage,
  set_MainName,
  componentsLength,
}) => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const [showUserPopup, setShowUserPopup] = useState();
  const navigate = useNavigate();
  const Username = localStorage.getItem("username");
  const Fname = localStorage.getItem("fname");
  const Lname = localStorage.getItem("lname");
  const LanguagesOptions = [
    { title: "EN", flag: US },
    { title: "AR", flag: SY },
    { title: "SP", flag: ES },
    { title: "FR", flag: FR },
  ];

  const handleLogOut = () => {
    logout();
  };
  return (
    <div
      className={`flex items-center h-[5%] justify-between ${
        changeTheme ? "text-lightTeal" : "text-mainColor"
      } font-bold`}
    >
      <div className="w-[30%] flex items-center gap-1 text-2xl">
        <BiSolidDashboard size={40} />
        {set_MainName ?? t("Dashboard.Dashboard")}
      </div>

      <div className="flex w-[50%] justify-end items-center gap-5 text-xl">
        <div
          className="relative"
          onMouseEnter={() => setShowUserPopup(true)}
          onMouseLeave={() => setShowUserPopup(false)}
        >
          <FaCircleUser size={25} className="cursor-pointer" />

          {showUserPopup && (
            <div
              className={`absolute right-0 w-60 p-3 shadow-lg shadow-black rounded-lg z-50 text-base bg-white ${
                changeTheme ? " text-mainColor2" : " text-mainColor"
              }`}
            >
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-1">
                  <FaUser size={20} /> User : {Username || "Guest"}
                </div>
                <div className="flex items-center gap-1">
                  <FaRegAddressCard size={20} />
                  Full Name : {Fname || "Guest"} {Lname || "Guest"}
                </div>
                <button
                  className="flex items-center gap-2 justify-center w-full bg-red-500
                 rounded-lg text-white font-semibold p-1"
                  onClick={handleLogOut}
                >
                  Log Out <IoIosLogOut size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
        <div ref={dropdownRef} className="relative w-[12%]">
          <div
            className={`flex items-center justify-center gap-2 w-full p-0.5 border-2 rounded-xl cursor-pointer ${
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
                  className="px-3 py-2 cursor-pointer justify-center hover:bg-opacity-50 hover:bg-gray-300 flex items-center gap-3"
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

        {pages.length > 1 && (
          <Tooltip title="Remove this page" arrow placement="bottom">
            <button onClick={removePage}>
              <IoRemoveCircle className={`text-[rgb(255,0,0)]`} size={25} />
            </button>
          </Tooltip>
        )}

        <Tooltip title="Ctrl + D" arrow placement="bottom">
          <div
            className="cursor-pointer"
            onClick={() => setChangeTheme(!changeTheme)}
          >
            {changeTheme ? <MdLightMode size={30} /> : <IoIosMoon size={30} />}
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
                <div>{t("Dashboard.EditMode")}</div>
              </>
            )}
          </div>
        </Tooltip>

        {componentsLength > 0 && (
          <div
            title="Components number"
            className={`min-w-[20%] pl-2 pr-2 w-fit text-center ${
              changeTheme ? "bg-lightTeal" : "bg-mainColor"
            } rounded-lg text-white`}
          >
            {componentsLength}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
