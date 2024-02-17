import { writable, type Writable } from 'svelte/store';

export const show: Writable<boolean> = writable(false);

export const MAIN_ANIMATION_DURATION: number = 1000;