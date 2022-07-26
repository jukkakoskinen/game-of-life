import { range } from './util';

type Cell = 'dead' | 'alive';

export class Game {
	constructor(readonly width: number, readonly height: number, readonly grid: Cell[][]) {}

	static create(width: number, height: number): Game {
		const grid: Cell[][] = range(0, height).map(() =>
			range(0, width).map(() => (Math.random() < 0.25 ? 'alive' : 'dead'))
		);

		return new Game(width, height, grid);
	}

	next(): Game {
		const grid: Cell[][] = this.grid.map((row, y) =>
			row.map((cell, x) => {
				const liveNeighbors = this.neighbors(x, y).filter((cell) => cell === 'alive');
				if (cell === 'alive' && (liveNeighbors.length === 2 || liveNeighbors.length === 3)) {
					return 'alive';
				} else if (cell === 'dead' && liveNeighbors.length === 3) {
					return 'alive';
				} else {
					return 'dead';
				}
			})
		);

		return new Game(this.width, this.height, grid);
	}

	private bottom(x: number, y: number): Cell {
		return this.grid[(y + 1) % this.height][x];
	}

	private bottomLeft(x: number, y: number): Cell {
		return this.grid[(y + 1) % this.height][(x - 1 + this.width) % this.width];
	}

	private bottomRight(x: number, y: number): Cell {
		return this.grid[(y + 1) % this.height][(x + 1) % this.width];
	}

	private left(x: number, y: number): Cell {
		return this.grid[y][(x - 1 + this.width) % this.width];
	}

	private neighbors(x: number, y: number): Cell[] {
		return [
			this.bottom(x, y),
			this.bottomLeft(x, y),
			this.bottomRight(x, y),
			this.left(x, y),
			this.right(x, y),
			this.top(x, y),
			this.topLeft(x, y),
			this.topRight(x, y)
		];
	}

	private right(x: number, y: number): Cell {
		return this.grid[y][(x + 1) % this.width];
	}

	private top(x: number, y: number): Cell {
		return this.grid[(y - 1 + this.height) % this.height][x];
	}

	private topLeft(x: number, y: number): Cell {
		return this.grid[(y - 1 + this.height) % this.height][(x - 1 + this.width) % this.width];
	}

	private topRight(x: number, y: number): Cell {
		return this.grid[(y - 1 + this.height) % this.height][(x + 1) % this.width];
	}
}
