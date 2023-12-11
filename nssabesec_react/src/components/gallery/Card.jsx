import React, { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

export default function Card({ data }) {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#event_" + data.id,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, [data.id]);

  return (
    <section className="ftco-section ftco-gallery">
      <div className="container">
        <div className="text-center">
          <h2>{data.name}</h2>
          {data.time && (
            <p>
              <i className="event-details icon-calender" />
              {data.date}
              <i className="event-details icon-clock-o" /> {data.time}
              <i className="event-details icon-map-o" /> {data.venue}
            </p>
          )}
          <div className="row">
            {data.video_embeed_url && (
              <div className="col-md-6 col-12">
                <iframe
                  width="100%%"
                  height="400px"
                  src={data.video_embeed_url}
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
            <div className="col">
              <div className="pswp-gallery" id={"event_" + data.id}>
                {data.images &&
                  data.images.map((image, index) => (
                    <a
                      href={image.largeURL}
                      data-pswp-width={1024}
                      data-pswp-height={800}
                      key={index}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={image.thumbnailURL} alt="" />
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr width="70%" />
    </section>
  );
}
