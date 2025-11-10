import React, { useContext, useState } from "react";

import { FaTrash, FaPlus } from "react-icons/fa";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";
const Notepad = ({
  type = "text",
  content = "",
  todos = [],
  title,
  onChange,
}) => {
  const [text, setText] = useState(content);
  const [items, setItems] = useState(todos);
  const [newTodo, setNewTodo] = useState("");
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    const updated = [...items, { text: newTodo, done: false }];
    setItems(updated);
    onChange?.({ todos: updated });
    setNewTodo("");
  };

  const handleToggle = (index) => {
    const updated = [...items];
    updated[index].done = !updated[index].done;
    setItems(updated);
    onChange?.({ todos: updated });
  };

  const handleDelete = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    onChange?.({ todos: updated });
  };

  return (
    <div
      className={`p-3 bg-white rounded-lg  w-full h-full flex
     flex-col gap-2 shadow-md ${
       changeTheme ? "shadow-lightTeal" : "shadow-mainColor"
     }`}
    >
      <div className="text-lg font-bold text-gray-700 text-center ">
        {title}
      </div>

      {type === "text" && (
        <textarea
          className="border rounded-md p-2 flex-1 resize-none outline-none"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            onChange?.({ content: e.target.value });
          }}
          placeholder={t("DragCompo.Notepad.Placeholder")}
        />
      )}

      {type === "todo" && (
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
          <div className="flex gap-2 mb-2">
            <input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder={t("DragCompo.Notepad.TodoPlaceholder")}
              className="flex-1 border rounded-md px-2 py-1 outline-none"
            />
            <button
              onClick={handleAddTodo}
              className={`${changeTheme ? "bg-SecondryTeal" : "bg-mainColor"}
                 text-white px-3 py-1 rounded-md`}
            >
              <FaPlus />
            </button>
          </div>

          {items.map((todo, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b py-1"
            >
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => handleToggle(idx)}
                  className="outline-none"
                />
                <div
                  className={`${todo.done ? "line-through text-gray-500" : ""}`}
                >
                  {todo.text}
                </div>
              </label>
              <button
                onClick={() => handleDelete(idx)}
                className="text-red-600 hover:text-red-700"
              >
                <FaTrash size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notepad;
