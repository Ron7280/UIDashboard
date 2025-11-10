import React, { useContext, useEffect, useState } from "react";
import { Change_Theme_context } from "../Contexts";
import Loader from "./Loader";
import { useTranslation } from "react-i18next";

const API = ({ props }) => {
  const [changeTheme] = useContext(Change_Theme_context);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const fetchApi = async () => {
    try {
      setLoading(true);
      setError(null);

      const options = {
        method: props.method.toUpperCase(),
        headers: { "Content-Type": "application/json" },
      };

      if (options.method === "POST" && props.body) {
        options.body = JSON.stringify(JSON.parse(props.body));
      }

      const response = await fetch(props.api, options);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props) fetchApi();
  }, [props]);

  if (loading)
    return (
      <div className="p-4 text-center">
        <Loader type="bars" size={20} />
      </div>
    );

  if (!props.api)
    return (
      <div
        className={`p-4 font-bold ${
          changeTheme ? "text-white" : "text-gray-700"
        } `}
      >
        {t("DragCompo.API.Add")}
      </div>
    );
  if (error)
    return <div className="p-4 font-bold text-red-600">Error: {error}</div>;

  return (
    <div
      title={props.title}
      className={`h-full w-full mx-auto font-semibold ${
        changeTheme
          ? "bg-gray-200 text-black shadow-lightTeal"
          : "bg-gray-900 text-white shadow-mainColor"
      } p-4 rounded-lg shadow-md overflow-auto`}
    >
      <pre className="whitespace-pre-wrap break-all">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default API;
