import React, { useContext, useEffect, useState } from "react";
import { Change_Theme_context } from "../Contexts";

const DigitalClock = ({ format = "24h", color = "#374151" }) => {
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

    return `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)} ${ampm}`.trim();
  }

  useEffect(() => {
    setTime(getCurrentTime());
    const timer = setInterval(() => setTime(getCurrentTime()), 1000);
    return () => clearInterval(timer);
  }, [format]);

  return (
    <div
      style={{
        color: changeTheme ? "#374151" : color,
      }}
      className={`w-full h-full flex gap-4 items-center justify-center font-semibold
          p-3 rounded-xl shadow-md text-2xl  ${
            changeTheme ? "shadow-lightTeal bg-white" : "shadow-mainColor"
          }`}
    >
      {time}
    </div>
  );
};

export default DigitalClock;
