import React, { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import { FaArrowRight } from "react-icons/fa";
import { Change_Theme_context } from "../Contexts";
import { BsCalendar2DateFill } from "react-icons/bs";
import { MdLocalMovies } from "react-icons/md";
import { BsCameraReelsFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const LatestMovies = ({ props }) => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json"
      );
      const data = await response.json();
      setMovies(data.slice(0, 10));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const nextMovie = () => setCurrentIndex((prev) => (prev + 1) % movies.length);

  const prevMovie = () =>
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);

  if (movies.length === 0)
    return (
      <div className="text-center flex items-center justify-center h-32">
        <Loader type="ring" />
      </div>
    );

  const movie = movies[currentIndex];

  return (
    <div
      title={props.title}
      className={`flex  h-full w-full md:flex-row items-start  mx-auto
     bg-white rounded-xl shadow-md  ${
       changeTheme ? "shadow-lightTeal" : "shadow-mainColor"
     } p-6 gap-6`}
    >
      <img
        src={`https://picsum.photos/400/600?random=${currentIndex}`}
        alt={movie.title}
        className="w-[50%] h-full rounded-lg"
      />

      <div className="flex flex-col justify-between gap-2 w-full h-full">
        <div className="flex flex-col gap-2 w-full h-full">
          <div className="text-2xl font-bold mb-4">{movie.title}</div>

          <div className="flex items-start gap-2">
            <div className="font-semibold flex items-center gap-3">
              <BsCalendar2DateFill size={20} />
              {t("DragCompo.LatestMovies.Year")} :
            </div>
            {movie.year || t("DragCompo.LatestMovies.NA")}
          </div>

          <div className="flex items-start gap-2">
            <div className="font-semibold flex items-center gap-3">
              <BsCameraReelsFill size={20} />
              {t("DragCompo.LatestMovies.Genres")}:
            </div>
            {movie.genres?.join(", ") || t("DragCompo.LatestMovies.NA")}
          </div>

          <div>
            <div className="font-semibold flex items-center gap-3">
              <MdLocalMovies size={20} /> {t("DragCompo.LatestMovies.Plot")} :
            </div>
            {movie.plot || t("DragCompo.LatestMovies.NoDescription")}
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <button
            onClick={prevMovie}
            className={`${
              changeTheme
                ? "bg-mainColor2 hover:bg-SecondryTeal"
                : "bg-mainColor hover:bg-lightIndigo"
            }  text-white 
              rounded-full w-10 h-10 flex items-center justify-center text-xl`}
          >
            <FaArrowRight className="rotate-180" />
          </button>
          <div className="text-2xl">{t("DragCompo.LatestMovies.Movies")}</div>
          <button
            onClick={nextMovie}
            className={`${
              changeTheme
                ? "bg-mainColor2 hover:bg-SecondryTeal"
                : "bg-mainColor hover:bg-lightIndigo"
            }  text-white 
              rounded-full w-10 h-10 flex items-center justify-center text-xl`}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatestMovies;
