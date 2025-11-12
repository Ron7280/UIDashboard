import React from "react";
import { PiNotepadFill } from "react-icons/pi";
import { IoGameController } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { FaYoutube } from "react-icons/fa6";
import { FaRobot } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import { MdOutlineTextFields } from "react-icons/md";
import { FaKeyboard } from "react-icons/fa";
import { TbBlockquote } from "react-icons/tb";
import { FaCheckSquare } from "react-icons/fa";
import { IoToggleSharp } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";
import { FaChartBar } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { RxSlider } from "react-icons/rx";
import { GoCreditCard } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";
import { FaImage } from "react-icons/fa";
import { FaTable } from "react-icons/fa";
import { FaQrcode } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdMovieCreation } from "react-icons/md";
import { PiBooksLight } from "react-icons/pi";
import { VscJson } from "react-icons/vsc";
import { IoSpeedometer } from "react-icons/io5";
import { IoLanguageSharp } from "react-icons/io5";
import { RiBarChartGroupedLine } from "react-icons/ri";

const DEFAULT_PROPS = {
  AI: {
    response: "",
    title: "",
    width: 400,
    height: 200,
    icon: FaRobot,
  },
  Button: {
    text: "",
    title: "",
    color: "#3B82F6",
    width: 150,
    height: 40,
    icon: GiClick,
    actionType: "alert",
    AlertType: "info",
    actionValue: "Button clicked!",
    InteractWith: "",
  },
  Text: {
    text: "",
    title: "",
    color: "#374151",
    setAs: "",
    width: 230,
    height: 40,
    icon: MdOutlineTextFields,
  },
  Input: {
    placeholder: "",
    title: "",
    width: 200,
    height: 40,
    icon: FaKeyboard,
  },
  Textarea: {
    placeholder: "",
    width: 250,
    title: "",
    height: 80,
    icon: TbBlockquote,
  },
  Checkbox: {
    label: "Check me",
    title: "",
    checked: false,
    width: 150,
    height: 30,
    icon: FaCheckSquare,
  },
  Toggle: {
    checked: false,
    actionType: "",
    title: "",
    lang1: "AR",
    lang2: "EN",
    width: 60,
    height: 30,
    icon: IoToggleSharp,
  },
  Select: {
    options: ["Option 1", "Option 2"],
    title: "",
    selected: "",
    width: 200,
    height: 40,
    icon: CiCircleList,
  },
  ProgressBar: {
    value: 50,
    title: "",
    width: 350,
    height: 20,
    icon: FaBarsProgress,
  },
  Chart: {
    type: "bar",
    title: "",
    data: {
      labels: [],
      datasets: [],
    },
    dataSource: null,
    width: 300,
    height: 200,
    icon: FaChartBar,
  },
  RatingStars: { rating: 0, title: "", width: 200, height: 40, icon: FaStar },
  Slider: { value: 50, title: "", width: 230, height: 40, icon: RxSlider },
  Card: {
    title: "Card Title",
    title: "",
    content: "",
    width: 250,
    height: 150,
    icon: GoCreditCard,
  },
  Avatar: {
    src: "https://i.pravatar.cc/80",
    title: "",
    name: "Rani Alsaegh",
    path: "",
    width: 200,
    height: 80,
    icon: RxAvatar,
  },
  Image: {
    src: "https://picsum.photos/400/200",
    title: "",
    path: "",
    width: 300,
    height: 200,
    icon: FaImage,
  },
  Speedometer: {
    title: "System Speedometer",
    speed: "",
    value: 0,
    minValue: 0,
    maxValue: 100,
    width: 330,
    height: 200,
    icon: IoSpeedometer,
  },
  Table: {
    title: "",
    columns: [
      { header: "Name", key: "name" },
      { header: "Age", key: "age" },
      { header: "Email", key: "email" },
    ],
    data: [{ name: "Ken Adams", age: 28, email: "Ken@example.com" }],
    width: 400,
    height: 100,
    icon: FaTable,
  },
  Map: {
    title: "",
    latitude: 51.505,
    longitude: -0.09,
    width: 400,
    height: 300,
    icon: FaMapMarkedAlt,
  },
  QR: {
    title: "",
    value: "https://example.com",
    type: "qr",
    width: 200,
    height: 200,
    icon: FaQrcode,
  },
  Loader: {
    title: "",
    type: "spinner",
    color: "#3B82F6",
    size: 25,
    icon: FaSpinner,
  },
  CountdownTimer: {
    title: "",
    startTime: { hours: 0, minutes: 5, seconds: 0 },
    width: 300,
    height: 100,
    icon: FaClock,
  },
  DigitalClock: {
    title: "",
    format: "24h",
    color: "#374151",
    fontSize: "2rem",
    icon: MdAccessTime,
  },
  Video: {
    title: "",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    width: 400,
    height: 250,
    autoplay: false,
    controls: true,
    InteractWith: "",
    icon: FaYoutube,
  },
  Notepad: {
    title: "",
    type: "text",
    content: "",
    todos: [],
    title: "My Notes",
    width: 300,
    height: 250,
    icon: PiNotepadFill,
  },
  Game: {
    title: "",
    type: "tic-tac-toe",
    width: 300,
    height: 300,
    icon: IoGameController,
  },
  Movies: {
    title: "",
    width: 600,
    height: 350,
    icon: MdMovieCreation,
  },
  Books: {
    title: "",
    width: 600,
    height: 350,
    icon: PiBooksLight,
  },
  API: {
    title: "",
    api: "",
    method: "",
    body: "",
    width: 300,
    height: 300,
    icon: VscJson,
  },
  Linguistics: {
    title: "",
    width: 600,
    height: 500,
    translateTo: "English",
    icon: IoLanguageSharp,
  },
  Sort: {
    title: "",
    width: 1000,
    height: 620,
    icon: RiBarChartGroupedLine,
  },
  Fibonacci: {
    title: "",
    width: 550,
    height: 450,
    icon: RiBarChartGroupedLine,
  },
};

export default DEFAULT_PROPS;
