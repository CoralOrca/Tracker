// MyP5Sketch.js
export default function MyP5Sketch(p) {
  // Constants for easy adjustments
  const RED_COLOR = [213, 40, 82];
  const BASE_CANVAS_SIZE = 800;
  const BASE_INNER_RADIUS = 160;
  const BASE_OUTER_RADIUS = 180;
  const SCALE_DURATION = 100; // Duration for the scale down animation
  const RESET_DURATION = 1000; // Duration until reset
  const BASE_RECT_LENGTH = BASE_OUTER_RADIUS * 1.3;
  const RECT_CORNER_RADIUS = 18;

  // Global scale factor
  let globalScaleFactor = 0.15;

  let centerX, centerY;
  let isScaledDown = false;
  let scaleStartTime;
  let scaleFactor = 1;
  let arcFactor;

  p.setup = function () {
    p.createCanvas(
      BASE_CANVAS_SIZE * globalScaleFactor,
      BASE_CANVAS_SIZE * globalScaleFactor
    );
    centerX = p.width / 2;
    centerY = p.height / 2;
    arcFactor = p.PI;
  };

  p.draw = function () {
    p.background(255);
    p.smooth();
    p.noStroke();
    p.fill(RED_COLOR);
    p.circle(centerX, centerY, BASE_OUTER_RADIUS * 2 * globalScaleFactor);
    p.fill(255);
    p.circle(centerX, centerY, BASE_INNER_RADIUS * 2 * globalScaleFactor);

    // Scaling logic
    if (isScaledDown) {
      let elapsedTime = p.millis() - scaleStartTime;
      scaleFactor = 0.5;
      arcFactor = p.PI * 2;

      if (elapsedTime > RESET_DURATION) {
        scaleFactor = p.lerp(
          0.5,
          1,
          (elapsedTime - RESET_DURATION) / SCALE_DURATION
        );
        arcFactor = p.PI;

        if (elapsedTime > RESET_DURATION + SCALE_DURATION) {
          isScaledDown = false;
        }
      }
    }

    let angle = p.atan2(p.mouseY - centerY, p.mouseX - centerX);

    p.push();
    p.translate(centerX, centerY);
    p.rotate(angle + p.HALF_PI);
    p.scale(scaleFactor * globalScaleFactor);
    p.fill(0);
    p.arc(
      0,
      0,
      BASE_INNER_RADIUS * 2,
      BASE_INNER_RADIUS * 2,
      arcFactor,
      0,
      p.PIE
    );

    p.pop();

    p.noFill();
    p.stroke(RED_COLOR);
    p.strokeWeight(8);
    p.circle(centerX, centerY, BASE_INNER_RADIUS * 2 * globalScaleFactor);

    // Rectangle positioning and sizing
    p.noStroke();
    p.fill(RED_COLOR);
    let rectThickness =
      (BASE_OUTER_RADIUS - BASE_INNER_RADIUS) * globalScaleFactor +
      10 * globalScaleFactor;
    p.translate(centerX, centerY);
    p.rotate(-p.PI / 4);
    p.rotate(p.PI);
    p.translate(BASE_OUTER_RADIUS * globalScaleFactor, 0);
    p.rotate(p.HALF_PI);
    p.rect(
      -rectThickness / 2,
      -15 * globalScaleFactor +
        rectThickness -
        BASE_RECT_LENGTH * globalScaleFactor,
      rectThickness * 1.8,
      BASE_RECT_LENGTH * globalScaleFactor,
      RECT_CORNER_RADIUS * globalScaleFactor * 1.2
    );
  };

  p.mouseClicked = function () {
    // Check if the mouse click is within the canvas
    if (
      p.mouseX > 0 &&
      p.mouseX < p.width &&
      p.mouseY > 0 &&
      p.mouseY < p.height
    ) {
      isScaledDown = true;
      scaleStartTime = p.millis();
    }
  };
}
