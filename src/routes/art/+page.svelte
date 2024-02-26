<script lang="ts">
	import { MAIN_ANIMATION_DURATION, customRedirect, show } from '$lib';
	import { onMount } from 'svelte';
	import { quadInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	import ThemeSwitcher from '../../ui/ThemeSwitcher.svelte';
	import ExpandableCategory from '../../ui/ExpandableCategory.svelte';
	import UnderlinedLink from '../../ui/UnderlinedLink.svelte';
	import HomeButton from '../../ui/HomeButton.svelte';
	import WavyLine from '../../ui/WavyLine.svelte';

	import * as Drawer from '$lib/components/ui/drawer';
	import { Masonry } from '@fristys/masonry';

	export const enableMasonry: import('svelte/action').Action<HTMLElement> = (node: HTMLElement) => {
		const masonry = createMasonry(node);

		return {
			destroy() {
				masonry.dispose();
			}
		};
	};

	export const createMasonry = (node: HTMLElement) => {
		return new Masonry(node, {
			gutter: 0.5,
			gutterUnit: 'rem',
			columnBreakpoints: { 768: 2, 1024: 3, 1536: 4 },
			initOnImageLoad: true,
			useContainerWidth: true,
			trackItemSizeChanges: true
		});
	};

	onMount(() => {
		show.set(true);
	});
</script>

{#if $show}
	<div class="flex h-[100vh] flex-col md:flex-row">
		<div class="pr-5"><WavyLine /></div>
		<div class="mt-10 flex min-h-max w-full flex-col items-stretch p-5 md:ml-10 md:mt-5">
			<div
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut }}
				class="flex flex-row align-baseline"
			>
				<HomeButton font="bitter" />
				<ThemeSwitcher />
			</div>
			<p
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut, delay: 250 }}
				class="mt-5 text-2xl font-light text-dark dark:text-light md:text-4xl"
			>
				i started drawing at a relatively late age, so my skills are very basic and i don't do any
				professional creative work.<br />
				nevertheless, you can find some examples of my work below:
			</p>
			<div
				class="mt-5 flex flex-col flex-wrap items-start gap-2 xl:flex-row"
				transition:fly={{ y: 15, duration: MAIN_ANIMATION_DURATION, easing: quadInOut, delay: 500 }}
			>
				<ExpandableCategory name="digital art" autoOpenDelay={550}>
					<h1 class="text-2xl text-dark dark:text-light">
						most of the work i do is done digitally. i use <UnderlinedLink
							text="Clip Studio Paint"
							link="https://www.clipstudio.net/en/"
						/> on PC and <UnderlinedLink
							text="ibisPaint X"
							link="https://ibispaint.com/?lang=en-US"
						/> on mobile.
					</h1>
					<Drawer.Root>
						<Drawer.Trigger
							class="mt-1 flex cursor-pointer items-center justify-center rounded-full border-2 border-dark transition-all duration-[500] ease-in-out-quad hover:bg-dark dark:border-light dark:hover:bg-light"
						>
							<h2
								class="px-5 py-3 text-2xl text-dark hover:text-light dark:text-light dark:hover:text-dark"
							>
								view work
							</h2>
						</Drawer.Trigger>
						<Drawer.Content class="h-[95%] border-dark" id="digital-art-container">
							<Drawer.Header class="mx-3 flex flex-row items-center justify-end">
								<Drawer.Close
									><button
										class="group ml-3 flex h-min items-center justify-center self-center rounded-full border-2 border-dark bg-light p-2 transition-all duration-[500] ease-in-out-quad hover:bg-dark dark:border-light dark:bg-dark hover:dark:bg-light"
									>
										<img
											src="/icons/close.svg"
											width="36"
											class="transition-all duration-[500] ease-in-out-quad group-hover:invert dark:invert group-hover:dark:invert-0"
											alt="close icon"
										/>
									</button>
								</Drawer.Close>
							</Drawer.Header>
							<div class="mx-6 my-3 overflow-y-scroll" use:enableMasonry>
								<img src="art-digital/please.jpg" alt="" />
								<img src="art-digital/AGRETSUKAAAAAAAAA.png" alt="" />
								<img src="art-digital/back.png" alt="" />
								<img src="art-digital/cat.png" alt="" />
								<img src="art-digital/griff.jpg" alt="" />
								<img src="art-digital/catny2023.png" alt="" />
								<img src="art-digital/crunchmas.png" alt="" />
								<img src="art-digital/doggo2.png" alt="" />
								<img src="art-digital/dogpfp.png" alt="" />
								<img src="art-digital/haida.png" alt="" />
								<img src="art-digital/identity.png" alt="" />
								<img src="art-digital/sona.jpg" alt="" />
								<img src="art-digital/TAXI.png" alt="" />
								<img src="art-digital/testline.png" alt="" />
								<img src="art-digital/unnick_c.png" alt="" />
								<img src="art-digital/MEEEEEEEEEEHEHE2.png" alt="" />
								<img src="art-digital/looking.jpg" alt="" />
								<img src="art-digital/wild.jpg" alt="" />
							</div>
						</Drawer.Content>
					</Drawer.Root>
				</ExpandableCategory>
				<ExpandableCategory name="traditional art" autoOpenDelay={600}>
					<h1 class="text-2xl text-dark dark:text-light">
						i don't do much of traditional art since i generally prefer to draw on an electronic
						device. still, such devices are sometimes inaccessible. i mainly draw with a mechanical
						pencil and that's it.
					</h1>
					<Drawer.Root>
						<Drawer.Trigger
							class="mt-1 flex cursor-pointer items-center justify-center rounded-full border-2 border-dark transition-all duration-[500] ease-in-out-quad hover:bg-dark dark:border-light dark:hover:bg-light"
						>
							<h2
								class="px-5 py-3 text-2xl text-dark hover:text-light dark:text-light dark:hover:text-dark"
							>
								view work
							</h2>
						</Drawer.Trigger>
						<Drawer.Content class="h-[95%] border-dark" id="digital-art-container">
							<Drawer.Header class="mx-3 flex flex-row items-center justify-end">
								<Drawer.Close
									><button
										class="group ml-3 flex h-min items-center justify-center self-center rounded-full border-2 border-dark bg-light p-2 transition-all duration-[500] ease-in-out-quad hover:bg-dark dark:border-light dark:bg-dark hover:dark:bg-light"
									>
										<img
											src="/icons/close.svg"
											width="36"
											class="transition-all duration-[500] ease-in-out-quad group-hover:invert dark:invert group-hover:dark:invert-0"
											alt="close icon"
										/>
									</button>
								</Drawer.Close>
							</Drawer.Header>
							<div class="mx-6 my-3 overflow-y-scroll" use:enableMasonry>
								<img src="art-traditional/1.jpg" alt="" />
								<img src="art-traditional/2.jpg" alt="" />
								<img src="art-traditional/3.jpg" alt="" />
								<img src="art-traditional/4.jpg" alt="" />
								<img src="art-traditional/5.jpg" alt="" />
							</div>
						</Drawer.Content>
					</Drawer.Root>
				</ExpandableCategory>
				<ExpandableCategory name="visual novels" autoOpenDelay={650}>
					<h1 class="text-2xl text-dark dark:text-light">
						this is a genre i've discovered recently and i enjoyed it quite a bunch. i've read about
						4 VNs and wrote 1, which isn't public and is mostly a local joke.
					</h1>
				</ExpandableCategory>
			</div>
		</div>
	</div>
{/if}
