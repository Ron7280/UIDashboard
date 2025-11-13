import React from "react";
import { useDrag } from "react-dnd";
import { HiOutlineMenu } from "react-icons/hi";

const ComponentItem = ({ type, index, DEFAULT_PROPS, changeTheme }) => {
  const Icon = DEFAULT_PROPS[type]?.icon;

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "COMPONENT",
    item: { type },
    collect: (m) => ({ isDragging: !!m.isDragging() }),
  }));

  return (
    <div
      id={index}
      ref={dragRef}
      className={`flex items-center justify-between gap-3 p-3 mb-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-transform transform ${
        isDragging ? "scale-95 opacity-80 cursor-grabbing" : "cursor-grab"
      } `}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 bg-gradient-to-br ${
            changeTheme
              ? "from-SecondryTeal to-mainColor2"
              : "from-lightIndigo to-mainColor"
          }
          rounded-md flex items-center justify-center text-white font-bold text-sm`}
        >
          {Icon ? <Icon size={20} /> : type[0]}
        </div>
        <div className="text-sm font-semibold text-gray-700">{type}</div>
      </div>
      <div className="text-gray-400">
        <HiOutlineMenu
          size={25}
          className={`${changeTheme ? "text-lightTeal" : ""}`}
        />
      </div>
    </div>
  );
};

export default ComponentItem;
