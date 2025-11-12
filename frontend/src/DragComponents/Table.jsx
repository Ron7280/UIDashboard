import React, { useContext } from "react";
import { Change_Theme_context } from "../Contexts";

const Table = ({ columns = [], data = [], width, height }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  return (
    <div
      className={`rounded-xl p-1`}
      style={{ width, height, overflow: "auto" }}
    >
      <div
        className={`overflow-x-auto scrollbar-thin  border rounded-lg bg-white  shadow-md  ${
          changeTheme
            ? "shadow-lightTeal scrollbar-thumb-mainColor2"
            : "shadow-mainColor scrollbar-thumb-mainColor"
        }`}
      >
        <table className="w-full text-left border-collapse">
          <thead
            className={`${changeTheme ? "bg-mainColor2" : "bg-lightIndigo"}`}
          >
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-4 py-2 text-white font-medium border-b"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`font-semibold ${
                  changeTheme ? "even:bg-teal-200" : "even:bg-indigo-300"
                } `}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 border-b text-gray-600"
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
