import React, { useContext, useEffect, useState } from "react";
import { Change_Theme_context, Stop_Timer_context } from "../Contexts";

const CountdownTimer = ({ startTime, resetSignal }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [stopTimer, setStopTimer] = useContext(Stop_Timer_context);
  const [timeLeft, setTimeLeft] = useState({
    hours: startTime?.hours || 0,
    minutes: startTime?.minutes || 0,
    seconds: startTime?.seconds || 0,
  });

  useEffect(() => {
    setTimeLeft({
      hours: startTime?.hours || 0,
      minutes: startTime?.minutes || 0,
      seconds: startTime?.seconds || 0,
    });
  }, [startTime, resetSignal]);

  useEffect(() => {
    if (stopTimer) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        if (seconds > 0) seconds -= 1;
        else {
          seconds = 59;
          if (minutes > 0) minutes -= 1;
          else {
            minutes = 59;
            if (hours > 0) hours -= 1;
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [stopTimer]);

  return (
    <div
      dir="ltr"
      className={`flex w-full h-full gap-4 items-center justify-center font-semibold
          p-3 rounded-xl shadow-md  ${
            changeTheme ? "shadow-lightTeal bg-white" : "shadow-mainColor"
          }  ${
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds <= 5 &&
        timeLeft.seconds % 2 === 0
          ? "text-[rgb(255,0,0)]"
          : changeTheme
          ? "text-gray-700"
          : "text-gray-700"
      }`}
    >
      {["hours", "minutes", "seconds"].map((unit, index) => (
        <div key={unit} className="flex flex-row items-center">
          <div className="flex flex-col items-center">
            <div className="text-2xl">
              {timeLeft[unit].toString().padStart(2, "0")}
            </div>
          </div>
          {index < 2 && <div className="text-2xl pl-3">:</div>}
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
