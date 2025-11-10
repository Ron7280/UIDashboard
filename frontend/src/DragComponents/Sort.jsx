import React, { useState, useEffect, useRef, useContext } from "react";
import Loader from "./Loader";
import { Change_Theme_context } from "../Contexts";
import { GiNetworkBars } from "react-icons/gi";
import { SiThealgorithms } from "react-icons/si";
import Alert from "../Components/Alert";
import { useTranslation } from "react-i18next";
import { GiSandsOfTime } from "react-icons/gi";

const Sort = ({ props }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [array, setArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [algorithm, setAlgorithm] = useState("");
  const [isSorting, setIsSorting] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [timeTaken, setTimeTaken] = useState(0);
  const [density, setDensity] = useState(50);
  const timerRef = useRef(null);
  const stopFlag = useRef(false);
  const { t } = useTranslation();

  const { notifyS, notifyE, notifyW, notifyI } = Alert({ changeTheme });

  useEffect(() => {
    resetArray();
    if (density > 200) {
      notifyI(t("DragCompo.Sort.NotifyI1"));
    }
  }, [density]);

  const resetArray = () => {
    const numBars = Math.max(5, Math.min(350, Number(density)));
    const arr = Array.from(
      { length: numBars },
      () => Math.floor(Math.random() * 90) + 10
    );
    setArray(arr);
    setOriginalArray([...arr]);
    setIsSorting(false);
    setTimeTaken(0);
    stopFlag.current = false;
    clearInterval(timerRef.current);
  };

  const resetCurrentArray = () => {
    setArray([...originalArray]);
    setIsSorting(false);
    stopFlag.current = true;
    clearInterval(timerRef.current);
    setTimeTaken(0);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const startTimer = () => {
    const start = Date.now();
    timerRef.current = setInterval(() => {
      setTimeTaken(((Date.now() - start) / 1000).toFixed(2));
    }, 50);
  };

  const stopSorting = () => {
    stopFlag.current = true;
    setIsSorting(false);
    clearInterval(timerRef.current);
  };

  const bubbleSort = async () => {
    let arr = [...array];
    setIsSorting(true);
    stopFlag.current = false;
    startTimer();

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (stopFlag.current) return stopSorting();
        if (
          (sortOrder === "asc" && arr[j] > arr[j + 1]) ||
          (sortOrder === "desc" && arr[j] < arr[j + 1])
        ) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(50);
        }
      }
    }
    setArray(
      [...arr]
        .sort((a, b) => (sortOrder === "asc" ? a - b : b - a))
        .map(Math.floor)
    );

    stopSorting();
  };

  const selectionSort = async () => {
    let arr = [...array];
    setIsSorting(true);
    stopFlag.current = false;
    startTimer();

    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (stopFlag.current) return stopSorting();
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
        await sleep(50);
      }
    }
    setArray(
      [...arr]
        .sort((a, b) => (sortOrder === "asc" ? a - b : b - a))
        .map(Math.floor)
    );

    stopSorting();
  };

  const insertionSort = async () => {
    let arr = [...array];
    setIsSorting(true);
    stopFlag.current = false;
    startTimer();

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        if (stopFlag.current) return stopSorting();
        arr[j + 1] = arr[j];
        j--;
        setArray([...arr]);
        await sleep(50);
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }

    setArray(
      [...arr]
        .sort((a, b) => (sortOrder === "asc" ? a - b : b - a))
        .map(Math.floor)
    );
    stopSorting();
  };

  const quickSort = async () => {
    let arr = [...array];
    setIsSorting(true);
    stopFlag.current = false;
    startTimer();

    const qs = async (a, left, right) => {
      if (left >= right || stopFlag.current) return;
      let pivot = a[right];
      let i = left;
      for (let j = left; j < right; j++) {
        if (stopFlag.current) return;
        if (a[j] < pivot) {
          [a[i], a[j]] = [a[j], a[i]];
          i++;
          setArray([...a]);
          await sleep(50);
        }
      }
      [a[i], a[right]] = [a[right], a[i]];
      setArray([...a]);
      await sleep(50);
      await qs(a, left, i - 1);
      await qs(a, i + 1, right);
    };

    await qs(arr, 0, arr.length - 1);
    setArray(
      [...arr]
        .sort((a, b) => (sortOrder === "asc" ? a - b : b - a))
        .map(Math.floor)
    );

    stopSorting();
  };

  const handleSort = async () => {
    if (!algorithm) {
      notifyW(t("DragCompo.Sort.NotifyW1"));
      return;
    }
    if (algorithm === "bubble") await bubbleSort();
    else if (algorithm === "selection") await selectionSort();
    else if (algorithm === "insertion") await insertionSort();
    else if (algorithm === "quick") await quickSort();
  };

  const buttons = [
    {
      label: t("DragCompo.Sort.SortBTN"),
      onClick: handleSort,
      disabled: isSorting,
      color: " bg-mainColor",
      content: isSorting ? (
        <Loader type="dots" color="#ffffff" color2="#ffffff" />
      ) : (
        t("DragCompo.Sort.SortBTN")
      ),
    },
    {
      label: t("DragCompo.Sort.StopBTN"),
      onClick: stopSorting,
      disabled: !isSorting,
      color: "bg-red-500 ",
    },
    {
      label: t("DragCompo.Sort.NewData"),
      onClick: resetArray,
      disabled: isSorting,
      color: "bg-green-500 ",
    },
    {
      label: t("DragCompo.Sort.ResetArray"),
      onClick: resetCurrentArray,
      disabled: isSorting,
      color: "bg-orange-400 ",
    },
  ];

  return (
    <div
      title={props.title}
      className={`p-2 gap-3 w-full h-full flex flex-col rounded-lg ${
        changeTheme ? "text-white" : ""
      }`}
    >
      <div className="flex justify-between items-center gap-10">
        <div className="text-2xl  font-semibold text-center">
          {t("DragCompo.Sort.Title")}
        </div>
        {timeTaken > 0 ? (
          <div className="flex items-center gap-2 w-[20%] text-center text-xl font-medium">
            <GiSandsOfTime
              size={30}
              className={` ${
                changeTheme ? "text-lightTeal" : "text-mainColor"
              } ${isSorting ? "animate-spin" : ""}`}
            />
            <div className=" w-full items-end flex">
              {t("DragCompo.Sort.Time")}: {timeTaken} {t("DragCompo.Sort.S")}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex w-full gap-3">
        <div className="flex flex-col w-[50%] gap-1 justify-start items-center  ">
          <div className="flex w-full justify-start items-center gap-2 font-semibold text-lg">
            <SiThealgorithms size={25} />
            {t("DragCompo.Sort.SelectAlgo")}
          </div>
          <select
            disabled={isSorting}
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className={`border p-1 w-full rounded-lg outline-none  ${
              isSorting ? "cursor-not-allowed" : ""
            } text-black font-semibold`}
          >
            <option disabled value="">
              {t("DragCompo.Sort.Select")}
            </option>
            <option value="bubble">{t("DragCompo.Sort.BubbleSort")}</option>
            <option value="selection">
              {t("DragCompo.Sort.SelectionSort")}
            </option>
            <option value="insertion">
              {t("DragCompo.Sort.InsertionSort")}
            </option>
            <option value="quick"> {t("DragCompo.Sort.QuickSort")}</option>
          </select>
        </div>
        <div className="flex gap-3 w-[50%] justify-center items-center ">
          <div className="flex justify-center items-center gap-2 font-semibold text-lg">
            <GiNetworkBars size={25} />
            {t("DragCompo.Sort.Density")}
          </div>
          <input
            disabled={isSorting}
            type="number"
            min={25}
            max={350}
            value={density}
            onChange={(e) => setDensity(Number(e.target.value))}
            className={`border p-1 w-[50%] rounded-lg outline-none ${
              isSorting ? "cursor-not-allowed" : ""
            } text-black font-semibold`}
          />
          <select
            disabled={isSorting}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={`border p-1 w-[25%] rounded-lg outline-none ${
              isSorting ? "cursor-not-allowed" : ""
            } text-black font-semibold`}
          >
            <option value="asc">{t("DragCompo.Sort.Ascending")}</option>
            <option value="desc">{t("DragCompo.Sort.Descending")}</option>
          </select>
        </div>
      </div>
      <div className="flex w-full gap-3 justify-center">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            disabled={btn.disabled}
            className={`p-1 rounded-lg shadow-black shadow-md w-[20%] items-center justify-center flex font-semibold text-white ${
              btn.color
            } ${btn.disabled ? "cursor-not-allowed" : ""}`}
          >
            {btn.content || btn.label}
          </button>
        ))}
      </div>
      <div className="flex w-full h-full justify-center items-end gap-1 p-4 rounded-lg ">
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`${
              changeTheme ? "bg-lightTeal" : "bg-mainColor"
            } rounded-t-full`}
            style={{
              height: `${Math.floor(value * 4)}px`,
              width: `${Math.max(4, Math.floor(400 / array.length))}px`,
              transition: "height 0.2s ease",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Sort;
