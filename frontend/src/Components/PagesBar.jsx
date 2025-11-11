import { useState } from "react";
import { MdAddToPhotos, MdEdit } from "react-icons/md";

const PagesBar = ({
  changeTheme,
  pages,
  handlePageSwitch,
  activePage,
  addNewPage,
  renamePage,
}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempName, setTempName] = useState("");

  const startEditing = (index, currentName) => {
    setEditingIndex(index);
    setTempName(currentName);
  };

  const finishEditing = (index) => {
    if (tempName.trim() !== "") {
      renamePage(index, tempName.trim());
    }
    setEditingIndex(null);
    setTempName("");
  };

  return (
    <div
      className={`flex ${
        changeTheme ? "bg-gray-500" : "bg-indigo-50"
      }  rounded-lg items-center mb-1 overflow-x-auto scrollbar-thin
         scrollbar-thumb-mainColor scrollbar-track-transparent`}
    >
      {pages.map((page, index) => (
        <div
          key={index}
          className={`group w-fit min-w-[10%] justify-center text-center p-1 cursor-pointer font-semibold flex items-center gap-1 ${
            activePage === index
              ? `${
                  changeTheme
                    ? "bg-mainColor2 text-white"
                    : "bg-lightIndigo text-white"
                } shadow-gray-900 shadow-inner`
              : `${changeTheme ? "text-white" : "text-black"}`
          } ${index === 0 ? "rounded-ss-lg rounded-es-lg" : ""}`}
        >
          {editingIndex === index ? (
            <input
              className={`w-full pl-1 bg-transparent outline-none ${
                activePage === index
                  ? "text-white"
                  : `${changeTheme ? "text-white" : "text-black"}`
              }`}
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={() => finishEditing(index)}
              onKeyDown={(e) => e.key === "Enter" && finishEditing(index)}
              autoFocus
            />
          ) : (
            <>
              <div
                className="translate-x-3 group-hover:-translate-x-1 "
                onClick={() => handlePageSwitch(index)}
              >
                {page.name}
              </div>
              <MdEdit
                size={18}
                className={` opacity-0 group-hover:opacity-100 cursor-pointer ${
                  changeTheme ? "text-lightTeal" : "text-mainColor"
                }`}
                onClick={() => startEditing(index, page.name)}
              />
            </>
          )}
        </div>
      ))}

      <div
        onClick={addNewPage}
        className={`p-1 w-[5%] items-center justify-center flex rounded-ee-lg rounded-se-lg
          cursor-pointer ${
            changeTheme ? "bg-lightTeal" : "bg-mainColor"
          } text-white`}
      >
        <MdAddToPhotos size={24} />
      </div>
    </div>
  );
};

export default PagesBar;
