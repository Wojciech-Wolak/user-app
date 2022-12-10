export type WeatherResponseType = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number
    hourly_units: {
        time: string;
        temperature_2m: string;
        rain: string;
        snowfall: string;
        snow_depth: string;
        weathercode: string;
        visibility: string;
        windspeed_10m: string;
        winddirection_10m: string;
    },
    hourly: {
        time: string[];
        temperature_2m: number[];
        rain: number[];
        snowfall: number[];
        snow_depth: number[];
        weathercode: number[];
        visibility: number[];
        windspeed_10m: number[];
        winddirection_10m: number[];
    }
}