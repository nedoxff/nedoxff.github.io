<script lang="ts">
	import { Collapsible as CollapsiblePrimitive } from 'bits-ui';
	import { slide } from 'svelte/transition';

	export let transition: CollapsiblePrimitive.ContentProps['transition'] = slide;
	export let transitionConfig: CollapsiblePrimitive.ContentProps['transitionConfig'] = {
		duration: 300
	};
</script>

<CollapsiblePrimitive.Content {transition} {transitionConfig} {...$$restProps}>
	<slot />
</CollapsiblePrimitive.Content>
