import { useContext, useState, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import DraggableComponent from "../Components/DraggableComponent";
import DEFAULT_PROPS from "./DEFAULT_PROPS";
import { FaArrowDown } from "react-icons/fa";
import { FiInbox } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n.js";
import {
  Change_Language_context,
  Change_Theme_context,
  Set_MainName_context,
} from "../Contexts";
import DashboardHeader from "../Components/DashboardHeader.jsx";
import PagesBar from "../Components/PagesBar.jsx";

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
  const [lang, setLang] = useState("AR");
  const [LangText, setLangText] = useState("AR");
  const dropdownRef = useRef(null);
  const { t } = useTranslation();
  const [pages, setPages] = useState(() => {
    const savedPages = localStorage.getItem("dashboard_pages");
    return savedPages
      ? JSON.parse(savedPages)
      : [{ name: "Page 1", components: [] }];
  });

  const [activePage, setActivePage] = useState(() => {
    const savedActivePage = localStorage.getItem("dashboard_activePage");
    return savedActivePage ? Number(savedActivePage) : 0;
  });

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item) => {
      if (!item.id) {
        const type = item?.type || "Text";
        const newCompo = {
          type,
          props: { ...(DEFAULT_PROPS[type] ? DEFAULT_PROPS[type] : {}) },
        };
        setComponents((prev) => [
          ...prev,
          { id: `comp-${Date.now()}`, ...newCompo },
        ]);
      }
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
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
    let newLang;
    if (e?.target?.value) {
      newLang = e.target.value;
    } else {
      const { lang1, lang2 } = changeLanguage;
      const currentLang = localStorage.getItem("lang") || lang1;
      newLang = currentLang === lang1 ? lang2 : lang1;
    }

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

  useEffect(() => ChangeLanguage(), [changeLanguage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const handlePageSwitch = (index) => {
    const updatedPages = [...pages];
    updatedPages[activePage].components = components;
    setPages(updatedPages);

    setActivePage(index);
    setComponents(updatedPages[index].components);
    setSelectedIndex(null);
  };

  const addNewPage = () => {
    const updatedPages = [...pages];
    updatedPages[activePage].components = components;

    const newPageIndex = updatedPages.length + 1;
    const newPages = [
      ...updatedPages,
      { name: `Page ${newPageIndex}`, components: [] },
    ];
    setPages(newPages);

    setActivePage(newPages.length - 1);
    setComponents([]);
    setSelectedIndex(null);
  };

  const removePageHandler = () => {
    if (pages.length <= 1) return;
    const updatedPages = [...pages];
    updatedPages.splice(activePage, 1);

    const newActive = activePage === 0 ? 0 : activePage - 1;

    setPages(updatedPages);
    setActivePage(newActive);
    setComponents(updatedPages[newActive].components);
    setSelectedIndex(null);
  };

  const renamePage = (index, newName) => {
    setPages((prev) => {
      const updated = [...prev];
      updated[index].name = newName;
      localStorage.setItem("dashboard_pages", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const pagesCopy = [...pages];
    pagesCopy[activePage] = {
      ...pagesCopy[activePage],
      components: components,
    };
    localStorage.setItem("dashboard_pages", JSON.stringify(pagesCopy));
  }, [pages, components, activePage]);

  useEffect(() => {
    localStorage.setItem("dashboard_activePage", activePage);
  }, [activePage]);

  useEffect(() => {
    if (pages[activePage]?.components) {
      setComponents(pages[activePage].components);
    }
  }, [pages, activePage, setComponents]);

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
      <DashboardHeader
        changeTheme={changeTheme}
        setChangeTheme={setChangeTheme}
        fullScreen={fullScreen}
        setFullScreen={setFullScreen}
        lang={lang}
        showLangDropdown={showLangDropdown}
        setShowLangDropdown={setShowLangDropdown}
        ChangeLanguage={ChangeLanguage}
        dropdownRef={dropdownRef}
        pages={pages}
        activePage={activePage}
        removePage={removePageHandler}
        set_MainName={set_MainName}
        componentsLength={components.length}
      />

      <PagesBar
        changeTheme={changeTheme}
        pages={pages}
        handlePageSwitch={handlePageSwitch}
        activePage={activePage}
        addNewPage={addNewPage}
        renamePage={renamePage}
      />

      {components.length === 0 ? (
        !fullScreen && (
          <div
            className={`h-[92%] rounded-lg border-2 border-dashed ${
              changeTheme
                ? "border-lightTeal text-lightTeal bg-gray-500"
                : "border-mainColor text-gray-700 bg-white"
            } flex flex-col items-center justify-center gap-4`}
          >
            <div className="flex flex-col items-center justify-center">
              <FaArrowDown size={35} className="animate-bounce" />
              <FiInbox size={40} />
            </div>
            <div className="text-xl font-bold">{t("Dashboard.Drop")}</div>
          </div>
        )
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
