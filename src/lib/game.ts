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

	private neighbors(x: number, y: number): Cell[] {
		const t = (y - 1 + this.height) % this.height;
		const r = (x + 1) % this.width;
		const b = (y + 1) % this.height;
		const l = (x - 1 + this.width) % this.width;

		return [
			this.grid[t][l],
			this.grid[t][x],
			this.grid[t][r],
			this.grid[y][r],
			this.grid[b][r],
			this.grid[b][x],
			this.grid[b][l],
			this.grid[y][l]
		];
	}
}
