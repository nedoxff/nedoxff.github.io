<script lang="ts">
	import { onMount } from 'svelte';
	import '$lib/canvasExtensions';
	import '$lib/arrayExtensions';
	import anime from 'animejs';
	import { MAIN_ANIMATION_DURATION, show } from '$lib';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let movement: number = 0;
	let horizontal: boolean = false;

	const MOVEMENT_DELTA: number = 0.015;

	function draw() {
		movement += MOVEMENT_DELTA;

		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		ctx.lineCap = 'round';
		ctx.lineWidth = 10;
		ctx.strokeStyle = '#000000';
		ctx.beginPath();
		ctx.wavy(
			horizontal ? { x: 0, y: 20 } : { x: 20, y: 0 },
			horizontal ? { x: window.screen.width, y: 20 } : { x: 20, y: window.screen.height },
			25,
			5,
			2,
			false,
			movement
		);
		ctx.stroke();

		window.requestAnimationFrame(draw);
	}

	onMount(() => {
		resizeCanvas();
		show.subscribe((v) => {
			anime({
				targets: canvas,
				clipPath: horizontal
					? ['xywh(0 0 0% 100%)', 'xywh(0 0 100% 100%)'].reverseIf(!v)
					: ['xywh(0 0 100% 0%)', 'xywh(0 0 100% 100%)'].reverseIf(!v),
				duration: MAIN_ANIMATION_DURATION,
				easing: 'easeInOutQuad'
			});
		});

		ctx = canvas.getContext('2d')!;
		draw();
	});

	function resizeCanvas() {
		horizontal = window.innerWidth <= 768;
		canvas.height = horizontal ? 30 : window.innerHeight;
		canvas.width = horizontal ? window.innerWidth : 30;
	}
</script>

<svelte:window on:resize={resizeCanvas} />
<canvas bind:this={canvas}></canvas>
