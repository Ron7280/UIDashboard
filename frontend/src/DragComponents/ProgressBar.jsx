import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Change_Theme_context, Video_Interact_context } from "../Contexts";

const ProgressBar = ({ width, height, value }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [videoInteract] = useContext(Video_Interact_context);
  const currentTime = videoInteract?.Prog ?? 0;
  const progressPercentage =
    value || Math.min(((currentTime / value) * 500).toFixed(0), 100);

  return (
    <div style={{ width, height }}>
      <div className="w-full flex items-center gap-3">
        <div className="flex-1 h-5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${
              progressPercentage > 75
                ? "bg-red-600"
                : progressPercentage > 50
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div
          className={`${
            changeTheme ? "text-white" : ""
          } text-md font-medium w-14 text-right`}
        >
          {progressPercentage}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
