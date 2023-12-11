import React from "react";
import Hero from "./Hero";
import Counter from "./Counter";
import About from "./About";
import Features from "./Features";
import Team from "./Team";
import Gallery from "./Gallery";
import Events from "./Events";
import Contact from "./contact/Contact";
import Forms from "./forms/Forms";

export default function Home() {
  return (
    <>
      <Hero />
      <Counter />
      <About />
      <Features />
      <Team />
      <Gallery />
      <Events />
      <Contact />
      <Forms />
    </>
  );
}
