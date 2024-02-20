<script lang="ts">
	export let baseColor: string;
	export let icon: string;
	export let text: string;
	export let invert: boolean = false;
	export let link: string | undefined = undefined;
</script>

<a href={link}>
	<div class="flex flex-row gap-4 rounded-full px-6 py-4" style="background-color: {baseColor}">
		<img class="h-10 {invert ? 'invert' : 'invert-0'}" src="/social/{icon}.svg" alt="{icon} icon" />
		<p class="text-4xl font-bold text-light transition-all duration-500">{text}</p>
	</div>
</a>
