import { FaFileImport } from "react-icons/fa6";
import { FaFileExport } from "react-icons/fa";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import TitleSetter from "../Components/TitleSetter";
import { HiMiniViewColumns } from "react-icons/hi2";
import { MdTableRows } from "react-icons/md";
import * as XLSX from "xlsx";
import { Change_Theme_context } from "../Contexts";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const Table_Prop = ({ selectedComponent, handlePropChange }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();

  const Export_To_Excel = () => {
    const ws = XLSX.utils.json_to_sheet(selectedComponent.props?.data || []);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table_data.xlsx");
  };

  const Import_From_Excel = async (file) => {
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (jsonData.length > 0) {
        const newCols = Object.keys(jsonData[0]).map((key) => ({
          header: key,
          key,
        }));
        handlePropChange("columns", newCols);
      }

      handlePropChange("data", jsonData);
    } catch (error) {
      console.error("Error importing Excel:", error);
      alert("Failed to import Excel file. Please check the file format.");
    }
  };

  return (
    <div className="space-y-3">
      <TitleSetter
        compName={selectedComponent.type}
        handlePropChange={handlePropChange}
        defaultValue={selectedComponent.props?.title}
      />

      <div
        className={`flex items-center gap-2 font-bold text-xl ${
          changeTheme ? "text-white" : ""
        } `}
      >
        <HiMiniViewColumns size={25} />
        {t("EditProps.Table_Prop.Columns")}
      </div>

      <div className={`${changeTheme ? "text-white" : ""} flex font-bold `}>
        <div className="flex-1">{t("EditProps.Table_Prop.Title")}</div>
        <div className="flex-1">{t("EditProps.Table_Prop.Key")}</div>
      </div>

      {(selectedComponent.props?.columns || []).map((col, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <input
            value={col.header || ""}
            onChange={(e) => {
              const newCols = [...selectedComponent.props.columns];
              newCols[idx].header = e.target.value;
              handlePropChange("columns", newCols);
            }}
            placeholder={t("EditProps.Table_Prop.Title")}
            className="flex-1 border rounded-md px-2 py-1 font-semibold outline-none"
          />
          <input
            value={col.key || ""}
            onChange={(e) => {
              const newCols = [...selectedComponent.props.columns];
              newCols[idx].key = e.target.value;
              handlePropChange("columns", newCols);
            }}
            placeholder={t("EditProps.Table_Prop.Key")}
            className="flex-1 border rounded-md px-2 py-1 font-semibold outline-none"
          />
          <button
            onClick={() => {
              const newCols = [...selectedComponent.props.columns];
              newCols.splice(idx, 1);
              handlePropChange("columns", newCols);
            }}
            className="px-2 py-1 font-semibold text-red-600"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={() => {
          const newCols = [
            ...(selectedComponent.props?.columns || []),
            { header: "New Column", key: "newKey" },
          ];
          handlePropChange("columns", newCols);
        }}
        className={`px-2 py-1 mt-1 ${
          changeTheme ? "bg-mainColor2" : "bg-mainColor"
        }  text-white font-semibold rounded-md`}
      >
        {t("EditProps.Table_Prop.AddColumn")}
      </button>

      <div
        className={`flex items-center gap-2 font-bold text-xl mt-3 ${
          changeTheme ? "text-white" : ""
        }`}
      >
        <MdTableRows size={25} />
        {t("EditProps.Table_Prop.Rows")}
      </div>

      <div
        className={`overflow-x-scroll scrollbar-thin ${
          changeTheme
            ? "scrollbar-thumb-lightTeal"
            : "scrollbar-thumb-lightIndigo"
        }
       scrollbar-track-transparent `}
      >
        {(selectedComponent.props?.data || []).map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex gap-2 items-center mb-1 border-b pb-1"
          >
            {selectedComponent.props.columns.map((col, colIndex) => (
              <input
                key={colIndex}
                value={row[col.key ?? ""] || ""}
                onChange={(e) => {
                  const newData = [...selectedComponent.props.data];
                  newData[rowIndex][col.key] = e.target.value;
                  handlePropChange("data", newData);
                }}
                placeholder={col.header}
                className="flex-1 border rounded-md px-2 py-1 font-semibold outline-none"
              />
            ))}
            <button
              onClick={() => {
                const newData = [...selectedComponent.props.data];
                newData.splice(rowIndex, 1);
                handlePropChange("data", newData);
              }}
              className="px-2 py-1 font-semibold text-red-600"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          const newData = [
            ...(selectedComponent.props?.data || []),
            selectedComponent.props.columns.reduce(
              (acc, col) => ({ ...acc, [col.key]: "" }),
              {}
            ),
          ];
          handlePropChange("data", newData);
        }}
        className={`px-2 py-1 mt-1 ${
          changeTheme ? "bg-mainColor2" : "bg-mainColor"
        } text-white rounded-md font-semibold`}
      >
        {t("EditProps.Table_Prop.AddRow")}
      </button>

      <div className="flex flex-col gap-2 mt-4">
        <div className="flex items-center text-[rgb(26,181,26)] gap-2 font-bold text-xl">
          <PiMicrosoftExcelLogo size={30} />
          {t("EditProps.Table_Prop.Excel")}
        </div>

        <div className="flex gap-3">
          <div
            className={`px-3 py-1  w-full justify-center flex items-center gap-3 
          font-semibold ${
            changeTheme
              ? "text-SecondryTeal bg-white"
              : "bg-mainColor text-white"
          }  rounded-md cursor-pointer`}
          >
            <FaFileImport size={20} /> {t("EditProps.Table_Prop.Import")}
            <input
              type="file"
              accept=".xlsx, .xls"
              className="hidden outline-none"
              onChange={(e) => Import_From_Excel(e.target.files?.[0])}
            />
          </div>

          <button
            onClick={Export_To_Excel}
            className="px-3 py-1 w-full justify-center flex items-center gap-3 font-bold bg-[rgb(26,181,26)] text-white rounded-md"
          >
            <FaFileExport size={25} /> {t("EditProps.Table_Prop.Export")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table_Prop;
