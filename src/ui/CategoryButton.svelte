<script lang="ts">
	import { customRedirect } from '$lib';

	export let text: string;
	export let destination: string;
</script>

<button
	on:click={() => customRedirect(destination)}
	class="flex cursor-pointer items-center justify-center rounded-full border-2 border-dark transition-all duration-[500] ease-in-out-quad hover:bg-dark dark:border-light dark:hover:bg-light"
>
	<h2 class="px-5 py-3 text-4xl text-dark hover:text-light dark:text-light dark:hover:text-dark">
		{text}
	</h2>
</button>
