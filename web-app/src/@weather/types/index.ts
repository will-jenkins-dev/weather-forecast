export type DailyForecast = {
    dt: number
    sunrise: number
    sunset: number
    moonrise: number
    moonset: number
    moon_phase: number
    temp: {
        day: number
        min: number
        max: number
        night: number
        eve: number
        morn: number
    }
    feels_like: {
        day: number
        night: number
        eve: number
        morn: number
    }
    pressure: number
    humidity: number
    dew_point: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: [
        {
            id: number
            main: string
            description: string
            icon: string
        }
    ]
    clouds: number
    pop: number
    uvi: number
    rain: number
}

export type OpenWeatherMapResponse = {
    lat: number
    lon: number
    timezone: string
    timezone_offset: number
    daily: DailyForecast[]
}

export type LatLon = {
    lat: number
    lon: number
}

export enum DayCategory {
    Nicest = 'nicest',
    WorstTemp = 'worstTemp',
    WorstRain = 'worstRain',
}

export type Forecast = LatLon & {
    date: Date
    tempCelsius: { dayTemp: number; maxTemp: number }
    rainMM: number
    humidity: number
    description: string
    iconUrl: string
}

export type CategorisedForecast = Forecast & {
    dayCategories: DayCategory[]
}

export interface IForecastProvider {
    getForecast: (latLon: LatLon) => Promise<Forecast[]>
}
