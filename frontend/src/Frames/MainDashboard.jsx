import React, { useState } from "react";
import LeftSide from "./LeftSide";
import Dashboard from "./Dashboard";
import RightSide from "./RightSide";

const MainDashboard = () => {
  const [components, setComponents] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);

  const handlePropChange = (prop, value, idx = selectedIndex) => {
    if (idx === null) return;
    setComponents((prev) => {
      const copy = [...prev];
      const compProps = copy[idx].props || {};

      if (prop === "tempStartTime") {
        copy[idx].props = {
          ...compProps,
          tempStartTime: { ...(compProps.tempStartTime || {}), ...value },
        };
      } else {
        copy[idx].props = { ...compProps, [prop]: value };
      }

      return copy;
    });
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {!fullScreen && <LeftSide />}

      <Dashboard
        components={components}
        setComponents={setComponents}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        handlePropChange={handlePropChange}
        fullScreen={fullScreen}
        setFullScreen={setFullScreen}
      />

      {!fullScreen && (
        <RightSide
          components={components}
          setComponents={setComponents}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          handlePropChange={handlePropChange}
        />
      )}
    </div>
  );
};

export default MainDashboard;
