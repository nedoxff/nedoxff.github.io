<script lang="ts">
	import { customRedirect, show } from '$lib';
	export let font: string = 'sans';
	export let redirect: boolean = true;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<h1
	class="text-7xl pt-5 font-medium font-{font} h-min w-min group {redirect ? 'cursor-pointer' : ''}"
	on:click={() => {
		if (redirect) customRedirect('/');
	}}
>
	nedoxff
	<span
		class="block max-w-0 group-hover:max-w-full transition-all ease-in-out-quad duration-500 h-1 bg-black"
	></span>
</h1>
