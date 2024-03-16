//@ts-nocheck
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

const ffmpeg = new FFmpeg();
export let hls;
export let hevcMode;

async function internalLoadFfmpeg(multicore) {
	const baseUrl = `https://cdn.jsdelivr.net/npm/@imput/ffwasm524-core-mt@latest/dist/esm`;

	await ffmpeg.load({
		coreURL: await toBlobURL(`${baseUrl}/ffmpeg-core.js`, 'text/javascript'),
		wasmURL: await toBlobURL(`${baseUrl}/ffmpeg-core.wasm`, 'application/wasm'),
		workerURL: await toBlobURL(`${baseUrl}/ffmpeg-core.worker.js`, 'text/javascript')
	});

	return ffmpeg;
}

export const loadFfmpeg = async () => {
	hevcMode = !Hls.isSupported();
	if (!hevcMode) {
		console.log('hls is supported');
		hls = new Hls({
			liveDurationInfinity: true,
			//maxFragLookUpTolerance: 0,
			//liveMaxLatencyDurationCount: 5,
			debug: true,
			initialLiveManifestSize: 3,
			lowLatencyMode: false,

			transcoderPluginOptions: {
				multicore: true,
				loadFfmpeg: internalLoadFfmpeg,
				fallbackVideoUrl: undefined,

				initialEnableAudio: true,
				initialQuality: 25,
				initialEnableFallbackVideo: true
			}
		});

		await hls.transcoder.init();
	} else {
		console.warn('hls is NOT supported. will attempt to set video.src directly.');
		return;
	}
};

export function setup(node) {
	if (hevcMode) return;

	hls.on(Hls.Events.MEDIA_ATTACHED, () => {
		console.log('hls is now connected with video');
	});
	hls.on(Hls.Events.ERROR, (_, err) => {
		if (err.details === 'bufferStalledError') {
			console.log(
				`%c(transhls) transcoder can't keep up with playback (${err.buffer.toFixed(2)}ms)`,
				'font-size: large'
			);
		}
	});

	node.onloadeddata = () => {
		node.currentTime = node.buffered.start(0);
		node.play();
	};

	hls.attachMedia(node);
}
