import { CategorisedForecast, LatLon } from '../../../@weather/types'
import { openWeatherMapAdapter } from '../adapters/openWeatherMap'
import { addCategoriesToForecasts } from './forecastCategorisation'

export const forecastService = {
    getSevenDayForecast: async ({
        lat,
        lon,
    }: LatLon): Promise<CategorisedForecast[]> => {
        const dailyForecasts = await openWeatherMapAdapter.getForecast({
            lat,
            lon,
        })
        return addCategoriesToForecasts(dailyForecasts)
    },
}
