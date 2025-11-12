import React, { useContext, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Change_Theme_context } from "../Contexts";

const FibonacciChart = ({ props }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [count, setCount] = useState(10);
  const [sequence, setSequence] = useState(generateFibonacci(10));

  function generateFibonacci(n) {
    const arr = [0, 1];
    for (let i = 2; i < n; i++) {
      arr.push(arr[i - 1] + arr[i - 2]);
    }
    return arr.slice(0, n);
  }

  const handleGenerate = () => {
    const num = Math.max(1, parseInt(count));
    setSequence(generateFibonacci(num));
  };

  const handleReset = () => {
    setCount(10);
    setSequence(generateFibonacci(10));
  };

  const data = sequence.map((value, index) => ({ index, value }));

  return (
    <div className="w-full h-full p-2 gap-3 flex flex-col bg-white rounded-2xl shadow-lg">
      <div className="text-2xl font-bold mb-4 text-center">
        Fibonacci Generator
      </div>

      <div className="flex justify-center  gap-4 ">
        <input
          type="number"
          value={count}
          min={5}
          max={50}
          onChange={(e) => setCount(e.target.value)}
          className={`border p-1 w-[30%] text-center rounded-lg outline-none text-black font-semibold`}
          placeholder="Count"
        />
        <button
          onClick={handleGenerate}
          className={`${
            changeTheme ? "bg-mainColor2" : "bg-mainColor"
          } text-white p-1 pl-4 pr-4 rounded-lg shadow-black shadow-md font-semibold`}
        >
          Generate
        </button>
        <button
          onClick={handleReset}
          className="bg-orange-500 text-white p-1 pl-4 pr-4 rounded-lg shadow-black shadow-md font-semibold"
        >
          Reset
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="font-medium">Sequence :</div>
        <div className="text-black  font-semibold text-lg">
          {sequence.join(", ")}
        </div>
      </div>

      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={changeTheme ? "#0f766e" : "#4338ca"}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FibonacciChart;
