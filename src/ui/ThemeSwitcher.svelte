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
	class="ml-3 self-center flex justify-center items-center transition-all ease-in-out-quad duration-[500] dark:bg-dark hover:dark:bg-light dark:border-light border-dark border-2 rounded-full h-min p-2"
	on:click={onClicked}
>
	<img
		bind:this={icon}
		src="/icons/{theme}_mode.svg"
		width="36"
		class="transition-all ease-in-out-quad duration-[500] dark:invert hover:dark:invert-0"
		alt="theme icon"
	/>
</button>
