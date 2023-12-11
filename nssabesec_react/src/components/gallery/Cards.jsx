import React from "react";
import Data from "./data.js";
import Card from "./Card";

export default function Cards() {
  return (
    <>
      {Data.reverse().map((year, index) => {
        return (
          <section className="ftco-section ftco-gallery">
            <div className="container">
              <div className="text-center">
                <h2>{year.year}</h2>
                <hr width="100%" />
              </div>
              {year.events.reverse().map((event, index) => {
                return <Card data={event} key={index} />;
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
