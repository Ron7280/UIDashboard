import React, { useContext, useEffect, useState } from "react";
import { Change_Theme_context } from "../Contexts";

const DigitalClock = ({
  format = "24h",
  color = "#374151",
  fontSize = "2rem",
}) => {
  const [time, setTime] = useState("");
  const [changeTheme] = useContext(Change_Theme_context);

  function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    let ampm = "";

    if (format === "12h") {
      ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
    }

    const pad = (n) => n.toString().padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${ampm}`.trim();
  }

  useEffect(() => {
    setTime(getCurrentTime());
    const timer = setInterval(() => setTime(getCurrentTime()), 1000);
    return () => clearInterval(timer);
  }, [format]);

  return (
    <div
      style={{
        fontSize,
        color: changeTheme ? "#374151" : color,
        fontFamily: "monospace",
        fontWeight: "bold",
      }}
      className={`flex items-center justify-center p-3 h-full shadow-md rounded-xl ${
        changeTheme ? "shadow-lightTeal bg-white" : "shadow-mainColor"
      }`}
    >
      {time}
    </div>
  );
};

export default DigitalClock;
