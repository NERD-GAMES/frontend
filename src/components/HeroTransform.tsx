import { useEffect, useState } from "react";
import { IHero } from "../types";
import "animate.css";

interface Props {
  hero: IHero;
}

const HeroTransform = ({ hero }: Props) => {
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
      }}
    >
      {hero?.parts?.map((partHero) => {
        let style = {};
        try {
          style = JSON.parse(partHero?.style || "");
        } catch (error) {}

        return (
          <img
            alt=""
            draggable={false}
            src={partHero?.photosURL && partHero?.photosURL[0]}
            className={
              partHero?.className && `animate__animated ${partHero?.className}`
            }
            style={{
              ...style,
              position: "absolute",
              width: partHero.width + "%",
            }}
          />
        );
      })}
    </div>
  );
};

export default HeroTransform;
