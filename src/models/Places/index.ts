export interface IPlace {
    name: string;
    description: string;
    numberOfTurf: number | null;
    milliseconds: number | null;
    dateISO: string;
    startTime: string;
    startTimeDate: string;
    endTimeDate: string;
    endTime: string;
    amenities: string;
    location: string;
    lat: number | null;
    long: number | null;
    geoHash: string;
    images: Array<string>;
    phone: string;
    upiID: string;
    placeId: string;
    morningPrice: number | null;
    eveningPrice: number | null;
    nightPrice: number | null;
    midNightPrice: number | null;
    weekendMorningPrice: number | null;
    weekendEveningPrice: number | null;
    weekendNightPrice: number | null;
    weekendMidNightPrice: number | null;
    boxDimension: string;
}