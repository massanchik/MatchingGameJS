import Gem from "./gem";

export default class Board {
    constructor(x, y) {
        this.node = document.createElement('div');
        this.node.classList.add('board');
        document.body.appendChild(this.node);
        this.x = x;
        this.y = y;
        this.grid = [];
    }

    build() {
        for (let x = 0; x < this.x; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.y; y++) {
                const gem = new Gem(x, y);
                this.node.appendChild(gem.node);
                this.grid[x][y] = gem;
            }

        }
        this.node.addEventListener('click', event => {
            if (!event.target.classList.contains('gem')) {
                console.log('no gem');
                return;
            }
            const gem = this.grid[event.target.dataset.x][event.target.dataset.y];
            let matches = [gem];
            this.match(gem, matches);
            console.log(`Matches: ${matches.length} ${gem.color} ${gem.x} ${gem.y}`);
            if (matches.length < 2) {
                return;
            }

            let xs = [];
            for (let match of matches) {
                if (xs.indexOf(match.x) == -1) {
                    xs.push(match.x);
                }
                match.node.remove()
                this.grid[match.x][match.y] = null;
                for (let y = match.y + 1; y < this.y; y++) {
                    if (!this.grid[match.x][y]) continue;
                    this.grid[match.x][y - 1] = this.grid[match.x][y]
                    this.grid[match.x][y - 1].updateY(y - 1);
                    this.grid[match.x][y] = null;
                }
            }
            for (const x of xs) {
                for (let y = 0; y < this.grid[x].length; y++) {
                    if (this.grid[x][y]) continue;
                    const gem = new Gem(x, this.y + 1);
                    this.node.appendChild(gem.node);
                    setTimeout(() => gem.updateY(y), 1)
                    this.grid[x][y] = gem;

                }
            }
        });
    }

    checkAndAdd(gem, match, matches) {
        if (match.color !== gem.color || matches.indexOf(match) > -1) return;
        matches.push(match);
        this.match(match, matches);
    }

    match(gem, matches) {
        let match = null;
        if (gem.x - 1 >= 0) {
            match = this.grid[gem.x - 1][gem.y];
            this.checkAndAdd(gem, match, matches);
        }
        if (gem.x + 1 < this.x) {
            match = this.grid[gem.x + 1][gem.y];
            this.checkAndAdd(gem, match, matches);
        }
        if (gem.y - 1 >= 0) {
            match = this.grid[gem.x][gem.y - 1];
            this.checkAndAdd(gem, match, matches);
        }
        if (gem.y + 1 < this.y) {
            match = this.grid[gem.x][gem.y + 1];
            this.checkAndAdd(gem, match, matches);
        }
    }
}