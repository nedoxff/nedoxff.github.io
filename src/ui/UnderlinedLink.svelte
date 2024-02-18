<script lang="ts">
	export let text: string;
	export let link: string;
</script>

<a href={link}
	><u>{text}</u>
	<img
		class="dark:invert inline-block -ml-2 align-baseline"
		src="/icons/link.svg"
		alt="link icon"
	/></a
>
