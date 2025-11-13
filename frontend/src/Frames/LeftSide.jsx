import React, { useContext, useEffect, useRef, useState } from "react";
import { FaReact } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import ComponentItem from "../Components/ComponentItem";
import DEFAULT_PROPS from "./DEFAULT_PROPS";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";

const LeftSide = () => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const lang = localStorage.getItem("lang");
  const [query, setQuery] = useState("");
  const searchInputRef = useRef(null);
  const filtered = Object.keys(DEFAULT_PROPS).filter((k) =>
    k.toLowerCase().includes(query.toLowerCase())
  );
  const { t } = useTranslation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={`w-72 border-r ${
        changeTheme ? "bg-gray-600 border-lightTeal" : "bg-mainColor"
      } p-5 flex flex-col gap-4`}
    >
      <div
        className={`flex items-center ${
          changeTheme ? "text-lightTeal" : "text-white"
        } justify-between`}
      >
        <div>
          <div className="font-bold flex items-center gap-2 text-2xl">
            <FaReact size={40} className="hover:animate-spin" />
            {t("LeftSide.UI")}
          </div>
          <div className="text-lg justify-center w-full flex gap-1 font-bold items-center ">
            {t("LeftSide.For")}
          </div>
        </div>
      </div>
      <Tooltip title="Ctrl + S" arrow placement="right">
        <div className="relative">
          <input
            ref={searchInputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("LeftSide.Search")}
            className="w-full border font-semibold rounded-md px-3 py-2 outline-none "
          />
          <div className="absolute right-3 top-2.5 text-gray-400">
            <AiOutlineSearch
              size={25}
              className={`${changeTheme ? "text-lightTeal" : ""}`}
            />
          </div>
        </div>
      </Tooltip>

      <div
        className={`overflow-auto ${
          lang === "AR" ? "pl-2" : "pr-2"
        }  scrollbar-thin ${
          changeTheme ? "scrollbar-thumb-lightTeal " : "scrollbar-thumb-white"
        }
          scrollbar-track-transparent `}
        style={{ maxHeight: "calc(100vh - 220px)" }}
      >
        {filtered.map((c, index) => (
          <ComponentItem
            key={c}
            type={c}
            index={index}
            DEFAULT_PROPS={DEFAULT_PROPS}
            changeTheme={changeTheme}
          />
        ))}
      </div>

      <div className={`mt-auto text-xs text-white `}>
        {t("LeftSide.Tip1")} <br />
        {t("LeftSide.Tip2")}
      </div>
    </div>
  );
};

export default LeftSide;
