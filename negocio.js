var img;
var mouseXant;
var mouseYant;
var bs = [];

function setup() {
    frameRate(10);
    img = loadImage('australia.png')
    createCanvas(innerWidth,innerHeight);
    noStroke();
    
    bo = {
      x: width/2,
      y: height/2,
      w: 500,
      h: 500,
      min: 5,
      cor: color(0,119,168),
      split: function() {
        w = this.w/2;
        h = this.h/2;
        if ( w < this.min){
            return [this];
        }
          
        let bs = []
        for(let i=0; i < 4; i++) {
           bs.push(Object.create(bo)),
           bs[i].w = w;
           bs[i].h =h;
        }
        bs[0].x = this.x-w/2;
        bs[0].y = this.y-h/2;
        bs[1].x = this.x+w/2;
        bs[1].y = this.y-h/2;
        bs[2].x = this.x-w/2;
        bs[2].y = this.y+h/2;
        bs[3].x = this.x+w/2;
        bs[3].y = this.y+h/2;
          
        return bs;
    }
    };
    
    bs.push(bo);
}

function draw() {
    background(255);
    for(let i=0;i < bs.length; i++){
        b = bs[i];
        fill(b.cor);
        ellipse(b.x,b.y,b.w,b.h);
        if (mouseX != mouseXant || mouseY != mouseYant){
        if (dist(mouseX,mouseY,b.x,b.y) < b.w/2){
            novas = b.split();
            bs.splice(i,1);
            Array.prototype.push.apply(bs,novas);
            mouseXant = mouseX;
            mouseYant = mouseY;
        }
        }
    }
    mouseXant = mouseX;
    mouseYant = mouseY;
}
    
function dist(ax,ay,bx,by) {
    dist = Math.sqrt((ax - bx)^2+(ay-by)^2);
    return dist;
}