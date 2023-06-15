import axios from 'axios'
import config from '../config'

import {
    Forecast,
    IForecastProvider,
    OpenWeatherMapResponse,
} from '../../../@weather/types'

const { OPEN_WEATHER_MAP_API_ENDPOINT, OPEN_WEATHER_MAP_API_KEY } = config

if (!OPEN_WEATHER_MAP_API_KEY || OPEN_WEATHER_MAP_API_KEY.length === 0)
    throw new Error('OPEN_WEATHER_MAP_API_KEY is not defined')

const apiClient = axios.create({
    responseType: 'json',
})

const extractDailyForecasts = ({
    daily,
    lat,
    lon,
}: OpenWeatherMapResponse): Forecast[] =>
    daily.map((dailyForecast) => {
        const { dt, temp, rain, weather, humidity } = dailyForecast
        const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

        return {
            lat,
            lon,
            date: new Date(dt * 1000),
            tempCelsius: { dayTemp: temp.day, maxTemp: temp.max },
            rainMM: rain,
            humidity,
            description: weather[0].description,
            iconUrl,
        }
    })

export const openWeatherMapAdapter: IForecastProvider = {
    getForecast: async ({ lat, lon }): Promise<Forecast[]> => {
        const url = new URL(OPEN_WEATHER_MAP_API_ENDPOINT)
        const searchParams = {
            lat: lat.toString(),
            lon: lon.toString(),
            exclude: 'current,minutely,hourly,alerts',
            appid: OPEN_WEATHER_MAP_API_KEY,
            units: 'metric',
        }
        url.search = new URLSearchParams(searchParams).toString()

        // todo: error handling
        const response = await apiClient.get<OpenWeatherMapResponse>(url.href)
        const data = response.data
        return extractDailyForecasts(data)
    },
}
