import React from "react";

export default function Features() {
  const Details = [
    {
      title: "Make Donation",
      icon: "flaticon-donation-1",
      description:
        "Thank you for your great generosity! We, at NSS ABESEC, greatly appreciate your donation, and your sacrifice. Your support helps to further our mission through general projects, including various social welfare drives. Your support is invaluable to us, thank you again!",
    },
    {
      title: "Volunteer",
      icon: "flaticon-charity",
      description:
        "Social work takes many forms — whether you’re dedicating your days and nights to the betterment of humanity, or finding some time in your busy schedule to lend a hand, keep it up. The work is hard, but the rewards are many. Get glued with nss abesec and get start serving your society in a productive way via social service.",
    },
    {
      title: "Sponsorship",
      icon: "flaticon-donation",
      description:
        "Without sponsors, many programs, events and spaces would not be viable. The list of organizations that are in need of sponsors is endless. From charity organizations, to school activities, sponsorship may determine whether the program continues to run. Tnks to all our sponsors without your contribution, this event would not have been a success. A big thank you from everyone at NSS ABESEC.",
    },
  ];
  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row">
          {Details.map((item, index) => (
            <div className="col-md-4 d-flex align-self-stretch">
              <div className="media block-6 d-flex services d-block">
                <div className="icon d-flex">
                  <span className={item.icon} />
                </div>
                <div className="media-body pl-4">
                  <h3 className="heading">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
