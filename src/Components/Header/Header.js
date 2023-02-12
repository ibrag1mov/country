import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsMoon, BsSun } from "react-icons/bs";
import { ThemeContext } from "../../context/ThemeContext";

export const Header = () => {
  let { theme, res, setRes } = useContext(ThemeContext);


  const handleButton = () => {
    res = !res;
    res ? setRes(true) : setRes(false);
  };
  return (
    <header
      className={
        theme == "dark"
          ? "header py-4 shadow bg-dark text-white"
          : "header py-4 shadow"
      }
    >
      <div className="container d-flex align-items-center">
        <div className="logo">
          <Link
            
            to="/"
            className={
              theme == "dark"
                ? "logo h1 fs-4 text-decoration-none text-white"
                : "logo h1 fs-4 text-decoration-none text-dark"
            }
          >
            Where in the world?
          </Link>
        </div>
        <button
          onClick={() => handleButton()}
          className={
            theme == "dark"
              ? "btn btn-link ms-auto text-white text-decoration-none"
              : "btn btn-link ms-auto text-dark text-decoration-none"
          }
        >
          {theme == "dark" ? (
            <span>
              <BsSun /> Light Mode
            </span>
          ) : (
            <span>
              <BsMoon /> Dark Mode
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
