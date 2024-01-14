export default function MyP5Sketch(p) {
  const RED_COLOR = [213, 40, 82];
  const BASE_CANVAS_SIZE = 800;
  const BASE_INNER_RADIUS = 140;
  const BASE_OUTER_RADIUS = 200;
  const BASE_RECT_LENGTH = BASE_OUTER_RADIUS * 1.3;
  const RECT_CORNER_RADIUS = 20;
  const globalScaleFactor = 0.15;

  let centerX, centerY;
  let isScaledDown = false;
  let scaleStartTime;
  let scaleFactor = 1;
  let arcFactor = p.PI;

  p.setup = function () {
    p.createCanvas(
      BASE_CANVAS_SIZE * globalScaleFactor,
      BASE_CANVAS_SIZE * globalScaleFactor
    );
    centerX = p.width / 2;
    centerY = p.height / 2;
  };

  p.draw = function () {
    p.background(255);
    drawCircles();
    drawRotatingArc();
    drawRotatingRect();
  };

  function drawCircles() {
    p.noStroke();
    p.fill(RED_COLOR);
    p.circle(centerX, centerY, BASE_OUTER_RADIUS * 2 * globalScaleFactor);
    p.fill(255);
    p.circle(centerX, centerY, BASE_INNER_RADIUS * 2 * globalScaleFactor);
  }

  function drawRotatingArc() {
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
  }

  function drawRotatingRect() {
    let rectThickness = 40 * globalScaleFactor + 10 * globalScaleFactor;
    p.noStroke();
    p.fill(RED_COLOR);
    p.push();
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
      rectThickness * 1.5,
      BASE_RECT_LENGTH * globalScaleFactor,
      RECT_CORNER_RADIUS * globalScaleFactor * 1.2
    );
    p.pop();
  }

  p.mouseClicked = function () {
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
