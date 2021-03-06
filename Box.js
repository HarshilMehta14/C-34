class Box {
  constructor(x, y, color) {
      var options = {
          'restitution':0.8,
          'friction':1.0,
          'density':1.0
      }
      this.body = Bodies.rectangle(x, y, 70, 70, options);
      this.width = 70;
      this.height = 70;
      this.color = color;
      World.add(world, this.body);
    }
    display(){
      var angle = this.body.angle;
      var p = this.body.position;
      push();
      fill(this.color);
      stroke(255);
      strokeWeight(4);
      translate(p.x, p.y);
      rotate(angle);
      rectMode(CENTER);
      rect(0, 0, this.width, this.height);
      
      pop();
    }
}