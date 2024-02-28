import type { Masonry } from '@fristys/masonry';
import { writable, type Writable } from 'svelte/store';

export const show: Writable<boolean> = writable(false);
export const showingOverlayedDialog: Writable<boolean> = writable(false);

export const MAIN_ANIMATION_DURATION: number = 1000;

export const customRedirect = (destination: string) => {
	show.set(false);
	setTimeout(() => {
		window.history.replaceState(null, '', destination);
		window.location.reload();
	}, MAIN_ANIMATION_DURATION + 300);
};

export const enableMasonry: import('svelte/action').Action<
	HTMLElement,
	(node: HTMLElement) => Masonry | undefined
> = (node: HTMLElement, provider: (node: HTMLElement) => Masonry | undefined) => {
	const masonry = provider(node);

	return {
		destroy() {
			masonry?.dispose();
		}
	};
};
