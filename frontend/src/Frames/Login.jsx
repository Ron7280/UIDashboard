import React, { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import Alert from "../Components/Alert";
import { Change_Theme_context } from "../Contexts";
import { IoIosLogIn } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { notifyS, notifyE, notifyW, notifyI } = Alert({ changeTheme });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !fname || !lname) {
      notifyI("Please enter all credentials");
      return;
    }
    if (password.length < 8) {
      notifyW("Password is too short");
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("fname", fname);
    localStorage.setItem("lname", lname);

    navigate("/dashboard");
    notifyS("Logged in successfully!");
  };

  const Fields = [
    {
      icon: FaUser,
      title: "Username",
      type: "text",
      placeholder: "Your username . . .",
      value: username,
      onchange: (e) => setUsername(e.target.value),
    },
    {
      icon: FaUser,
      title: "First Name",
      type: "text",
      placeholder: "Your first name . . .",
      value: fname,
      onchange: (e) => setFname(e.target.value),
    },
    {
      icon: FaUser,
      title: "Last Name",
      type: "text",
      placeholder: "Your last name . . .",
      value: lname,
      onchange: (e) => setLname(e.target.value),
    },
    {
      icon: RiLockPasswordFill,
      icon2: password ? (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-white"
        >
          {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
        </button>
      ) : null,
      title: "Password",
      placeholder: "Your password . . .",
      type: showPassword ? "text" : "password",
      value: password,
      onchange: (e) => setPassword(e.target.value),
    },
  ];

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full max-w-lg border border-white/20">
        <div className="text-3xl flex items-center justify-center gap-2 font-semibold text-white  mb-6">
          <BiSolidDashboard size={40} />
          UI Dashboard
        </div>
        <form
          className="flex flex-col space-y-5 font-semibold"
          onSubmit={handleSubmit}
        >
          {Fields.map((f, index) => {
            return (
              <div className="flex flex-col gap-1">
                <div className="text-gray-200 mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <f.icon size={20} />
                    {f.title}
                  </div>
                  {f.icon2 ? f.icon2 : <></>}
                </div>
                <input
                  type={f.type}
                  className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 outline-none"
                  placeholder={f.placeholder}
                  value={f.value}
                  onChange={f.onchange}
                />
              </div>
            );
          })}

          <button
            type="submit"
            className="bg-mainColor flex items-center gap-2 justify-center outline-none font-semibold 
            transition-all text-white py-3 rounded-lg shadow-lg"
          >
            Login <IoIosLogIn size={25} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
