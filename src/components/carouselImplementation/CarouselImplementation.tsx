import { useEffect, useState } from "react";
import { act } from "react-dom/test-utils";
import { useAppSelector } from "../../hooks/useAppSelector";
import "./carousel.scss";

export const Carousel = () => {
  const { superheroes, activeSuperhero } = useAppSelector(
    state => state.superheroes,
  );

  return (
    <div className="carousel">
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
        }
        alt=""
        className="carousel__image"
      />
      <div className="carousel__buttons">
        <button className="carousel__button carousel__button--disabled">
          Previous
        </button>
        <button className="carousel__button ">Next</button>
      </div>
    </div>
  );
};
