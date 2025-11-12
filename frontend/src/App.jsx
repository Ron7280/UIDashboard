import { Route, Routes } from "react-router-dom";
import MainDashboard from "./Frames/MainDashboard";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useState } from "react";
import {
  Ask_AI_context,
  Change_Image_context,
  Change_Language_context,
  Change_Rate_context,
  Change_Theme_context,
  Chart_Trimm_context,
  Check_Box_context,
  Save_To_Notepad_context,
  Set_MainName_context,
  Stop_Timer_context,
  Toggle_context,
  Video_Interact_context,
  Video_Progress_context,
} from "./Contexts";

function App() {
  const [ask_AI, setAsk_AI] = useState({ active: false, targetTitle: "" });
  const [changeTheme, setChangeTheme] = useState(false);
  const [chart_Trimm, setChart_Trimm] = useState({
    Slice: "",
    targetTitle: "",
  });
  const [toggle, setToggle] = useState({ active: false, targetTitle: "" });
  const [check_Box, setCheck_Box] = useState({
    active: false,
    targetTitle: "",
  });
  const [change_Rate, setChange_Rate] = useState({
    stars: "",
    targetTitle: "",
  });
  const [change_Image, setChange_Image] = useState({
    active: false,
    newSrc: "",
    targetTitle: "",
  });
  const [videoInteract, setVideoInteract] = useState({
    Prog: "",
    targetTitle: "",
  });
  const [videoProgress, setVideoProgress] = useState();
  const [stopTimer, setStopTimer] = useState();
  const [set_MainName, setSet_MainName] = useState();
  const [save_ToNotepad, setSave_ToNotepad] = useState([]);
  const [changeLanguage, setChangeLanguage] = useState({
    status: false,
    lang1: "",
    lang2: "",
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Change_Theme_context.Provider value={[changeTheme, setChangeTheme]}>
        <Ask_AI_context.Provider value={[ask_AI, setAsk_AI]}>
          <Check_Box_context.Provider value={[check_Box, setCheck_Box]}>
            <Toggle_context.Provider value={[toggle, setToggle]}>
              <Chart_Trimm_context.Provider
                value={[chart_Trimm, setChart_Trimm]}
              >
                <Change_Rate_context.Provider
                  value={[change_Rate, setChange_Rate]}
                >
                  <Change_Image_context.Provider
                    value={[change_Image, setChange_Image]}
                  >
                    <Video_Progress_context.Provider
                      value={[videoProgress, setVideoProgress]}
                    >
                      <Video_Interact_context.Provider
                        value={[videoInteract, setVideoInteract]}
                      >
                        <Change_Language_context.Provider
                          value={[changeLanguage, setChangeLanguage]}
                        >
                          <Stop_Timer_context.Provider
                            value={[stopTimer, setStopTimer]}
                          >
                            <Set_MainName_context.Provider
                              value={[set_MainName, setSet_MainName]}
                            >
                              <Save_To_Notepad_context.Provider
                                value={[save_ToNotepad, setSave_ToNotepad]}
                              >
                                <Routes>
                                  <Route path="/" element={<MainDashboard />} />
                                </Routes>
                              </Save_To_Notepad_context.Provider>
                            </Set_MainName_context.Provider>
                          </Stop_Timer_context.Provider>
                        </Change_Language_context.Provider>
                      </Video_Interact_context.Provider>
                    </Video_Progress_context.Provider>
                  </Change_Image_context.Provider>
                </Change_Rate_context.Provider>
              </Chart_Trimm_context.Provider>
            </Toggle_context.Provider>
          </Check_Box_context.Provider>
        </Ask_AI_context.Provider>
      </Change_Theme_context.Provider>
    </DndProvider>
  );
}

export default App;
