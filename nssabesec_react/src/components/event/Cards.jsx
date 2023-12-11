import React from "react";
import data from "./data.js";
import Card from "./Card.jsx";

export default function Cards() {
  return (
    <section className="ftco-section bg-light">
      <div className="container">
        {data &&
          data.map((item, i) => {
            return (
              <>
                <h1 className="text-center m-5">
                  Events During Year {item.title}
                </h1>
                <div className="row" key={i}>
                  {item.events &&
                    item.events.reverse().map((event, index) => {
                      return <Card event={event} key={index} />;
                    })}
                </div>
              </>
            );
          })}
      </div>
    </section>
  );
}
