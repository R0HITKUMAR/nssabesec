import React from "react";

export default function Counter() {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    for (let i = 0; i < 80 && count < 50; i++) {
      setTimeout(() => {
        setCount(count + 1);
      }, 100);
    }
  }, [count]);

  return (
    <section className="ftco-counter ftco-intro mb-5" id="section-counter">
      <div className="container">
        <div className="row no-gutters">
          <div className="col-md-5 d-flex justify-content-center counter-wrap">
            <div className="block-18 color-1 align-items-stretch">
              <div className="text">
                <span>Total Volunteers</span>
                <strong className="number">{count}</strong>+
                <span>
                  We have large numbers of Volunteers for serving the nation
                </span>
              </div>
            </div>
          </div>
          <div className="col-md d-flex justify-content-center counter-wrap">
            <div className="block-18 color-2 align-items-stretch">
              <div className="text">
                <h3 className="mb-4">Become a Volunteer</h3>
                <p>
                  <a href="#forms" className="btn btn-white px-3 py-2 mt-2">
                    Be A Volunteer
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md d-flex justify-content-center counter-wrap">
            <div className="block-18 color-3 align-items-stretch">
              <div className="text">
                <h3 className="mb-4">Recent Updates</h3>
                <p id="recentupdates">No Recent Updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
