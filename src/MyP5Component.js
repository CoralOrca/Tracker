// MyP5Component.js
import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import MyP5Sketch from "./MyP5Sketch";

function MyP5Component() {
  return (
    <div>
      <ReactP5Wrapper sketch={MyP5Sketch} />
    </div>
  );
}

export default MyP5Component;
