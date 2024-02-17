declare global {
	interface CanvasRenderingContext2D {
		wavy(
			from: { x: number; y: number },
			to: { x: number; y: number },
			frequency: number,
			amplitude: number,
			step: number,
			negative: boolean,
			movement: number
		): void;
	}
}

CanvasRenderingContext2D.prototype.wavy = function (
	from: { x: number; y: number },
	to: { x: number; y: number },
	frequency: number,
	amplitude: number,
	step: number,
	negative: boolean = false,
	movement: number = 0
) {
	var cx = 0,
		cy = 0,
		fx = from.x,
		fy = from.y,
		tx = to.x,
		ty = to.y,
		i = 0,
		waveOffsetLength = 0,
		ang = Math.atan2(ty - fy, tx - fx),
		distance = Math.sqrt((fx - tx) * (fx - tx) + (fy - ty) * (fy - ty)),
		a = amplitude * (!negative ? 1 : -1),
		f = Math.PI * frequency;

	for (i; i <= distance; i += step) {
		waveOffsetLength = Math.sin((i / distance) * f - movement) * a;
		cx = from.x + Math.cos(ang) * i + Math.cos(ang - Math.PI / 2) * waveOffsetLength;
		cy = from.y + Math.sin(ang) * i + Math.sin(ang - Math.PI / 2) * waveOffsetLength;
		i > 0 ? this.lineTo(cx, cy) : this.moveTo(cx, cy);
	}
};

export {};
