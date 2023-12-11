import React from "react";

export default function Card({ event }) {
  return (
    <div className="col-md-4">
      <div
        className="blog-entry align-self-stretch"
        style={{ height: "700px" }}
      >
        <img src={event.poster_img} height={400} width={"100%"} alt={event.title}/>
        <div className="text p-3">
          <div className="meta mb-1">
            <div>{event.date}</div>
          </div>
          <h3 className="heading mb-2">{event.title}</h3>
          <p className="time-loc">
            <span className="mr-2">
              <i className="icon-clock-o m-1" />
              {event.time}
            </span>
            <span>
              <i className="icon-map-o m-1" />
              {event.venue}
            </span>
          </p>
          <p>{event.description}</p>
        </div>
      </div>
    </div>
  );
}
