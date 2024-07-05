class AttentionDot {
  constructor(p) {
    this.position = p.position;
    this.size = p.size;
    this.sensetivity = p.sensetivity;
    this.wait = p.wait;
    // this.attention;

    this.gaze = createVector(0, 0);
    this.dist = createVector(0, 0);

    this.switch = 0;
    this.scale = 0;

    this.pressed = false;

    this.execute = {};

    this.timer = 0;

  }

  update(p) {
    // this.attention = p.attention;
    this.gaze.x = p.gaze.x;
    this.gaze.y = p.gaze.y;

    this.dist = this.gaze.dist(this.position);

    if (this.pressed) {
      this.timer++;
      if (this.timer > this.wait / frameRate()) {
        this.pressed = false;
      }
    }

    if (!this.pressed) {
      this.timer = 0;
      if (this.switch > this.sensetivity.threshold) {
        this.pressed = true;
        if (this.execute.f != null) {
          this.execute.f(this.execute.p);
        }
        this.reset();
      }

      if (this.dist < this.sensetivity.dist) {
        this.switch++;
        // if (this.attention < this.sensetivity.attention) {
        //   
        // }
      } else {
        if (this.switch >= 0) {
          this.switch--;
        }
      }
    }
  }

  reset() {
    // console.log('Reset!');
    this.switch = 0;
  }

  updatePos(position) {
    this.position = position;
  }

  setExecute(f, p) {
    this.execute = {
      f: f,
      p: p
    };
  }

  render() {

    fill(0);

    if (this.pressed) {
      fill(0, 255, 0);
    }

    ellipse(this.position.x, this.position.y, this.size + this.switch, this.size + this.switch);
  }

  progress() {
    return this.switch / this.sensetivity.threshold;
  }
}
