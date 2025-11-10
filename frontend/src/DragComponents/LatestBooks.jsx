import React, { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import { FaArrowRight } from "react-icons/fa";
import { Change_Theme_context } from "../Contexts";
import { useTranslation } from "react-i18next";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";

const LatestBooks = ({ props }) => {
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);
  const { t } = useTranslation();
  const [books, setBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "https://openlibrary.org/search.json?q=programming"
      );
      const data = await response.json();

      const bookWorks = data.docs.slice(0, 10);
      setBooks(bookWorks);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const nextBook = () => setCurrentIndex((prev) => (prev + 1) % books.length);

  const prevBook = () =>
    setCurrentIndex((prev) => (prev - 1 + books.length) % books.length);

  if (books.length === 0)
    return (
      <div className="text-center flex items-center justify-center h-32">
        <Loader type="dots" />
      </div>
    );

  const book = books[currentIndex];

  return (
    <div
      title={props.title}
      className={`flex  h-full w-full md:flex-row items-start  mx-auto
     bg-white rounded-xl shadow-md  ${
       changeTheme ? "shadow-lightTeal" : "shadow-mainColor"
     } p-6 gap-6`}
    >
      {book?.cover_i ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
          alt={book.title}
          className="w-[50%] h-full rounded-lg"
        />
      ) : (
        <div className="w-[50%] h-full bg-gray-300 rounded-lg flex items-center justify-center">
          {t("DragCompo.LatestBooks.NoCover")}
        </div>
      )}

      <div className="flex flex-col justify-between gap-2 w-full h-full">
        <div className="flex flex-col gap-5 h-full w-full">
          <div className="text-xl font-bold ">
            {book.title || t("DragCompo.LatestBooks.Unknown")}
          </div>

          <div className="flex gap-1 items-center">
            <div className="font-semibold flex items-center gap-3">
              <FaUserTie size={20} /> {t("DragCompo.LatestBooks.Author")} :
            </div>
            {book.author_name?.[0] || t("DragCompo.LatestBooks.Unknown")}
          </div>

          <div className="flex gap-1 items-center">
            <div className="font-semibold flex items-center gap-3">
              <FaRegCheckCircle size={20} />
              {t("DragCompo.LatestBooks.Published")} :
            </div>
            {book.first_publish_year || t("DragCompo.LatestBooks.NA")}
          </div>
        </div>
        <div className="flex justify-between items-center w-full ">
          <button
            onClick={prevBook}
            className={`${
              changeTheme
                ? "bg-mainColor2 hover:bg-SecondryTeal"
                : "bg-mainColor hover:bg-lightIndigo"
            }  text-white 
              rounded-full w-10 h-10 flex items-center justify-center text-xl`}
          >
            <FaArrowRight className="rotate-180" />
          </button>
          <div className="text-2xl"> {t("DragCompo.LatestBooks.Books")}</div>
          <button
            onClick={nextBook}
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

export default LatestBooks;
