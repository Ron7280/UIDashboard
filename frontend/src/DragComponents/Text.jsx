import React, { useContext } from "react";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";
import { PropaneSharp } from "@mui/icons-material";

const Text = ({ props, DEFAULT_PROPS }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();
  return (
    <div
      className={`shadow-md p-1 w-full text-center rounded-lg ${
        changeTheme
          ? "text-white shadow-lightTeal"
          : "text-black shadow-mainColor"
      } font-medium`}
    >
      {props.text ? props.text : t("DragCompo.Text.Text")}
    </div>
  );
};

export default Text;
