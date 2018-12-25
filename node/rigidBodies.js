const bodyCount = 1;
let loop;

class Arm {
  constructor() {
    this.mass = 10;
    this.width = 1 + Math.random() * 2;
    this.height = 1 + Math.random() * 2;
    this.inertia = null;
  }

  calculateInertia() {
    this.inertia = this.mass * (this.width^2 + this.height^2) / 12;
  }
}

class RigidBody {
  constructor() {
    this.position = new Vector(Math.random() * 50, Math.random() * 50);
    this.angle = Math.random() * Math.PI * 2;
    this.velocity = new Vector(0, 0);
    this.angVel = 0;

    let shape = new Arm();
    shape.calculateInertia();
    this.shape = shape; 
  }

  forceAndTorque() {
    PVector f = new PVector(0, 100);
    this.force = f;

    PVector r = new PVector(this.width / 2, this.height / 2);
    this.torque = r.x * f.y - r.y * f.x;
  }
}

let bodies = []; 
for (let i = 0; i < bodyCount; i++) {
  body.push(new Body());
}

loop = () => {
  for (let i = 0; i < bodies.length; i++) {
    let body = bodies[i];
    console.log(`body[${i}] position = (${body.position.x}, ${body.position.y}), angle = ${body.angle}`)
  }
}