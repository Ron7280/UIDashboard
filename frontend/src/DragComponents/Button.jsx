import React, { useContext, useState } from "react";
import {
  Ask_AI_context,
  Change_Image_context,
  Change_Rate_context,
  Change_Theme_context,
  Chart_Trimm_context,
  Check_Box_context,
  Toggle_context,
} from "../Contexts";
import Alert from "../Components/Alert";
import { useTranslation } from "react-i18next";

const Button = ({ props, DEFAULT_PROPS }) => {
  const [ask_AI, setAsk_AI] = useContext(Ask_AI_context);
  const [check_Box, setCheck_Box] = useContext(Check_Box_context);
  const [toggle, setToggle] = useContext(Toggle_context);
  const [trimm_Slice, setTrimm_Slice] = useContext(Chart_Trimm_context);
  const [change_Rate, setChange_Rate] = useContext(Change_Rate_context);
  const [change_Image, setChange_Image] = useContext(Change_Image_context);
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [btnClicked, setBtnClicked] = useState(false);
  const { notifyS, notifyE, notifyW, notifyI } = Alert({ changeTheme });
  const { t } = useTranslation();

  const handleClick = () => {
    const type = props.actionType ?? "alert";
    const value = props.actionValue ?? "Button clicked!";
    setBtnClicked(true);

    setTimeout(() => {
      setBtnClicked(false);
    }, 100);

    if (type === "alert") {
      if (props.AlertType === "info") {
        notifyI(value);
      } else if (props.AlertType === "success") {
        notifyS(value);
      } else if (props.AlertType === "warning") {
        notifyW(value);
      } else if (props.AlertType === "error") {
        notifyE(value);
      }
    } else if (type === "link") {
      window.open(value, "_blank");
    } else if (type === "Ask") {
      setAsk_AI({ active: true, targetTitle: props.InteractWith });
    } else if (type === "moreData") {
      setTrimm_Slice({
        Slice: Number(props.actionValue),
        targetTitle: props.InteractWith,
      });
    } else if (type === "Check") {
      if (check_Box.targetTitle === props.InteractWith) {
        setCheck_Box((prev) => ({
          ...prev,
          active: !prev.active,
        }));
      } else {
        setCheck_Box({ active: true, targetTitle: props.InteractWith });
      }
    } else if (type === "Toggle") {
      if (toggle.targetTitle === props.InteractWith) {
        setToggle((prev) => ({
          ...prev,
          active: !prev.active,
        }));
      } else {
        setToggle({ active: true, targetTitle: props.InteractWith });
      }
    } else if (type === "ChangeRate") {
      setChange_Rate({
        stars: Number(props.actionValue),
        targetTitle: props.InteractWith,
      });
    } else if (type === "Image") {
      const randomImage = `https://picsum.photos/400/200?rand=${Math.floor(
        Math.random() * 1000
      )}`;
      setChange_Image({
        active: true,
        newSrc: randomImage,
        targetTitle: props.InteractWith,
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`h-full p-5 justify-center w-full font-semibold items-center flex rounded-lg text-white ${
        btnClicked ? "shadow-inner" : "shadow-md"
      } shadow-black`}
      style={{ backgroundColor: props.color ?? DEFAULT_PROPS.Button.color }}
    >
      {t("DragCompo.Button.Text")}
    </button>
  );
};

export default Button;
