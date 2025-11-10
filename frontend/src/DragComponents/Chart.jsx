import React, { useContext, useEffect, useState } from "react";
import { Bar, Line, Pie, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  RadialLinearScale,
  Legend,
} from "chart.js";
import { Change_Theme_context, Chart_Trimm_context } from "../Contexts";
import Loader from "./Loader";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  RadialLinearScale,
  Legend
);

const Chart = ({
  type = "bar",
  data = DEFAULT_PROPS.Chart.data,
  dataSource = null,
  labelKey = null,
  valueKeys = [],
  props,
}) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [chartData, setChartData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chart_Trimm] = useContext(Chart_Trimm_context);

  const trimmLength =
    chart_Trimm?.targetTitle === props.title
      ? Number(chart_Trimm.Slice) || 10
      : 10;

  useEffect(() => {
    setChartData(data);
    setError(null);

    if (!dataSource) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    const TIMEOUT_MS = 10000;
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const fetchData = async () => {
      setLoading(true);
      try {
        let result;
        if (typeof dataSource === "function") {
          result = await dataSource();
        } else {
          const res = await fetch(dataSource, { signal });
          try {
          } catch (hdrErr) {}
          if (!res.ok) {
            const body = await res.text().catch(() => "<no body>");
            throw new Error(
              `HTTP ${res.status} ${res.statusText} — ${body.slice(0, 300)}`
            );
          }
          try {
            result = await res.json();
          } catch (jsonErr) {
            const txt = await res.text().catch(() => "<unable to read text>");
            throw new Error(
              "Response was not valid JSON. First chars: " + txt.slice(0, 300)
            );
          }
        }

        const rawData = Array.isArray(result.data)
          ? result.data
          : Array.isArray(result)
          ? result
          : [];
        const trimmedData = rawData.slice(0, trimmLength);

        if (!Array.isArray(trimmedData) || trimmedData.length === 0) {
          throw new Error(
            "No array data found in API response (expected array or { data: [...] })."
          );
        }

        const keys = Object.keys(trimmedData[0] || {});
        const labelField =
          labelKey ||
          keys.find((k) => {
            const t = typeof trimmedData[0][k];
            return t === "string" || t === "number";
          }) ||
          keys[0];

        const datasetKeys =
          Array.isArray(valueKeys) && valueKeys.length > 0
            ? valueKeys
            : keys.filter(
                (k) => k !== labelField && typeof trimmedData[0][k] === "number"
              );

        if (!datasetKeys || datasetKeys.length === 0) {
          throw new Error(
            "No numeric fields found to plot. Ensure your objects include numeric properties or provide `valueKeys`."
          );
        }

        const labels = trimmedData.map((item) => {
          const raw = item[labelField];
          return raw === undefined || raw === null ? "" : String(raw);
        });
        const colorPalette = [
          "#3B82F6",
          "#EF4444",
          "#F59E0B",
          "#10B981",
          "#8B5CF6",
        ];

        const datasets = datasetKeys.map((key) => {
          const dataset = {
            label: key,
            data: trimmedData.map((item) => {
              const v = item[key];
              const n = Number(v);
              return Number.isFinite(n) ? n : 0;
            }),
            backgroundColor: trimmedData.map(
              (_, idx) => colorPalette[idx % colorPalette.length]
            ),

            fill: false,
            borderColor: "transparent",
          };

          if (type === "line" || type === "radar") {
            dataset.borderColor = "#818CF8";
            dataset.fill = false;
            dataset.tension = 0.4;
            dataset.pointBorderColor = "#fff";
            dataset.pointRadius = 7;
          }

          return dataset;
        });

        setChartData({ labels, datasets });
      } catch (err) {
        if (err.name === "AbortError") {
          setError("Request timed out (aborted).");
        } else {
          setError(err.message || "Fetch error");
        }
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [dataSource, labelKey, JSON.stringify(valueKeys), trimmLength]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: changeTheme ? "#fff" : "",
        },
      },
      title: { display: false },
    },
    scales:
      type === "bar" || type === "line"
        ? {
            x: {
              ticks: {
                autoSkip: false,
                color: changeTheme ? "#fff" : "",
              },
              grid: {
                color: changeTheme ? "gray" : "#e0e0e0",
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                autoSkip: false,
                color: changeTheme ? "#fff" : "",
              },
              grid: {
                color: changeTheme ? "gray" : "#e0e0e0",
              },
            },
          }
        : type === "radar" || type === "polarArea"
        ? {
            r: {
              grid: { color: changeTheme ? "gray" : "" },
            },
          }
        : {},
  };

  if (loading)
    return (
      <div className={`${changeTheme ? "text-white" : ""} font-bold p-4`}>
        Loading chart data…
      </div>
    );
  if (error)
    return <div className="p-4 font-bold text-red-600">Error: {error}</div>;
  if (
    !chartData ||
    !Array.isArray(chartData.labels) ||
    (chartData.datasets || []).length === 0
  ) {
    return <Loader type="dots" />;
  }

  switch (type) {
    case "bar":
      return (
        <Bar title={props.title} data={chartData} options={chartOptions} />
      );
    case "line":
      return (
        <Line title={props.title} data={chartData} options={chartOptions} />
      );
    case "pie":
      return (
        <Pie title={props.title} data={chartData} options={chartOptions} />
      );
    case "doughnut":
      return (
        <Doughnut title={props.title} data={chartData} options={chartOptions} />
      );
    case "polarArea":
      return (
        <PolarArea
          title={props.title}
          data={chartData}
          options={chartOptions}
        />
      );
    case "radar":
      return (
        <Radar title={props.title} data={chartData} options={chartOptions} />
      );
    default:
      return (
        <Bar title={props.title} data={chartData} options={chartOptions} />
      );
  }
};

export default Chart;
