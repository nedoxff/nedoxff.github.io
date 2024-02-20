<script lang="ts">
	import { customRedirect, show } from '$lib';
	export let font: string = 'sans';
	export let redirect: boolean = true;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<h1
	class="text-7xl {font == 'mono'
		? 'tracking-tighter'
		: ''} font-medium text-dark dark:text-light font-{font} group h-min w-min {redirect
		? 'cursor-pointer'
		: ''}"
	on:click={() => {
		if (redirect) customRedirect('/');
	}}
>
	nedoxff
	<span
		class="block h-1 max-w-0 bg-dark transition-all duration-500 ease-in-out-quad group-hover:max-w-full dark:bg-light"
	></span>
</h1>
