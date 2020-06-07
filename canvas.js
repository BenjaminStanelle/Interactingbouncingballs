var canvas = document.querySelector("canvas");
canvas.width= window.innerWidth;
canvas.height= window.innerHeight;

var ctx = canvas.getContext('2d');

var mouse= {
	x:undefined, 
	y: undefined
}
var maxRadius=80;
var minRadius= 14;
var mouseAreaEffect= 100;

var colorArray= ['#ffff33','#aaaa33','#ffbb33','#ffba33','#ffaaf3'];
window.addEventListener('mousemove', function(event){ 
					mouse.x= event.x
					mouse.y= event.y
					}		
);

window.addEventListener('resize', function() {
				canvas.width= window.innerWidth;
				canvas.height= window.innerHeight;
				initialize();
			});
function Circle(x, y, dx, dy, radius, minRadius) {
	this.x=x
	this.y=y;
	this.dx= dx;
	this.dy= dy;
	this.radius= radius;
	this.minRadius= radius;
	this.red = Math.floor(Math.random()*256);
	this.green = Math.floor(Math.random()*256);
	this.blue = Math.floor(Math.random()*256);

	this.draw = function() {
		ctx.beginPath();

		//x, y, radius, ,startAngle: float, endAngle: float, drawCounterClockwise: Bool(false));
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.lineWidth = 5;
		ctx.fillStyle= "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
		ctx.fill();
		ctx.strokeStyle= 'black';
		ctx.stroke();
	}
	this.update = function() {
		if (this.x+this.radius>= innerWidth || this.x - this.radius<= 0) {
			this.dx= -this.dx;
		}
	
		if (this.y+this.radius>= innerHeight || this.y - this.radius<= 0) {
			this.dy= -this.dy;
		}
		this.y+=this.dy;
		this.x+= this.dx;

		//interactivity
		if(mouse.x - this.x < mouseAreaEffect && mouse.x - this.x > -mouseAreaEffect && mouse.y - this.y <mouseAreaEffect && mouse.y -this.y > -mouseAreaEffect ) {
			if(this.radius< maxRadius){
			this.radius+=5;
			}
		}
		else if (this.radius > this.minRadius) {
			this.radius -=0.5;
		}

		this.draw();
	}
}

	var circleArray=[];

function initialize(){
	circleArray=[];
	for (var i=0; i<300; i++){	
		var radius = Math.floor(Math.random()*39+1);
		var x = Math.floor(Math.random()*(innerWidth-radius*2))+radius;
		var y =  Math.floor(Math.random()*(innerHeight-radius*2))+radius;
		var dx= (Math.random() -0.5)*Math.floor(Math.random()*15);
		var dy= (Math.random() -0.5)*Math.floor(Math.random()*15);
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	for(var i = 0; i< circleArray.length; i++){
		circleArray[i].update();
	}

}	
initialize();
animate();