<script lang="ts">
	import LoadingIndicator from '../../../../ui/LoadingIndicator.svelte';
	import { Input } from '$lib/components/ui/input';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { currentHouseId, type CatHouse } from '../types';
	import { onMount } from 'svelte';
	import { get, writable, type Writable } from 'svelte/store';

	let catHouses: CatHouse[];
	let favorites: Writable<CatHouse[]> = writable([]);

	let currentCategory: string = 'top';
	let currentSearch: string;

	const getCatHouses = async (category: string, search: string, currentFavorites: CatHouse[]) => {
		if (search !== undefined && search !== '') {
			if (category === 'favorite') {
				catHouses = currentFavorites.filter(
					(x) =>
						x.englishName?.toLowerCase().includes(search.toLowerCase()) ||
						x.name.toLowerCase().includes(search.toLowerCase())
				);
			} else {
				catHouses = (await (
					await fetch('https://api.meow.camera/catHouses/search', {
						body: JSON.stringify({ query: search }),
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json'
						},
						method: 'POST'
					})
				).json()) as CatHouse[];
			}
		} else {
			if (category === 'favorite') {
				catHouses = currentFavorites;
			} else {
				catHouses = (await (
					await fetch(`https://api.meow.camera/catHouses/${category}`)
				).json()) as CatHouse[];
			}
		}
	};

	const DONE_TYPING_DELAY: number = 500;
	let doneTypingTimeout: number;
	let pendingSearch: string;
	const onSearchKeyUp = () => {
		clearTimeout(doneTypingTimeout);
		if (pendingSearch !== undefined) {
			//@ts-ignore
			doneTypingTimeout = setTimeout(() => (currentSearch = pendingSearch), DONE_TYPING_DELAY);
		}
	};

	onMount(() => {
		if (localStorage.getItem('catavcFavorites') != null) {
			favorites.set(JSON.parse(localStorage.getItem('catavcFavorites')!));
		}

		favorites.subscribe((v) => localStorage.setItem('catavcFavorites', JSON.stringify(v)));
	});

	const toggleFavorite = (house: CatHouse) => {
		let currentFavorites = get(favorites);
		if (currentFavorites.some((x) => x.id === house.id)) {
			currentFavorites = currentFavorites.filter((x) => x.id !== house.id);
		} else currentFavorites.push(house);
		favorites.set([...currentFavorites]);
	};

	const onSelectedCategoryChanged = (v: string | undefined) =>
		(currentCategory = v === undefined ? 'top' : v);
</script>

<div class="ml-2 mt-2 flex-shrink overflow-auto rounded-3xl bg-black/15 p-4">
	<div class="flex flex-row justify-between">
		<h1 class="text-3xl font-light">cat houses</h1>
		<Input
			class="max-w-[50%] bg-black/15"
			placeholder="search houses..."
			bind:value={pendingSearch}
			on:keyup={() => onSearchKeyUp()}
		/>
	</div>
	<div class="my-2 w-full">
		<ToggleGroup.Root
			type="single"
			class="justify-start"
			value={currentCategory}
			onValueChange={onSelectedCategoryChanged}
		>
			<ToggleGroup.Item value="top" data-state={currentCategory === 'top' ? 'on' : 'off'}
				>top</ToggleGroup.Item
			>
			<ToggleGroup.Item value="random">random</ToggleGroup.Item>
			<ToggleGroup.Item value="favorite">favorite</ToggleGroup.Item>
		</ToggleGroup.Root>
	</div>
	{#await getCatHouses(currentCategory, currentSearch, $favorites)}
		<div class="flex h-12 w-full items-center justify-center"><LoadingIndicator /></div>
	{:then}
		<div class="flex flex-col gap-2 overflow-y-scroll">
			{#each catHouses as house}
				<button
					class="relative flex flex-col rounded-xl bg-black/20 p-2 text-left {$currentHouseId ==
					house.id
						? 'border-2 border-white'
						: ''}"
					on:click={() => currentHouseId.set(house.id)}
				>
					<button class="absolute right-3 top-3" on:click={() => toggleFavorite(house)}
						><img
							src={`/icons/star${$favorites.some((x) => x.id === house.id) ? '' : '_outline'}.svg`}
							alt="bookmark button"
						/></button
					>
					<h1 class="text-xl">
						{house.name}<br />{house.englishName !== null ? `(${house.englishName})` : ''}
					</h1>
					<p class="text-lg text-white/65">ID: {house.id}</p>
				</button>{/each}
		</div>
	{/await}
</div>
