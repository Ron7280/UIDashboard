import React, { useContext } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Barcode from "react-barcode";
import { Change_Theme_context } from "../Contexts";

const QR = ({ props, DEFAULT_PROPS, width, height }) => {
  const [changeTheme] = useContext(Change_Theme_context);

  return (
    <div
      className={`flex items-center justify-center ounded-lg`}
      style={{ width, height }}
    >
      {props.type === "qr" ? (
        <QRCodeCanvas
          value={props.value || DEFAULT_PROPS.QR.value}
          size={Math.min(width, height)}
        />
      ) : (
        <Barcode
          value={props.value || DEFAULT_PROPS.QR.value}
          width={2}
          height={height * 0.6}
        />
      )}
    </div>
  );
};

export default QR;
