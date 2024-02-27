<script lang="ts">
	import { showingOverlayedDialog } from "$lib";
    import * as Dialog from "$lib/components/ui/dialog";
    
    export let src: string;

    const onOpenChange = (open: boolean) => showingOverlayedDialog.set(open);
</script>

<Dialog.Root onOpenChange={onOpenChange}>
    <Dialog.Trigger><img src={src} alt=""/></Dialog.Trigger>
    <Dialog.Content class="w-max h-max">
        <img src={src} class="w-[90vw] md:w-[unset] h-[unset] md:h-[90vh] max-h-full max-w-full rounded-xl" alt=""/>
    </Dialog.Content>
</Dialog.Root>