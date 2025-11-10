import React, { useContext, useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Change_Rate_context } from "../Contexts";

const RatingStars = ({ props, rating }) => {
  const [ratingStars, setRatingStars] = useState(rating);
  const [change_Rate, setChange_Rate] = useContext(Change_Rate_context);

  useEffect(() => {
    if (change_Rate?.stars && change_Rate?.targetTitle === props.title) {
      setRatingStars(change_Rate.stars);
    }
  }, [change_Rate, props]);

  const handleStarClick = (value) => {
    setRatingStars(value);
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((s) => (
        <FaStar
          key={s}
          size={30}
          className={`cursor-pointer transition-colors duration-200 ${
            s <= ratingStars ? "text-yellow-400" : "text-gray-400"
          }`}
          onClick={() => handleStarClick(s)}
        />
      ))}
    </div>
  );
};

export default RatingStars;
