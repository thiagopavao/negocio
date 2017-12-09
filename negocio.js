var img;
var mouseXant;
var mouseYant;
var bs = [];
var minX;
var minY;
var maxX;
var maxY;
var minXimg;
var minYimg;
var maxXimg;
var maxYimg;
var zise = 500;
var fundo;


function preload() {
   img = loadImage('walrus_bucket.jpg') 
}
function setup() {
    createCanvas(innerWidth,innerHeight);
    noStroke();
    fundo = color(255);
    minX = width/2 - zise/2;
    maxX = width/2 + zise/2;
    minY = height/2 - zise/2;
    maxY = height/2 + zise/2;
    minXimg = 0;
    maxXimg = img.width;
    minYimg = 0;
    maxYimg = img.height;
    
    bo = {
      x: width/2,
      y: height/2,
      fx: width/2,
      fy: height/2,
      velox: 0,
      veloy: 0,
      w: zise,
      h: zise,
      min: 2,
      cor: color(0,119,168),
      movendo: function() {
        return !(this.x == this.fx && this.y == this.fy);
      },
      getColor: function() {
          x = map(this.fx,minX,maxX,minXimg,maxXimg);
          y = map(this.fy,minY,maxY,minYimg,maxYimg);
          this.cor = color(img.get(x,y));
      },
        
      animara: function(){
          this.x += (this.fx - this.x) * 0.05;
          this.y += (this.fy - this.y) * 0.05;
      },
      
      animarr: function(){
          if(this.x != this.fx){
             if (abs(this.fx - this.x)<abs(this.velox)) {
                 this.x = this.fx;
             }else{
                 this.x += this.velox;
             }
          }
          if(this.y != this.fy){
            if (abs(this.fy - this.y)<abs(this.veloy)) {
                 this.y = this.fy;
             }else{
                 this.y += this.veloy;
             }
          }
      },
      getVelo() {
          this.velox += (this.fx - this.x) /30;
          this.veloy += (this.fy - this.y) /30;
      },
        
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
           bs[i].x= this.x
           bs[i].y= this.y
        }
        bs[0].fx = this.x-w/2;
        bs[0].fy = this.y-h/2;
        bs[1].fx = this.x+w/2;
        bs[1].fy = this.y-h/2;
        bs[2].fx = this.x-w/2;
        bs[2].fy = this.y+h/2;
        bs[3].fx = this.x+w/2;
        bs[3].fy = this.y+h/2;
        
        for(i=0;i<4;i++){
            bs[i].getColor();
            bs[i].getVelo();
        }
          
        return bs;
    }
    };
    bo.getColor();
    bs.push(bo);
}

function draw() {
    background(fundo);
    for(let i=bs.length-1;i >= 0; i--){
        b = bs[i];
        fill(b.cor);
        if (racista(b.cor,fundo)){
            stroke(200);
            strokeWeight(1);
        } else {
            noStroke();
        }
        b.animarr();
        ellipse(b.x,b.y,b.w,b.h);
        if(!b.movendo()){
            if (dist(mouseXant,mouseYant,b.x,b.y) > b.w/2){
            if (dist(mouseX,mouseY,b.x,b.y) < b.w/2){
                novas = b.split();
                bs.splice(i,1);
                Array.prototype.push.apply(bs,novas);
            
            }
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

function racista(a, b) {
    if (abs(a.levels[0] - b.levels[0])>20 || abs(a.levels[1] - b.levels[1])>20 || abs(a.levels[2] - b.levels[2])>20){
        return false;
    }else{
        return true;
    }
}