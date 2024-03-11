import { get, writable, type Writable } from 'svelte/store';

export type CatHouse = {
    catHouseId: string;
    name: string;
    englishName: string | null;
};

export type CatHouseInfo = {
    name: string;
    images: string[];
    todayFeedCount: number;
    todayShowCount: number;
    catPresent: boolean;
    deviceTemperatureCelsius: number;
    stock: { kibble: string | null; snack?: string | null };
};

export type CatavcSettings = {
    currentHouseId: string | undefined;
    enableAudio: boolean;
    videoQuality: number;
    cameraPosition: number;
};

export let cameraPosition: Writable<number> = writable(0);
export let currentHouseId: Writable<string | undefined> = writable(undefined);
export let enableAudio: Writable<boolean> = writable(true);
export let videoQuality: Writable<number> = writable(25);

export const updateURL = () => {
    if (get(currentHouseId) === undefined) return;
    window.history.replaceState(
        null,
        '',
        `/projects/catavc?id=${get(currentHouseId)}&cameraPosition=${get(cameraPosition)}&audioEnabled=${get(enableAudio)}`
    );
};
