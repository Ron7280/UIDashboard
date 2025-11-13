import React, { useContext, useState } from "react";
import { FaIdCardAlt } from "react-icons/fa";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";

const Card = ({ props, title, content }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [cardContent, setCardContent] = useState(content);
  const { t } = useTranslation();

  return (
    <div
      title={props.title}
      className={`w-full h-full bg-white border-2 rounded-xl
       shadow-md  ${
         changeTheme ? "shadow-lightTeal" : "shadow-mainColor"
       } p-4 flex flex-col`}
    >
      <div className="flex gap-1 items-center font-semibold text-gray-800 mb-2">
        <FaIdCardAlt
          size={25}
          className={`${changeTheme ? "text-mainColor2" : "text-mainColor"}`}
        />
        {props.title ? props.title : t("DragCompo.Card.Title")}
      </div>

      <div className="text-gray-600 font-semibold text-sm flex-1 overflow-auto">
        {content}
      </div>
    </div>
  );
};

export default Card;
