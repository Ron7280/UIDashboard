import React, { useContext, useEffect, useState } from "react";
import { Change_Image_context, Change_Theme_context } from "../Contexts";

const Image = ({ props, DEFAULT_PROPS, width, height }) => {
  const [change_Image, setChange_Image] = useContext(Change_Image_context);
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);

  const [imageSrc, setImageSrc] = useState(
    props.path || props.src || DEFAULT_PROPS.Image.src
  );

  useEffect(() => {
    if (
      change_Image?.active &&
      change_Image?.targetTitle === props.title &&
      change_Image?.newSrc
    ) {
      setImageSrc(change_Image.newSrc);
    }
  }, [change_Image, props.title]);

  return (
    <img
      src={imageSrc}
      alt={props.title || "Dynamic Image"}
      style={{ width, height, objectFit: "cover" }}
      className={` shadow-md  ${
        changeTheme ? "shadow-lightTeal" : "shadow-mainColor"
      } rounded-md `}
    />
  );
};

export default Image;
