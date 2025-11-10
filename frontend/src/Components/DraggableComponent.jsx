import React, { useContext, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { motion } from "framer-motion";
import RenderComponent from "./RenderComponent";
import { IoResizeOutline } from "react-icons/io5";
import { Change_Theme_context } from "../Contexts";

const DraggableComponent = ({
  comp,
  idx,
  moveComponent,
  fullScreen,
  handlePropChange,
  setSelectedIndex,
  selectedIndex,
  DEFAULT_PROPS,
}) => {
  const [changeTheme] = useContext(Change_Theme_context);
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "COMPONENT",
    hover(item) {
      if (!ref.current) return;
      const dragIndex = item.idx;
      const hoverIndex = idx;
      if (dragIndex === hoverIndex) return;
      moveComponent(dragIndex, hoverIndex);
      item.idx = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "COMPONENT",
    item: { id: comp.id, type: comp.type, idx },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const initResize = (e) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = comp.props?.width ?? 200;
    const startHeight = comp.props?.height ?? 100;

    const onMouseMove = (eMove) => {
      const newWidth = Math.max(50, startWidth + (eMove.clientX - startX));
      const newHeight = Math.max(30, startHeight + (eMove.clientY - startY));
      handlePropChange("width", newWidth, idx);
      handlePropChange("height", newHeight, idx);
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <motion.div
      ref={ref}
      onClick={() => setSelectedIndex(idx)}
      layout
      className={`relative rounded-lg group  ${
        !fullScreen ? "shadow-md border" : ""
      } cursor-move ${
        selectedIndex === idx && !fullScreen
          ? `ring-2 ${changeTheme ? "ring-lightTeal" : "ring-indigo-300"}`
          : ""
      } ${isDragging ? "opacity-50" : "opacity-100"}`}
      style={{
        width: comp.props?.width ?? 200,
        height: comp.props?.height ?? 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        minHeight: 50,
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <RenderComponent
          comp={comp}
          handlePropChange={handlePropChange}
          DEFAULT_PROPS={DEFAULT_PROPS}
        />
      </div>

      {!fullScreen && (
        <div
          className={`absolute bottom-1 right-1 ${
            changeTheme ? "text-lightTeal" : "text-mainColor"
          } cursor-se-resize
             opacity-0 group-hover:opacity-100 transition-opacity`}
          onMouseDown={initResize}
        >
          <IoResizeOutline size={15} />
        </div>
      )}
    </motion.div>
  );
};

export default DraggableComponent;
