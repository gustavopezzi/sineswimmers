$(document).ready(function() {
    var c = document.createElement('canvas'),
        $ = c.getContext('2d'),
        w = c.width = window.innerWidth,
        h = c.height = window.innerHeight,
        particles = [],
        particleCount = 50;

    document.body.appendChild(c);

    function init() {
        for (var i = 0; i < particleCount; i++) {
            particles.push(new particle());
        }
        reset();
        loop();
    }

    function particle() {
        this.location = {
            x: Math.random() * w,
            y: h / 2
        };
        this.speed = Math.random() * 2 + 1;
        this.z = Math.random() * 50 + 25;
    }

    function draw() {
        $.fillStyle = 'rgba(50, 50, 50, 0.50)';
        $.fillRect(0, 0, w, h);
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
        
            if (i % 2 == 0)
                p.location.y =  h / 2 + (Math.sin(p.location.x / (p.z / 2)) * p.z)
            else if (i % 2 == 1)
                p.location.y =  h / 2 + -(Math.sin(p.location.x / (p.z / 2)) * p.z)
        
            $.beginPath();
            $.arc(p.location.x, p.location.y, 1, 0, Math.PI * 2);
            $.fillStyle = 'rgba(255, 255, 255, 1)';
            $.fill();
            p.location.x += p.speed;
        
            if (p.location.x > w) {
                p.location.x = 0;
                p.z = Math.random() * 50 + 25;
            }
        }
    }

    function reset() {
        w = c.width = window.innerWidth;
        h = c.height = window.innerHeight;
    }

    function loop() {
        requestAnimationFrame(loop);
        draw();
    }

    window.addEventListener('resize', reset);
    init();
});