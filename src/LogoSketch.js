// LogoSketch.js
export default function sketch(p) {
  let redColor;
  let centerX, centerY; // Global variables for canvas center
  let radius = 100; // Global variable for radius
  let radius2 = 140; // Global variable for outer circle radius
  let isScaledDown = false; // Flag to check if scaled down
  let scaleStartTime; // Time when scaling started
  let scaleFactor = 1; // Current scale factor
  let arcFactor;

  p.setup = function () {
    p.createCanvas(300, 300);
    redColor = p.color(213, 40, 82);
    centerX = p.width / 2;
    centerY = p.height / 2;
  };

  p.draw = function () {
    p.background(255);

    p.noStroke();
    p.fill(redColor);
    p.circle(centerX, centerY, radius2);

    p.fill(255);
    p.circle(centerX, centerY, radius * 2);

    let angle = p.atan2(p.mouseY - centerY, p.mouseX - centerX);

    /*if (angle > 1.5) {
      angle = 1.5;
    } else if (angle < -1) {
      angle = -1;
    }*/

    p.push();
    p.translate(centerX, centerY);
    p.rotate(angle + p.HALF_PI);

    p.fill(0);
    p.arc(0, 0, radius * 2, radius * 2, p.PI, 0, p.PIE);

    p.fill(redColor);
    p.translate(110, 0);
    p.rotate(p.HALF_PI);
    p.rect(-10, -25, 20, 85, 8.5);
    p.pop();

    p.fill(0);
  };
}
