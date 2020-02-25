//start of bubble animation
class bubble {
    constructor(canvasWidth, canvasHeight) {
      this.maxHeight = canvasHeight;
      this.maxWidth = canvasWidth;
      this.randomise();
    }
  
    generateDecimalBetween(min, max) {
      return (Math.random() * (min - max) + max).toFixed(2);
    }
  
    update() {
      this.posX = this.posX - this.movementX;
      this.posY = this.posY - this.movementY;
  
      if (this.posY < 0 || this.posX < 0 || this.posX > this.maxWidth) {
        this.randomise();
        this.posY = this.maxHeight;
      }
    }
  
    randomise() {
      this.colour = Math.random() * 255;
      this.size = this.generateDecimalBetween(2, 6);
      this.movementX = this.generateDecimalBetween(-0.10, 0.10);
      this.movementY = this.generateDecimalBetween(0.7, 2);
      this.posX = this.generateDecimalBetween(0, this.maxWidth);
      this.posY = this.generateDecimalBetween(0, this.maxHeight);
    }
  }
  
class background {
    constructor() {
      this.canvas = document.getElementById("floatingbubbles");
      this.ctx = this.canvas.getContext("2d");
      this.canvas.height = window.innerHeight;
      this.canvas.width = window.innerWidth;
      this.bubblesList = [];
      this.generateBubbles();
      this.animate();
    }
  
    animate() {
      let self = this;
      self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
      self.bubblesList.forEach(function(bubble) {
        bubble.update();
        self.ctx.beginPath();
        self.ctx.arc(bubble.posX, bubble.posY, bubble.size, 0, 2 * Math.PI);
        self.ctx.fillStyle = "hsl(" + bubble.colour + ", 40%, 39%)";
        self.ctx.fill();
        self.ctx.strokeStyle = "hsl(" + bubble.colour + ", 40%, 39%)";
        self.ctx.stroke();
      });
  
      requestAnimationFrame(this.animate.bind(this));
    }
  
    addBubble(bubble) {
      return this.bubblesList.push(bubble);
    }
  
    generateBubbles() {
      let self = this;
      for (let i = 0; i < self.bubbleDensity(); i++) {
        self.addBubble(new bubble(self.canvas.width, self.canvas.height));
      }
    }
  
    bubbleDensity() {
      return Math.sqrt((this.canvas.height, this.canvas.width) * 5);
    }
  }
  
  window.onload = function() {
    new background();
    this.startTextAnimation();
  };
  
  window.requestAnimFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
})()

//start of typing animation
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

function startTextAnimation() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

AOS.init({
  duration: 120,
})
