<script lang="ts">
	let icon: HTMLImageElement;
	let theme: string;

	$: theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';

	const onClicked = () => {
		theme = theme == 'dark' ? 'light' : 'dark';

		if (theme == 'dark') document.documentElement.classList.add('dark');
		else document.documentElement.classList.remove('dark');

		localStorage.setItem('theme', theme);
	};
</script>

<button
	class="group ml-3 flex h-min items-center justify-center self-center rounded-full border-2 border-dark bg-light p-2 transition-all duration-[500] ease-in-out-quad hover:bg-dark dark:border-light dark:bg-dark hover:dark:bg-light"
	on:click={onClicked}
>
	<img
		bind:this={icon}
		src="/icons/{theme}_mode.svg"
		width="36"
		class="transition-all duration-[500] ease-in-out-quad group-hover:invert dark:invert group-hover:dark:invert-0"
		alt="theme icon"
	/>
</button>
