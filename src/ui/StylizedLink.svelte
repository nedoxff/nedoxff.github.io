<script lang="ts">
	import { customRedirect } from '$lib';

	export let text: string;
	export let destination: string;
</script>

<button
	on:click={() => customRedirect(destination)}
	class="flex justify-center items-center rounded-full transition-all ease-in-out-quad duration-[500] cursor-pointer hover:bg-black border-black border-2"
>
	<h2 class="text-4xl hover:text-white py-3 px-5">{text}</h2>
</button>
