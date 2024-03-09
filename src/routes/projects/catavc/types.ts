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
};
