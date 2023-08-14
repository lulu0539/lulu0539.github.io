let svg = document.getElementById("particleSvg");
let particles = [];


// vreate particle
class Particle {
    constructor(x, y, radius, speed, angle) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.angle = angle;
        this.collided = false;
        this.duration = 3000; // Duration of particle appearance in milliseconds
        this.timer = null; //timer
    }

    create() {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", this.x); 
        circle.setAttribute("cy", this.y); 
        circle.setAttribute("r", this.radius);
        circle.setAttribute("fill", "#c9c9c9"); 
        svg.appendChild(circle);
        this.element = circle;
        
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Detects if the screen boundary is exceeded and performs bounce processing
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        if (this.x - this.radius <= 0 || this.x + this.radius >= screenWidth) {
            this.angle = Math.PI - this.angle; // meet left and right, angle change vertivally
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= screenHeight) {
            this.angle = -this.angle; // meet top and bottom, angle change horizontally
        }
        
        // Iterate through all the left side boards 
        for (let i = 0; i < bounceBoardsLeft.length; i++) {
            const bounceBoard = bounceBoardsLeft[i];

            // detect collision on the left
            const isCollidingVertically = this.y - this.radius <= bounceBoard.y.baseVal.value + bounceBoard.height.baseVal.value && this.y + this.radius >= bounceBoard.y.baseVal.value;
            const isCollidingHorizontally = this.x - this.radius <= bounceBoard.x.baseVal.value + bounceBoard.width.baseVal.value && this.x + this.radius >= bounceBoard.x.baseVal.value;
            const isColliding = isCollidingVertically && isCollidingHorizontally;

            // when both conditions are satisfied, there happens collision
            if (isColliding) {
                // Mark as collided
                this.collided = true;

                // Change the angle and position of the particle by determining the collision position
                if (this.x <= bounceBoard.x.baseVal.value || this.x >= bounceBoard.x.baseVal.value + bounceBoard.width.baseVal.value) {
                    this.angle = Math.PI - this.angle; // meet left and right, angle change vertivally
                } else {
                    this.angle = -this.angle; // meet top and bottom, angle change horizontally
                }
            }
        }

        // Iterate through all the right side boards 
        for (let i = 0; i < bounceBoardsRight.length; i++) {
            const bounceBoard = bounceBoardsRight[i];

            // 
            const isCollidingVertically = this.y - this.radius <= bounceBoard.y.baseVal.value + bounceBoard.height.baseVal.value && this.y + this.radius >= bounceBoard.y.baseVal.value;
            const isCollidingHorizontally = this.x - this.radius <= bounceBoard.x.baseVal.value + bounceBoard.width.baseVal.value && this.x + this.radius >= bounceBoard.x.baseVal.value;
            const isColliding = isCollidingVertically && isCollidingHorizontally;

            // 
            if (isColliding) {
                // 
                this.collided = true;

                // 通
                if (this.x <= bounceBoard.x.baseVal.value || this.x >= bounceBoard.x.baseVal.value + bounceBoard.width.baseVal.value) {
                    this.angle = Math.PI - this.angle; // meet left and right, angle change vertivally
                } else {
                    this.angle = -this.angle; // meet top and bottom, angle change horizontally
                }
            }
        }  

        this.element.setAttribute("cx", this.x);
        this.element.setAttribute("cy", this.y);

    }
}


// Handling user click events
svg.addEventListener("click", function(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let numParticles = 80; // paricle numbers
    let radius = 2; // defalt radius
    let speed = 2; // velocity
    
    for (let i = 0; i < numParticles; i++) {
        let angle = (360 / numParticles) * i;
        let particle = new Particle(mouseX, mouseY, radius, speed, angle);
        particle.create();
        particles.push(particle);
    }
});

// Trigger animations and update the state of particles
function animateParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
}

let interval = setInterval(animateParticles, 16); // Update the particle state every 16 milliseconds