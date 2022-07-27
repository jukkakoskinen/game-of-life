<script lang="ts">
	import { Game } from '$lib/game';

	let game = Game.create(40, 40);

	setInterval(() => {
		game = game.next();
	}, 100);
</script>

<svelte:head>
	<title>Game of Life</title>
</svelte:head>

<div class="bg-black font-mono min-h-screen text-white">
	<div class="mx-auto max-w-xl p-4 md:p-12">
		<h1 class="mb-2 text-xl">Game of Life</h1>
		<p class="mb-6 text-neutral-400">
			"A cellular automaton devised by the British mathematician John Horton Conway in 1970."
			<span class="text-white"
				>&mdash;&nbsp;<a
					class="underline"
					href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
					rel="noreferrer noopener"
					target="_blank">Wikipedia</a
				></span
			>
		</p>
		<div class="border border-neutral-400 mb-6">
			{#each game.grid as row}
				<div class="flex h-3">
					{#each row as cell}
						<div class="flex-1" class:bg-green-400={cell === 'alive'} />
					{/each}
				</div>
			{/each}
		</div>
		<div class="text-neutral-400 text-sm md:fixed md:bottom-4 md:right-4">
			Made by <a class="text-white underline" href="https://www.jukkakoskinen.fi">Jukka Koskinen</a>
		</div>
	</div>
</div>
