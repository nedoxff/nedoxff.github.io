<script lang="ts">
	export let text: string;
	export let link: string;
</script>

<a href={link} target="_blank"
	><u>{text}</u>
	<img
		class="-ml-2 inline-block align-bottom dark:invert"
		src="/icons/link.svg"
		alt="link icon"
	/></a
>
