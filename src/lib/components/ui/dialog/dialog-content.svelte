<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import X from 'lucide-svelte/icons/x';
	import * as Dialog from '.';
	import { cn, flyAndScale } from '$lib/utils';

	type $$Props = DialogPrimitive.ContentProps;

	let className: $$Props['class'] = undefined;
	export let transition: $$Props['transition'] = flyAndScale;
	export let transitionConfig: $$Props['transitionConfig'] = {
		duration: 200
	};
	export { className as class };
</script>

<Dialog.Portal>
	<Dialog.Overlay />
	<DialogPrimitive.Content
		{transition}
		{transitionConfig}
		class={cn(
			'fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] place-content-center gap-4 shadow-lg sm:rounded-lg',
			className
		)}
		{...$$restProps}
	>
		<div class="relative">
			<slot />
			<DialogPrimitive.Close
				class="absolute right-4 top-4 rounded-full border-2 border-white p-2 opacity-70 mix-blend-difference transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
			>
				<img src="/icons/close.svg" class="h-4 w-4 mix-blend-difference invert" alt="close icon" />
				<span class="sr-only">Close</span>
			</DialogPrimitive.Close>
		</div>
	</DialogPrimitive.Content>
</Dialog.Portal>
