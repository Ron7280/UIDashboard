import React, { useContext, useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import Loader from "./Loader";
import { Change_Theme_context } from "../Contexts";
import { API } from "../API_URL";

const getNestedValue = (obj, keyPath) => {
  return keyPath
    .split(".")
    .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
};

const Speedometer = ({ props, handlePropChange }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [value, setValue] = useState(0);
  const [cpuData, setCpuData] = useState({});

  const fetchCpuData = async () => {
    try {
      const res = await fetch(`${API}/dashboard/cpu`);
      const json = await res.json();
      const data = json.data ?? json;
      setCpuData(data);

      const val = getNestedValue(data, props.speed);
      setValue(typeof val === "number" ? val : Number(val) || 0);
    } catch (err) {
      console.error("Failed to fetch CPU data:", err);
    }
  };

  useEffect(() => {
    fetchCpuData();
    // const interval = setInterval(fetchCpuData, 1000);
    // return () => clearInterval(interval);
  }, [props.speed]);

  return (
    <div
      className={`w-full h-full flex flex-col justify-center items-center 
      gap-4 rounded-xl p-1 bg-white shadow-md ${
        changeTheme ? "shadow-mainColor2 " : "shadow-mainColor"
      }`}
    >
      <div className="w-full h-full">
        <ReactSpeedometer
          maxValue={100}
          value={props.speed}
          needleColor="blue"
          startColor="green"
          endColor="red"
          segments={10}
          currentValueText={`${props.speed}`}
        />
      </div>
    </div>
  );
};

export default Speedometer;
