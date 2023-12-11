import React from "react";
import { useNavigate } from "react-router-dom";
import TCard from "../team/Card";
import { ClubHeads, Core } from "../team/Core.js";
import Teams from "../team/Team.js";

export default function Team() {
  const navigate = useNavigate();
  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 heading-section text-center">
            <h2 className="mb-4">Meet the Team</h2>
            <p>Together we're stronger.</p>
          </div>
        </div>
        <div className="row">
          <TCard detail={ClubHeads[0]} />
          <TCard detail={ClubHeads[1]} />
          <TCard detail={ClubHeads[5]} />
          <TCard detail={Core[0]} />
          <TCard detail={Core[1]} />
          <TCard detail={Core[2]} />
          <TCard detail={Teams[0].members[2]} />
          <TCard detail={Teams[0].members[5]} />
          <TCard detail={Teams[0].members[7]} />
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate("/team")}
            className="btn btn-primary btn-block mt-5"
          >
            View All
          </button>
        </div>
      </div>
    </section>
  );
}
