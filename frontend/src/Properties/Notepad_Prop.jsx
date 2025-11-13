import React, { useContext } from "react";
import TitleSetter from "../Components/TitleSetter";
import { BiSolidNotepad } from "react-icons/bi";
import { MdOutlineEditNote } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { Change_Theme_context, Save_To_Notepad_context } from "../Contexts";
import { useTranslation } from "react-i18next";

const Notepad_Prop = ({ selectedComponent, handlePropChange }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [save_ToNotepad] = useContext(Save_To_Notepad_context);
  const { t } = useTranslation();

  const handleDownloadTxt = () => {
    const { type, content, todos, title } = selectedComponent.props;

    let fileContent = "";

    if (type === "todo") {
      fileContent = todos
        ?.map(
          (todo, index) =>
            `${index + 1}. ${todo.text} [${todo.done ? "✓" : "✗"}]`
        )
        .join("\n");
    } else {
      const relatedNotes = save_ToNotepad.filter(
        (entry) => entry.NoteTitle === title
      );

      if (relatedNotes.length > 0) {
        fileContent = relatedNotes
          .map((entry) => {
            // if it's an object with words & sentence
            if (
              entry.value &&
              typeof entry.value === "object" &&
              entry.value.words &&
              entry.value.sentence
            ) {
              return `Words:\n${entry.value.words.join(" , ")}\nSentence:\n${
                entry.value.sentence
              }`;
            }

            return `${entry.textKey} : ${entry.value}`;
          })
          .join("\n\n");
      } else {
        fileContent = content || "";
      }
    }

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title || "Notepad"}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="flex flex-col gap-4">
      <TitleSetter
        compName={selectedComponent.type}
        handlePropChange={handlePropChange}
        defaultValue={selectedComponent.props?.title}
      />

      <div
        className={`${
          changeTheme ? "text-white" : ""
        } text-lg flex items-center gap-2 font-bold`}
      >
        <BiSolidNotepad size={25} />
        {t("EditProps.Notepad_Prop.Type")}
      </div>
      <select
        className="border rounded-md px-3 py-2 font-semibold w-full outline-none"
        value={selectedComponent.props?.type || "text"}
        onChange={(e) => handlePropChange("type", e.target.value)}
      >
        <option value="text">{t("EditProps.Notepad_Prop.Text")}</option>
        <option value="todo">{t("EditProps.Notepad_Prop.List")}</option>
      </select>

      <button
        onClick={handleDownloadTxt}
        className={`flex items-center justify-center gap-2 py-2 rounded-md 
          font-semibold shadow-md transition-all text-white ${
            changeTheme ? "bg-mainColor2 " : "bg-mainColor  "
          }`}
      >
        <IoMdDownload size={22} />
        {t("EditProps.Notepad_Prop.Download")}
      </button>
    </div>
  );
};

export default Notepad_Prop;
