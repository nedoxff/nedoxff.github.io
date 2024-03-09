<script lang="ts">
	import { showingOverlayedDialog } from '$lib';
	import * as Dialog from '$lib/components/ui/imageDialog';

	export let src: string;

	const onOpenChange = (open: boolean) => showingOverlayedDialog.set(open);
</script>

<Dialog.Root {onOpenChange}>
	<Dialog.Trigger><img class="rounded-xl" {src} alt="" /></Dialog.Trigger>
	<Dialog.Content class="h-max w-max">
		<img
			{src}
			class="h-[unset] max-h-full w-[90vw] max-w-full rounded-xl lg:h-[90vh] lg:w-[unset]"
			alt=""
		/>
	</Dialog.Content>
</Dialog.Root>
