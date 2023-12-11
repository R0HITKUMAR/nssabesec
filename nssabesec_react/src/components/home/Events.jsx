import React from "react";
import { useNavigate } from "react-router-dom";
import ECard from "../event/Card";
import data from "../event/data.js";

export default function Events() {
  const navigate = useNavigate();
  const eventss = data[0].events;
  const len = eventss.length;

  return (
    <section className="ftco-section bg-light">
      <div className="container">
        <div className="row justify-content-center mb-5 pb-3">
          <div className="col-md-7 heading-section text-center">
            <h2 className="mb-4">Latest Events</h2>
          </div>
        </div>
        <div className="row">
          <ECard event={eventss[len - 1]} />
          <ECard event={eventss[len - 2]} />
          <ECard event={eventss[len - 3]} />
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate("/events")}
            className="btn btn-primary btn-block"
          >
            View All
          </button>
        </div>
      </div>
    </section>
  );
}
