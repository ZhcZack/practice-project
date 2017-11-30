var randomBetween = function (a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
};
var log = function (msg) {
    console.log(msg);
};
var ParticleSystem = /** @class */ (function () {
    function ParticleSystem(scene) {
        this.particles = [];
        this.scene = scene;
        this.setup();
    }
    ParticleSystem.prototype.setup = function () {
        this.addParticles();
    };
    ParticleSystem.prototype.addParticle = function (p) {
        p.scene = this.scene;
        this.particles.push(p);
    };
    ParticleSystem.prototype.addParticles = function () {
        for (var i = 0; i < 6; i++) {
            var p = new Particle();
            this.addParticle(p);
        }
    };
    ParticleSystem.prototype.draw = function () {
        this.particles.forEach(function (p) { return p.draw(); });
        this.drawLines();
    };
    ParticleSystem.prototype.update = function () {
        this.particles.forEach(function (p) { return p.update(); });
    };
    ParticleSystem.prototype.drawLines = function () {
        // 这里性能可能有问题
        for (var i = 0; i < this.particles.length; i++) {
            var a = this.particles[i];
            for (var j = i + 1; j < this.particles.length; j++) {
                var b = this.particles[j];
                this.drawLineBetween(a, b);
            }
        }
    };
    ParticleSystem.prototype.drawLineBetween = function (a, b) {
        var ctx = this.scene.context;
        ctx.strokeStyle = 'purple';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
    };
    return ParticleSystem;
}());
var Particle = /** @class */ (function () {
    function Particle() {
        this.x = 0;
        this.y = 0;
        this.r = 0;
        this.setup();
    }
    Particle.prototype.setup = function () {
        // 硬编码要不得
        var width = 800;
        var height = 600;
        this.r = randomBetween(4, 8);
        this.x = randomBetween(this.r, width - this.r);
        this.y = randomBetween(this.r, height - this.r);
        this.speedX = randomBetween(1, 3);
        this.speedY = randomBetween(1, 3);
        // this.numbers = []
    };
    Particle.prototype.move = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x <= this.r || this.x >= 800 - this.r) {
            this.speedX *= -1;
        }
        if (this.y <= this.r || this.y >= 600 - this.r) {
            this.speedY *= -1;
        }
    };
    Particle.prototype.draw = function () {
        if (!this.scene) {
            return;
        }
        var ctx = this.scene.context;
        ctx.fillStyle = 'purple';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    };
    Particle.prototype.update = function () {
        this.move();
    };
    return Particle;
}());
var Scene = /** @class */ (function () {
    function Scene() {
        this.canvas = document.querySelector('#particle');
        this.context = this.canvas.getContext('2d');
        this.elements = [];
        this.setup();
    }
    Scene.prototype.setup = function () {
        var ps = new ParticleSystem(this);
        this.addElement(ps);
    };
    Scene.prototype.addElement = function (elem) {
        this.elements.push(elem);
    };
    Scene.prototype.update = function () {
        this.elements.forEach(function (elem) {
            elem.update();
        });
    };
    Scene.prototype.clear = function () {
        var x = this.canvas.width;
        var y = this.canvas.height;
        this.context.clearRect(0, 0, x, y);
    };
    Scene.prototype.draw = function () {
        this.elements.forEach(function (elem) {
            elem.draw();
        });
    };
    Scene.prototype.animation = function () {
        this.clear();
        this.draw();
        this.update();
    };
    return Scene;
}());
var Process = /** @class */ (function () {
    function Process() {
    }
    Process.prototype.runloop = function () {
        var _this = this;
        if (!this.scene) {
            return;
        }
        this.scene.animation();
        window.requestAnimationFrame(function () {
            _this.runloop();
        });
    };
    Process.prototype.start = function () {
        this.runloop();
    };
    Process.prototype.update = function () {
        this.scene.update();
    };
    Process.prototype.draw = function () {
        this.scene.draw();
    };
    Process.prototype.clear = function () {
        this.scene.clear();
    };
    Process.prototype.runWithScene = function (s) {
        this.scene = s;
        this.start();
    };
    return Process;
}());
var main = function () {
    var p = new Process();
    var s = new Scene();
    p.runWithScene(s);
};
window.addEventListener('load', function (event) {
    main();
});
