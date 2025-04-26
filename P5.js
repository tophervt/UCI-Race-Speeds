let data = [
  { season: 2001, wt: 40.018, classics: 40.208 },
  { season: 2002, wt: 39.786, classics: 41.198 },
  { season: 2003, wt: 40.335, classics: 41.745 },
  { season: 2004, wt: 39.622, classics: 40.778 },
  { season: 2005, wt: 40.481, classics: 41.422 },
  { season: 2006, wt: 40.106, classics: 41.265 },
  { season: 2007, wt: 40.786, classics: 42.080 },
  { season: 2008, wt: 40.658, classics: 42.047 },
  { season: 2009, wt: 40.761, classics: 42.247 },
  { season: 2010, wt: 40.265, classics: 42.272 },
  { season: 2011, wt: 40.687, classics: 42.539 },
  { season: 2012, wt: 40.449, classics: 42.533 },
  { season: 2013, wt: 40.552, classics: 42.718 },
  { season: 2014, wt: 40.924, classics: 42.313 },
  { season: 2015, wt: 41.253, classics: 42.825 },
  { season: 2016, wt: 41.171, classics: 42.657 },
  { season: 2017, wt: 41.067, classics: 42.788 },
  { season: 2018, wt: 41.117, classics: 42.882 },
  { season: 2019, wt: 41.261, classics: 43.153 },
  { season: 2020, wt: 41.102, classics: 42.467 },
  { season: 2021, wt: 41.679, classics: 42.912 },
  { season: 2022, wt: 41.726, classics: 43.389 },
  { season: 2023, wt: 41.935, classics: 43.446 }
];

let xOffset = 80;
let spacing = 25;
let progress = 0;
let speed = 0.04; // even slower = 0.005
let index = 0;

let classicsTrail = [];
let wtTrail = [];

function setup() {
  createCanvas(900, 500);
  frameRate(60);
}

function draw() {
  background(255);
	textAlign(CENTER); textSize(24); fill(0); text("Cycling Speed Trends: UCI Classics vs All Races (2001-2023)", width/2, 30);
	textAlign(LEFT); textSize(14);
	// fill(255, 100, 0); text("Classics WT", 100, 70);
	// fill(0, 100, 255); text("WorldTour All Races", 100, 90);
  drawAxes();

  strokeWeight(2);
  noFill();

  stroke(255, 100, 0);
  beginShape();
  for (let p of classicsTrail) vertex(p.x, p.y);
  endShape();

  stroke(0, 100, 255);
  beginShape();
  for (let p of wtTrail) vertex(p.x, p.y);
  endShape();

  if (index < data.length - 1) {
    let d1 = data[index];
    let d2 = data[index + 1];

    let x1 = xOffset + index * spacing;
    let x2 = xOffset + (index + 1) * spacing;

    let classicsY1 = map(d1.classics, 39, 44, height - 60, 60);
    let classicsY2 = map(d2.classics, 39, 44, height - 60, 60);

    let wtY1 = map(d1.wt, 39, 44, height - 60, 60);
    let wtY2 = map(d2.wt, 39, 44, height - 60, 60);

    let classicsX = lerp(x1, x2, progress);
    let classicsY = lerp(classicsY1, classicsY2, progress);

    let wtX = lerp(x1, x2, progress);
    let wtY = lerp(wtY1, wtY2, progress);

    classicsTrail.push({ x: classicsX, y: classicsY });
    wtTrail.push({ x: wtX, y: wtY });

    drawBike(classicsX, classicsY - 15, color(255, 100, 0));
    drawBike(wtX, wtY - 15, color(0, 100, 255));

    progress += speed;
    if (progress >= 1) {
      progress = 0;
      index++;
    }
  } else {
    let lastClassic = classicsTrail[classicsTrail.length - 1];
    let lastWT = wtTrail[wtTrail.length - 1];
    drawBike(lastClassic.x, lastClassic.y - 15, color(255, 100, 0));
    drawBike(lastWT.x, lastWT.y - 15, color(0, 100, 255));

    textSize(16);
    noStroke();
    fill(255, 100, 0);
    text("Classics WT", lastClassic.x + 150, lastClassic.y - 30);  //
    fill(0, 100, 255);
    text("WorldTour All Races", lastWT.x + 150, lastWT.y + 30);  //lastWT.x + 10, lastWT.y + 30

    noLoop();
  }
}

function drawAxes() {
  stroke(0);
  line(60, 50, 60, height - 50); // Y axis
  line(60, height - 50, width - 20, height - 50); // X axis

  fill(0);
  noStroke();
  textSize(10);
  textAlign(CENTER);
  for (let i = 0; i < data.length; i += 2) {
    let x = xOffset + i * spacing;
    text(data[i].season, x, height - 30);
  }

  textAlign(RIGHT);
  for (let y = 39; y <= 44; y++) {
    let yPos = map(y, 39, 44, height - 60, 60);
    text(y + " km/h", 55, yPos + 3);
  }
}

function drawBike(x, y, frameColor) {
  push();
  translate(x, y);
  rotate(-PI / 20); // gentle tilt up

  stroke(0);
  fill(frameColor);

  // Wheels
  fill(240);
  strokeWeight(2);
  ellipse(-20, 0, 30); // back wheel
  ellipse(20, 0, 30); // front wheel

  // Frame
  stroke(0);
  line(-20, 0, 0, -20); // rear to seat
  line(0, -20, 20, 0); // seat to front
  line(-20, 0, 20, 0); // base
  line(0, -20, 0, -30); // seat post
  line(0, -30, -5, -32); // seat left
  line(0, -30, 5, -32); // seat right

  // Handlebar
  line(20, 0, 25, -15); 
  line(25, -15, 20, -20); 
  line(20, -20, 15, -20);

  pop();
}
