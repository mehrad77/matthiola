/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
// @ts-expect-error fix type error
import heroImage from "../images/matthiola-incana.jpg";

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="w-full flex flex-row justify-between">
      <div className="p-4">
        <img
          alt="matthiola incana flower"
          className=" max-w-72"
          src={heroImage as string}
        />
      </div>
      <div className="p-4">
        <p className=" text-slate-700">
          In the silent nights, <br />
          Night-scented flowers dance,
          <br />
          With gentle breezes
          <br />
          In the garden of our dreams.
          <br />
          <br />
          The scent of night-blooms at night
          <br />
          Recalls lost loves,
          <br />
          And a hope that still
          <br />
          Glows in our hearts,
          <br />
          When silence
          <br />
          Is the language of our intimacy.
          <br />
          <br />
          Each petal tells a tale
          <br />
          Of a night that passed,
          <br />
          Of moments when in silence
          <br />
          We were filled with peace.
          <br />
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
