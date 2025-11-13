import React, { useContext, useState } from "react";
import { API } from "../Api_Link";
import Loader from "./Loader";
import { US, ES, FR, DE, JP, IT, SY, KR } from "country-flag-icons/react/3x2";
import { Change_Theme_context, Save_To_Notepad_context } from "../Contexts";
import { useTranslation } from "react-i18next";
import Alert from "../Components/Alert";
import { IoIosSave } from "react-icons/io";

const Linguistics = ({ props }) => {
  const [language, setLanguage] = useState("");
  const [wordsNumber, setWordsNumber] = useState("");
  const [words, setWords] = useState([]);
  const [sounds, setSounds] = useState([]);
  const [sentence, setSentence] = useState("");
  const [loading, setLoading] = useState(false);
  const [traslateLoading, setTraslateLoading] = useState(false);
  const [translated, setTranslated] = useState(false);
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [save_ToNotepad, setSave_ToNotepad] = useContext(
    Save_To_Notepad_context
  );
  const [genClicked, setGenClicked] = useState(false);
  const [traClicked, setTraClicked] = useState(false);
  const { t } = useTranslation();
  const { notifyS, notifyE, notifyW, notifyI } = Alert({ changeTheme });

  const languages = [
    { lang: "English", code: "English", Flag: US },
    { lang: "Arabic", code: "Arabic", Flag: SY },
    { lang: "Spanish", code: "Spanish", Flag: ES },
    { lang: "French", code: "French", Flag: FR },
    { lang: "German", code: "German", Flag: DE },
    { lang: "Japanese", code: "Japanese", Flag: JP },
    { lang: "Korean", code: "Korean", Flag: KR },
    { lang: "Italian", code: "Italian", Flag: IT },
  ];

  const generateWords = async () => {
    setGenClicked(true);
    setTimeout(() => setGenClicked(false), 100);

    if (!language) return notifyW(t("DragCompo.Linguistics.notifyW1"));
    if (wordsNumber == 0) return notifyW(t("DragCompo.Linguistics.notifyW2"));
    if (wordsNumber > 10) return notifyE(t("DragCompo.Linguistics.notifyE1"));
    setLoading(true);

    try {
      const prompt = `
      Generate ${wordsNumber} useful ${language} words and a short sentence using all of them.
      For each word, include its full pronunciation or phonetic reading in english (IPA or simple phonetic spelling).
      Format the response strictly as JSON:
      {
        "words": ["word1", "word2", "word3", "word4", "word5" ...],
        "sounds": ["sound1", "sound2", "sound3", "sound4", "sound5" ...],
        "sentence": "sentence using all words"
      }
      `;

      const res = await fetch(`${API}/dashboard/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (!data.answer) return notifyW("No response from AI");

      let parsed;
      try {
        parsed = JSON.parse(data.answer);
      } catch {
        const match = data.answer.match(/\{[\s\S]*\}/);
        parsed = match ? JSON.parse(match[0]) : null;
      }

      if (parsed && parsed.words && parsed.sounds && parsed.sentence) {
        setWords(parsed.words);
        setSounds(parsed.sounds);
        setSentence(parsed.sentence);
        notifyS(t("DragCompo.Linguistics.notifyS1"));
      } else {
        setWords([]);
        setSounds([]);
        setSentence(data.answer);
      }
    } catch (err) {
      console.error("Error:", err);
      notifyE("Error contacting AI");
    } finally {
      setLoading(false);
    }
  };

  const translateContent = async () => {
    setTraClicked(true);
    setTimeout(() => setTraClicked(false), 100);

    if (!words.length && !sentence)
      return notifyE(t("DragCompo.Linguistics.notifyE2"));
    if (!language) return notifyW(t("DragCompo.Linguistics.notifyW1"));
    setTraslateLoading(true);

    try {
      const targetLang = translated ? language : props.translateTo;
      const prompt = `
      Translate the following ${
        translated ? props.translateTo : language
      } words and their phonetic readings in english, along with the sentence, into ${targetLang}.
      Format as JSON:
      {
        "words": ["word1", "word2", "word3", "word4", "word5" ...],
        "sounds": ["sound1", "sound2", "sound3", "sound4", "sound5" ...],
        "sentence": "translated sentence"
      }
      Words: ${JSON.stringify(words)}
      Sounds: ${JSON.stringify(sounds)}
      Sentence: "${sentence}"
      `;

      const res = await fetch(`${API}/dashboard/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (!data.answer) return notifyE("No response from AI");

      let parsed;
      try {
        parsed = JSON.parse(data.answer);
      } catch {
        const match = data.answer.match(/\{[\s\S]*\}/);
        parsed = match ? JSON.parse(match[0]) : null;
      }

      if (parsed && parsed.words && parsed.sounds && parsed.sentence) {
        setWords(parsed.words);
        setSounds(parsed.sounds);
        setSentence(parsed.sentence);
        setTranslated(!translated);
      } else {
        notifyW("Couldn't parse translation");
      }
    } catch (err) {
      console.error("Error:", err);
      notifyE("Error translating content");
    } finally {
      setTraslateLoading(false);
    }
  };

  return (
    <div
      title={props.title}
      className={`flex flex-col w-full h-full bg-white p-5 gap-5 border rounded-xl shadow-md ${
        changeTheme ? "shadow-lightTeal " : "shadow-mainColor"
      }`}
    >
      <div className="flex items-center justify-center gap-5 text-2xl font-bold text-center">
        {language &&
          (() => {
            const selectedLang = languages.find((l) => l.lang === language);
            const FlagIcon = selectedLang?.Flag;
            return FlagIcon ? (
              <FlagIcon className="w-12 border rounded-lg" />
            ) : null;
          })()}
        {t("DragCompo.Linguistics.Title")}
      </div>

      <div className="flex w-full gap-5">
        <select
          className="w-[50%] p-2 border rounded-lg outline-none text-black font-bold"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">{t("DragCompo.Linguistics.Select")}</option>
          {languages.map((l, index) => (
            <option key={index} value={l.lang}>
              {l.lang}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          max="10"
          className="w-[50%] p-2 outline-none border rounded-lg text-black font-bold"
          placeholder={t("DragCompo.Linguistics.Placeholder")}
          value={wordsNumber}
          onChange={(e) => setWordsNumber(Number(e.target.value))}
        />
      </div>

      <div className="flex w-full justify-center gap-5">
        <button
          onClick={generateWords}
          disabled={loading}
          className={`flex w-full max-w-[70%] bg-blue-500 hover:bg-blue-600 items-center justify-center text-white p-2 rounded-lg font-semibold shadow-black ${
            genClicked ? "shadow-inner" : "shadow-md"
          }`}
        >
          {loading ? (
            <Loader type="ring" color="#ffffff" color2="#ffffff" />
          ) : (
            t("DragCompo.Linguistics.Generate")
          )}
        </button>
        {words.length > 0 ? (
          <button
            onClick={translateContent}
            disabled={traslateLoading || !words.length}
            className={`flex w-full max-w-[70%] bg-green-500 hover:bg-green-600 items-center justify-center text-white p-2 rounded-lg font-semibold shadow-black ${
              traClicked ? "shadow-inner" : "shadow-md"
            }`}
          >
            {traslateLoading ? (
              <Loader type="ring" color="#ffffff" />
            ) : translated ? (
              t("DragCompo.Linguistics.Original")
            ) : (
              t("DragCompo.Linguistics.Translate")
            )}
          </button>
        ) : (
          <></>
        )}
        {props.InteractWith ? (
          <button
            onClick={() =>
              setSave_ToNotepad((prev) => [
                ...prev,
                {
                  textKey: "Words & Sentence",
                  value: (
                    <div>
                      <div>Words:</div>
                      {words.join(" , ")}
                      <br />
                      <div>Sentence:</div>
                      {sentence}
                    </div>
                  ),
                  NoteTitle: props.InteractWith,
                },
              ])
            }
            className="bg-green-500 p-1 w-[70%] justify-center flex items-center gap-2 text-white font-semibold shadow-black shadow-md text-md rounded-lg"
          >
            <IoIosSave size={20} /> Save to Notepad
          </button>
        ) : (
          <></>
        )}
      </div>

      {words.length > 0 && (
        <div className="w-full">
          <div className="font-bold text-xl mb-2">
            {t("DragCompo.Linguistics.New")}
          </div>

          <div className="grid grid-cols-2 w-full gap-5">
            {Array.from({ length: Math.ceil(words.length / 5) }).map(
              (_, colIndex) => {
                const start = colIndex * 5;
                const columnWords = words.slice(start, start + 5);
                const columnSounds = sounds.slice(start, start + 5);

                return (
                  <ul
                    key={colIndex}
                    className="list-disc list-inside  w-full font-semibold"
                  >
                    {columnWords.map((w, i) => (
                      <li key={i}>
                        {w}{" "}
                        {columnSounds[i] && (
                          <span className="text-gray-400 italic text-sm">
                            ({columnSounds[i]})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                );
              }
            )}
          </div>
        </div>
      )}

      {sentence && (
        <div>
          <div className="font-bold text-xl">
            {t("DragCompo.Linguistics.Sentence")}
          </div>
          <p className="font-semibold">{sentence}</p>
        </div>
      )}
    </div>
  );
};

export default Linguistics;
