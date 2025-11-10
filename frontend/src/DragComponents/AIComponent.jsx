import React, { useContext, useEffect, useState } from "react";
import { LuBrainCircuit } from "react-icons/lu";
import { Ask_AI_context, Change_Theme_context } from "../Contexts";
import Loader from "./Loader";
import { useTranslation } from "react-i18next";
import { API } from "../Api_Link";

const AIComponent = ({ props, response, onChangePrompt }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(response);
  const [ask_AI, setAsk_AI] = useContext(Ask_AI_context);
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [btnClicked, setBtnClicked] = useState(false);
  const { t } = useTranslation();

  useEffect(() => setAnswer(response), [response]);

  const askAI = async () => {
    setLoading(true);
    setBtnClicked(true);

    setTimeout(() => {
      setBtnClicked(false);
    }, 100);
    try {
      const res = await fetch(`${API}/dashboard/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setAnswer(data.answer);
      onChangePrompt?.(input, data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Error: Unable to get AI response.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ask_AI.active && ask_AI.targetTitle === props.title) {
      askAI();
      setAsk_AI({ active: false, targetTitle: "" });
    }
  }, [ask_AI]);

  return (
    <div
      title={props.title}
      className={`flex flex-col gap-2 p-3 w-full h-full bg-white shadow-lg ${
        changeTheme ? "shadow-lightTeal" : "shadow-mainColor"
      } rounded-xl`}
    >
      <div className="flex items-center justify-center gap-3">
        <LuBrainCircuit
          size={40}
          className={`${changeTheme ? "text-mainColor2" : "text-mainColor"}`}
        />
        <textarea
          className="border rounded-md font-semibold w-full flex-1 p-2 resize-none placeholder:p-3 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("DragCompo.AI.Placeholder")}
        />
        <button
          onClick={askAI}
          disabled={loading}
          className={` text-white rounded-lg p-3 ${
            btnClicked ? "shadow-inner" : "shadow-md"
          } shadow-black  transition disabled:opacity-50
            ${
              changeTheme
                ? "bg-mainColor2 hover:bg-SecondryTeal"
                : "bg-mainColor hover:bg-lightIndigo"
            }`}
        >
          {loading ? (
            <Loader color="#ffffff" type="spinner" />
          ) : (
            t("DragCompo.AI.Ask")
          )}
        </button>
      </div>
      <div className="mt-2 p-2 text-lg font-semibold rounded-md text-gray-700 overflow-auto scrollbar-thin scrollbar-thumb-lightIndigo scrollbar-track-white flex-1">
        {answer || t("DragCompo.AI.Response")}
      </div>
    </div>
  );
};

export default AIComponent;
