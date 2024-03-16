<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	type $$Props = AlertDialogPrimitive.TitleProps;

	let className: $$Props['class'] = undefined;
	export let level: $$Props['level'] = 'h3';
	export { className as class };
</script>

<AlertDialogPrimitive.Title
	class={cn('text-start text-lg font-semibold leading-none tracking-tight', className)}
	{level}
	{...$$restProps}
>
	<slot />
</AlertDialogPrimitive.Title>
