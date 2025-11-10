import React, { useState, useRef, useContext, useEffect } from "react";
import { Change_Theme_context, Video_Progress_context } from "../Contexts";
import { useTranslation } from "react-i18next";

const VideoPlayer = ({
  src,
  width = 400,
  height = 250,
  autoplay = false,
  controls = true,
}) => {
  const [videoProgress, setVideoProgress] = useContext(Video_Progress_context);
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const { t } = useTranslation();

  const isYouTube = /(?:youtube\.com\/watch\?v=|youtu\.be\/)/.test(src);

  useEffect(() => {
    if (progress) {
      setVideoProgress(progress);
    }
  }, [progress]);

  if (!src)
    return <div className="text-gray-500">No video source provided</div>;

  if (isYouTube) {
    let videoId = "";
    const match = src.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
    );
    if (match) videoId = match[1];

    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${
      autoplay ? 1 : 0
    }`;

    return (
      <iframe
        width={width}
        height={height}
        src={embedUrl}
        title={t("DragCompo.Video.Title")}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={`${
          changeTheme ? " shadow-lightTeal" : " shadow-mainColor"
        } rounded-md shadow-md`}
      ></iframe>
    );
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(videoRef.current.currentTime);
    }
  };

  return (
    <div
      className={`shadow-md ${
        changeTheme ? " shadow-lightTeal" : " shadow-mainColor"
      }`}
    >
      <video
        ref={videoRef}
        src={src}
        width={width}
        height={height}
        autoPlay={autoplay}
        controls={controls}
        onTimeUpdate={handleTimeUpdate}
        className="rounded-md shadow-sm object-cover"
      >
        {t("DragCompo.Video.NotSupport")}
      </video>
    </div>
  );
};

export default VideoPlayer;
