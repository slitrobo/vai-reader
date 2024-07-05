var p5canvas;
var attention;

var attentionDots = [];
var attentionDotTest;



var dotParams;
var gradients = {};
var icons = {};

function preload() {
  gradients.top = loadImage('./assets/gradient-top-overlay.png');
  gradients.bottom = loadImage('./assets/gradient-bottom-overlay.png');
}

function setup() {

  gradients.overlay = {
    top: select('#gradientOverlayTop'),
    bottom: select('#gradientOverlayBottom'),
  }

  icons = {
    back: select('#back'),
    paragraph: select('#paragraph')
  }

  dotParams = {
    size: 20,
    position: createVector(windowWidth/2, windowHeight/2),
    sensetivity: {
      dist: params.sensetivity.dist,
      threshold: params.sensetivity.threshold
    },
    wait: params.scrolling.hold
  };

  p5canvas = createCanvas(windowWidth, windowHeight);
  p5canvas.className = 'p5canvas';


  for (var i = 0; i < 4; i++) {
    attentionDots.push(new AttentionDot(dotParams));
  }

  attentionDots[0].updatePos(
    createVector(windowWidth / 2, windowHeight - params.buttons.offset)
  );

  attentionDots[1].updatePos(
    createVector(windowWidth / 2, params.buttons.offset)
  );

  attentionDots[2].updatePos(
    createVector(params.buttons.offset, windowHeight / 2)
  );

  attentionDots[3].updatePos(
    createVector(windowWidth - params.buttons.offset, windowHeight / 2)
  );

  attentionDots[0].setExecute(scrollStep, { dir: 'down' });
  attentionDots[1].setExecute(scrollStep, { dir: 'up' });

  noStroke();

}

var attentionDotData;

// var gazeData = {};

function draw() {

  // gazeData = {
  //   x: mouseX,
  //   y: mouseY
  // }

  fill(0);

  attentionDotData = {
    gaze: gazeData
  };

  if (gazeData != null) {
    for (var i = 0; i < 4; i++) {
      attentionDots[i].update(attentionDotData);
      // attentionDots[i].render();
    }
  }

  // Gradients
  var topOverlaySize = attentionDots[1].progress() * params.preview.gradient.size;
  var bottomOverlaySize = attentionDots[0].progress() * params.preview.gradient.size;
  gradients.overlay.top.style('height', topOverlaySize + 'vw');
  gradients.overlay.bottom.style('height', bottomOverlaySize + 'vw');

  // Icons
  var backSize = 1 + attentionDots[2].progress();
  var paragraphSize = 1 + attentionDots[3].progress();
  icons.back.style('transform', 'scale(' + backSize + ')');
  icons.paragraph.style('transform', 'scale(' + paragraphSize + ')');

}

// Testing the interface

function keyPressed() {
  if (keyCode === 87) {
    scrollStep({dir: 'up'})

  }
  if (keyCode === 83) {
    scrollStep({dir: 'down'});
  }
  
}