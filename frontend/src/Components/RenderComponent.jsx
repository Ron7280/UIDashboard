import AIComponent from "../DragComponents/AIComponent";
import Button from "../DragComponents/Button";
import Text from "../DragComponents/Text";
import Input from "../DragComponents/Input";
import Textarea from "../DragComponents/Textarea";
import Checkbox from "../DragComponents/Checkbox";
import Toggle from "../DragComponents/Toggle";
import Select from "../DragComponents/Select";
import ProgressBar from "../DragComponents/ProgressBar";
import Chart from "../DragComponents/Chart";
import RatingStars from "../DragComponents/RatingStars";
import Slider from "../DragComponents/Slider";
import Card from "../DragComponents/Card";
import Avatar from "../DragComponents/Avatar";
import Image from "../DragComponents/Image";
import Table from "../DragComponents/Table";
import QR from "../DragComponents/QR";
import Loader from "../DragComponents/Loader";
import Map from "../DragComponents/Map";
import CountdownTimer from "../DragComponents/CountdownTimer";
import DigitalClock from "../DragComponents/DigitalClock";
import VideoPlayer from "../DragComponents/VideoPlayer";
import Notepad from "../DragComponents/Notepad";
import TicTacToe from "../DragComponents/TicTacToe";
import LatestMovie from "../DragComponents/LatestMovie";
import LatestBooks from "../DragComponents/LatestBooks";
import API from "../DragComponents/API";
import Speedometer from "../DragComponents/Speedometer";
import Linguistics from "../DragComponents/Linguistics";

const RenderComponent = ({ comp, handlePropChange, DEFAULT_PROPS }) => {
  if (!comp) return null;

  const { type, props = {} } = comp;

  switch (type) {
    case "AI":
      return (
        <AIComponent
          props={props}
          response={props.response}
          onChangePrompt={(newPrompt, newResponse) => {
            handlePropChange("prompt", newPrompt);
            handlePropChange("response", newResponse);
          }}
        />
      );

    case "Button":
      return <Button props={props} DEFAULT_PROPS={DEFAULT_PROPS} />;

    case "Text":
      return <Text props={props} DEFAULT_PROPS={DEFAULT_PROPS} />;

    case "Input":
      return (
        <Input
          props={props}
          DEFAULT_PROPS={DEFAULT_PROPS}
          handlePropChange={handlePropChange}
        />
      );

    case "Textarea":
      return (
        <Textarea
          props={props}
          DEFAULT_PROPS={DEFAULT_PROPS}
          handlePropChange={handlePropChange}
        />
      );

    case "Checkbox":
      return <Checkbox props={props} handlePropChange={handlePropChange} />;

    case "Toggle":
      return <Toggle props={props} handlePropChange={handlePropChange} />;

    case "Select":
      return (
        <Select
          props={props}
          DEFAULT_PROPS={DEFAULT_PROPS}
          handlePropChange={handlePropChange}
        />
      );

    case "ProgressBar":
      return (
        <ProgressBar
          value={props.value ?? DEFAULT_PROPS.ProgressBar.value}
          width={props.width ?? DEFAULT_PROPS.Video.width}
          height={props.height ?? DEFAULT_PROPS.Video.height}
        />
      );

    case "Speedometer":
      return (
        <Speedometer
          props={props}
          DEFAULT_PROPS={DEFAULT_PROPS}
          handlePropChange={handlePropChange}
        />
      );

    case "Chart":
      return (
        <Chart
          props={props}
          type={props.type ?? DEFAULT_PROPS.Chart.type}
          data={props.data ?? DEFAULT_PROPS.Chart.data}
          dataSource={props.dataSource}
          labelKey={props.labelKey}
          valueKeys={props.valueKeys}
        />
      );

    case "RatingStars":
      return (
        <RatingStars
          props={props}
          rating={props.rating ?? DEFAULT_PROPS.RatingStars.rating}
        />
      );

    case "Slider":
      return (
        <Slider
          value={props.value ?? DEFAULT_PROPS.Slider.value}
          onChange={(val) => handlePropChange("value", val)}
        />
      );

    case "Card":
      return (
        <Card
          title={props.title ?? DEFAULT_PROPS.Card.title}
          content={props.content ?? DEFAULT_PROPS.Card.content}
        />
      );

    case "Avatar":
      return (
        <Avatar
          src={props.path || props.src || DEFAULT_PROPS.Avatar.src}
          name={props.name ?? DEFAULT_PROPS.Avatar.name}
        />
      );

    case "Image":
      return (
        <Image
          props={props}
          DEFAULT_PROPS={DEFAULT_PROPS}
          width={props.width ?? DEFAULT_PROPS.Video.width}
          height={props.height ?? DEFAULT_PROPS.Video.height}
        />
      );

    case "Table":
      return (
        <Table
          columns={props.columns ?? DEFAULT_PROPS.Table.columns}
          data={props.data ?? DEFAULT_PROPS.Table.data}
          width={props.width ?? DEFAULT_PROPS.Video.width}
          height={props.height ?? DEFAULT_PROPS.Video.height}
        />
      );

    case "QR":
      return (
        <QR
          props={props}
          DEFAULT_PROPS={DEFAULT_PROPS}
          width={props.width ?? DEFAULT_PROPS.Video.width}
          height={props.height ?? DEFAULT_PROPS.Video.height}
        />
      );

    case "Loader":
      return (
        <Loader
          type={props.type ?? DEFAULT_PROPS.Loader.type}
          color={props.color ?? DEFAULT_PROPS.Loader.color}
          size={props.size ?? DEFAULT_PROPS.Loader.size}
        />
      );

    case "Map":
      return (
        <Map
          latitude={props.latitude ?? DEFAULT_PROPS.Map.latitude}
          longitude={props.longitude ?? DEFAULT_PROPS.Map.longitude}
          onChange={(newCoords) => {
            handlePropChange("latitude", newCoords.latitude);
            handlePropChange("longitude", newCoords.longitude);
          }}
          width={props.width ?? DEFAULT_PROPS.Video.width}
          height={props.height ?? DEFAULT_PROPS.Video.height}
        />
      );

    case "CountdownTimer":
      return (
        <CountdownTimer
          startTime={props.startTime ?? DEFAULT_PROPS.CountdownTimer.startTime}
          resetSignal={props.resetSignal}
        />
      );

    case "DigitalClock":
      return (
        <DigitalClock
          format={props.format ?? DEFAULT_PROPS.DigitalClock.format}
          color={props.color ?? DEFAULT_PROPS.DigitalClock.color}
          fontSize={props.fontSize ?? DEFAULT_PROPS.DigitalClock.fontSize}
        />
      );

    case "Video":
      return (
        <VideoPlayer
          src={props.src ?? DEFAULT_PROPS.Video.src}
          width={props.width ?? DEFAULT_PROPS.Video.width}
          height={props.height ?? DEFAULT_PROPS.Video.height}
          autoplay={props.autoplay ?? DEFAULT_PROPS.Video.autoplay}
          controls={props.controls ?? DEFAULT_PROPS.Video.controls}
        />
      );

    case "Notepad":
      return (
        <Notepad
          type={props.type}
          content={props.content}
          todos={props.todos}
          title={props.title}
          onChange={(updates) =>
            handlePropChange(Object.keys(updates)[0], Object.values(updates)[0])
          }
        />
      );

    case "Game":
      return <TicTacToe props={props} />;

    case "Movies":
      return <LatestMovie props={props} />;

    case "Books":
      return <LatestBooks props={props} />;

    case "API":
      return <API props={props} />;

    case "Linguistics":
      return <Linguistics props={props} />;

    default:
      return (
        <div className="font-bold text-lg text-red-600">
          Unsupported Component
        </div>
      );
  }
};

export default RenderComponent;
