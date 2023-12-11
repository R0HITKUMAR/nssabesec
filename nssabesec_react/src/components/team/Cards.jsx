import React from "react";
import Card from "./Card";
import Alumni from "./Alumni.js";
import {ClubHeads, Core} from "./Core.js";
import Team from "./Team.js";

export default function Cards() {
  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 heading-section text-center">
            <h2 className="mb-4">Meet the Team</h2>
            <p>Together we're stronger.</p>
          </div>
        </div>
        <h2 className="m-4 text-center">Club Heads (2022 - 23)</h2>
        <div className="row">
          {ClubHeads &&
            ClubHeads.map((detail, index) => {
              return <Card detail={detail} key={index} />;
            })}
        </div>
        <h2 className="m-4 text-center">Core Team (2022 - 23)</h2>
        <div className="row">
          {Core &&
            Core.map((detail, index) => {
              return <Card detail={detail} key={index} />;
            })}
        </div>
        {Team &&
          Team.map((T, index) => {
            return (
              <>
                <h2 className="m-4 text-center">{T.teamName}</h2>
                <div className="row">
                  {T.members &&
                    T.members.map((member, index) => {
                      return <Card key={index} detail={member} />;
                    })}
                </div>
              </>
            );
          })}
        <h2 className="m-4 text-center">Alumni</h2>
        <div className="row">
          {Alumni &&
            Alumni.map((detail, index) => {
              return <Card detail={detail} key={index} />;
            })}
        </div>
      </div>
    </section>
  );
}
