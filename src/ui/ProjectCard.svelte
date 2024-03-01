<script lang="ts">
	import { customRedirect, preloadImage } from '$lib';
	import LoadingIndicator from './LoadingIndicator.svelte';

	export let repo: string;
	let link: string = `https://github-readme-stats.vercel.app/api/pin/?username=nedoxff&repo=${repo}&theme=swift&bg_color=00000000&hide_border=true&icon_color=000000&show_owner=true`;
</script>

{#await preloadImage(link)}
	<div
		class="flex min-h-[120px] w-[400px] flex-col items-center justify-center rounded-3xl bg-black/30"
	>
		<LoadingIndicator />
	</div>
{:then}
	<button on:click={() => customRedirect(`https://github.com/nedoxff/${repo}`)}>
		<img
			class="max-h-[150px] min-h-[120px] w-[400px] rounded-3xl shadow-[inset_0px_0px_0px_2px] shadow-dark dark:invert"
			src={link}
			alt="{repo} repo"
		/>
	</button>
{/await}
