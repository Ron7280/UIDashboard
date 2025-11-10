import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Context";
import { API } from "./Api";
// import preloader from "../src/Img/preloader.gif";

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const Token = sessionStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const LogOut = async () => {
    try {
      const response = await fetch(`${API}/logging/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: Token,
        }),
      });
    } catch (error) {
      console.error("logout error:", error);
      notifyE("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    const Token = sessionStorage.getItem("token");
    if (storedUserId && Token) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      setUserToken(Token);
    }
  }, []);

  const login = (userId) => {
    setIsAuthenticated(true);
    setUserId(userId);
    sessionStorage.setItem("userId", userId);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/mainBoard/agent");
    }, 2500);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    LogOut();
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 2500);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userToken, userId, login, logout }}
    >
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-full w-full">
          <img src={preloader} alt="Loading..." />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
