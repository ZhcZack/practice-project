const randomBetween = (a: number, b: number): number => {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

const log = (msg: string) => {
    console.log(msg);
}

interface SceneElement {
    update(): void;
    draw(): void;
}

class ParticleSystem implements SceneElement {
    private scene: Scene | null;
    private particles: Particle[];

    constructor(scene: Scene) {
        this.particles = [];
        this.scene = scene;
        this.setup();
    }
    setup() {
        this.addParticles();
    }
    addParticle(p: Particle) {
        p.scene = this.scene;
        this.particles.push(p);
    }
    addParticles() {
        for (let i = 0; i < 6; i++) {
            let p = new Particle();
            this.addParticle(p);
        }
    }
    draw() {
        this.particles.forEach(p => p.draw());
        this.drawLines();
    }
    update() {
        this.particles.forEach(p => p.update());
    }
    drawLines() {
        // 这里性能可能有问题
        for (let i = 0; i < this.particles.length; i++) {
            let a = this.particles[i];
            for (let j = i + 1; j < this.particles.length; j++) {
                let b = this.particles[j];
                this.drawLineBetween(a, b);
            }
        }
    }
    drawLineBetween(a, b) {
        let ctx = this.scene.context;
        ctx.strokeStyle = 'purple';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
    }
}

class Particle implements SceneElement {
    private x: number;
    private y: number;
    private r: number;
    private speedX: number;
    private speedY: number;
    // private numbers: [];
    scene: Scene | null;

    constructor() {
        this.x = 0;
        this.y = 0;
        this.r = 0;
        this.setup();
    }
    setup() {
        // 硬编码要不得
        const width = 800;
        const height = 600;

        this.r = randomBetween(4, 8);
        this.x = randomBetween(this.r, width - this.r);
        this.y = randomBetween(this.r, height - this.r);
        this.speedX = randomBetween(1, 3);
        this.speedY = randomBetween(1, 3);
        // this.numbers = []
    }
    move() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x <= this.r || this.x >= 800 - this.r) {
            this.speedX *= -1;
        }
        if (this.y <= this.r || this.y >= 600 - this.r) {
            this.speedY *= -1;
        }
    }
    draw() {
        if (!this.scene) {
            return;
        }
        let ctx = this.scene.context;
        ctx.fillStyle = 'purple';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        this.move();
    }
}

class Scene {
    private canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    private elements: SceneElement[];

    constructor() {
        this.canvas = document.querySelector('#particle') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
        this.elements = [];

        this.setup();
    }
    setup() {
        let ps = new ParticleSystem(this);
        this.addElement(ps);
    }
    addElement(elem: SceneElement) {
        this.elements.push(elem);
    }
    update() {
        this.elements.forEach(elem => {
            elem.update();
        });
    }
    clear() {
        let x = this.canvas.width;
        let y = this.canvas.height;
        this.context.clearRect(0, 0, x, y);
    }
    draw() {
        this.elements.forEach(elem => {
            elem.draw();
        });
    }
    animation() {
        this.clear();
        this.draw();
        this.update();
    }
}

class Process {
    private scene: Scene | null;

    constructor() {

    }

    private runloop() {
        if (!this.scene) {
            return;
        }
        this.scene.animation();
        window.requestAnimationFrame(() => {
            this.runloop();
        });
    }

    private start() {
        this.runloop();
    }

    private update() {
        this.scene.update();
    }

    private draw() {
        this.scene.draw();
    }

    private clear() {
        this.scene.clear();
    }

    runWithScene(s: Scene) {
        this.scene = s;
        this.start();
    }
}

const main = () => {
    const p = new Process();
    const s = new Scene();
    p.runWithScene(s);
}

window.addEventListener('load', event => {
    main();
});