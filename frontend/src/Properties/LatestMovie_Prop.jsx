import React from "react";
import TitleSetter from "../Components/TitleSetter";

const LatestMovie_Prop = ({ selectedComponent, handlePropChange }) => {
  return (
    <div className="flex flex-col gap-4">
      <TitleSetter
        compName={selectedComponent.type}
        handlePropChange={handlePropChange}
        defaultValue={selectedComponent.props?.title}
      />
    </div>
  );
};

export default LatestMovie_Prop;
