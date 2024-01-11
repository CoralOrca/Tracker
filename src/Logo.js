// Logo.js
import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import LogoSketch from "./LogoSketch";

function Logo() {
  return (
    <div>
      <ReactP5Wrapper sketch={LogoSketch} />
    </div>
  );
}

export default Logo;
