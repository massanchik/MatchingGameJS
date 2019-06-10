export default class Gem {
    constructor(x, y, color) {
        this.invalidColor = 'black';
        this.colorNames = ['red', 'green', 'blue', 'yellow', 'violet'];
        this.colors = {
            red: '#c44',
            green: '#484',
            blue: '#259',
            yellow: '#cc6',
            violet: '#b4b',
        };
        this.color = color || this.randomColor();
        this.x = x;
        this.y = y;
        this.node = document.createElement('div');
        this.node.classList.add('gem');
        this.node.style.backgroundColor = this.colors[this.color];
        this.node.dataset.x = x;
        this.node.dataset.y = y;
        this.node.dataset.color = this.color;
        this.node.style.left = this.getLeft();
        this.node.style.top = this.getTop();
    }

    randomColor() {
        const i = Math.floor(Math.random() * this.colorNames.length);
        return this.colorNames[i];
    }

    getLeft() {
        return 100 / 9 * this.x + '%';
    }

    getTop() {
        return 100 / 16 * (15 - this.y) + '%';
    }

    updateY(y) {
        this.y = y;
        this.node.dataset.y = y;
        this.node.style.top = this.getTop();
    }
}