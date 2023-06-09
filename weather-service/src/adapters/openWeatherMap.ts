import axios from 'axios'
import { IForecastProvider, OpenWeatherMapResponse } from '../../../types'

const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall'
const OPEN_WEATHER_MAP_API_KEY = '44d972716a576f33e58ba3112e9a3cdd'

const apiClient = axios.create({
    baseURL: API_ENDPOINT,
    responseType: 'json',
})

export const openWeatherMapAdapter: IForecastProvider = {
    getForecast: async (
        lat: number,
        lon: number
    ): Promise<OpenWeatherMapResponse> => {
        const url = new URL(API_ENDPOINT)
        const searchParams = {
            lat: lat.toString(),
            lon: lon.toString(),
            exclude: 'current,minutely,hourly,alerts',
            appid: OPEN_WEATHER_MAP_API_KEY,
            units: 'metric',
        }
        url.search = new URLSearchParams(searchParams).toString()
        const response = await apiClient.get<OpenWeatherMapResponse>(url.href)
        const data = response.data
        return data
    },
}
