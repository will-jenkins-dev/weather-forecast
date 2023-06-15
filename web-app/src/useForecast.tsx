import format from 'date-fns/format'
import { QueryClient, useQuery } from '@tanstack/react-query'
import { CategorisedForecast } from '../../@weather/types'
import { LatLon } from './@weather/types'

export const queryClient = new QueryClient()

const TEN_MINUTES_IN_MILLISECONDS = 1000 * 60 * 10

export const useForecast = ({ lat, lon }: LatLon) => {
    const { data } = useQuery(
        ['forecast', lat, lon],
        async () => {
            const url = new URL(`http://localhost:8081/forecast`)
            url.search = new URLSearchParams({
                lat: String(lat),
                lon: String(lon),
            }).toString()

            const forecast = await fetch(url)
            const data = await forecast.json()

            return data as CategorisedForecast[]
        },
        {
            staleTime: TEN_MINUTES_IN_MILLISECONDS,
        }
    )
    if (Array.isArray(data) && data.length > 0) {
        const weather = data.map(
            ({
                date,
                tempCelsius: { dayTemp, maxTemp },
                rainMM,
                description,
                iconUrl,
                dayCategories,
            }) => ({
                date,
                day: format(new Date(date), 'EEEE'),
                dayTemp,
                maxTemp,
                rainMM,
                description,
                iconUrl,
                dayCategories,
            })
        )
        const [today, tomorrow, ...rest] = weather
        return {
            today: today,
            tomorrow: tomorrow,
            sevenDays: [tomorrow, ...rest],
        }
    }
    return {}
}
