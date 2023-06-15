import addDays from 'date-fns/addDays'
import { DayCategory, Forecast } from '../../@weather/types'
import { addCategoriesToForecasts } from '../src/services/forecastCategorisation'

const sunday = new Date('2023-06-11')

const dates: Record<string, Date> = Object.fromEntries(
    [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ].map((day, index) => [day, addDays(sunday, index)])
)

const makeForecast = ({
    date = dates.sunday,
    maxTemp = 0,
    description = '',
    humidity = 0,
    rainMM = 0,
}): Forecast => ({
    date,
    tempCelsius: { dayTemp: 0, maxTemp },
    rainMM,
    humidity,
    description,
    iconUrl: '',
    lat: 0,
    lon: 0,
})

console.log(dates)

describe('Forecast Categorisation, Nicest Day', () => {
    describe('if there is one warmest day', () => {
        const forecasts: Forecast[] = [
            makeForecast({ date: dates.sunday }),
            makeForecast({ date: dates.monday, maxTemp: 10 }),
            makeForecast({ date: dates.tuesday, maxTemp: 5 }),
        ]
        it('finds the warmest day', () => {
            const categorisedForecasts = addCategoriesToForecasts(forecasts)
            const nicestDay = categorisedForecasts.find((forecast) =>
                Array.from(forecast.dayCategories).includes(DayCategory.Nicest)
            )
            expect(nicestDay?.date).toEqual(dates.monday)
        })
    })

    describe('if there are multiple warmest days', () => {
        const forecasts: Forecast[] = [
            makeForecast({ date: dates.sunday }),
            makeForecast({ date: dates.monday, maxTemp: 10, humidity: 40 }),
            makeForecast({ date: dates.tuesday, maxTemp: 10, humidity: 20 }),
            makeForecast({ date: dates.wednesday, maxTemp: 10, humidity: 21 }),
        ]
        it('finds the day with lowest humidity', () => {
            const categorisedForecasts = addCategoriesToForecasts(forecasts)
            const nicestDay = categorisedForecasts.find((forecast) =>
                Array.from(forecast.dayCategories).includes(DayCategory.Nicest)
            )
            expect(nicestDay?.date).toEqual(dates.tuesday)
        })
    })

    describe('if there are multiple days with matching temperature and humity', () => {
        const forecasts: Forecast[] = [
            makeForecast({ date: dates.sunday }),
            makeForecast({ date: dates.monday, maxTemp: 10, humidity: 40 }),
            makeForecast({ date: dates.tuesday, maxTemp: 10, humidity: 20 }),
            makeForecast({ date: dates.wednesday, maxTemp: 10, humidity: 20 }),
        ]
        it('selects the first of the matching days', () => {
            const categorisedForecasts = addCategoriesToForecasts(forecasts)
            const nicestDay = categorisedForecasts.find((forecast) =>
                Array.from(forecast.dayCategories).includes(DayCategory.Nicest)
            )
            expect(nicestDay?.date).toEqual(dates.tuesday)
        })
    })

    describe('if the warmest day is on a weekend', () => {
        const forecasts: Forecast[] = [
            makeForecast({ date: dates.sunday, maxTemp: 25 }),
            makeForecast({ date: dates.saturday, maxTemp: 30 }),
            makeForecast({ date: dates.monday, maxTemp: 10 }),
            makeForecast({ date: dates.tuesday, maxTemp: 20 }),
            makeForecast({ date: dates.wednesday, maxTemp: 10 }),
        ]
        it('selects the warmest weekday', () => {
            const categorisedForecasts = addCategoriesToForecasts(forecasts)
            const nicestDay = categorisedForecasts.find((forecast) =>
                Array.from(forecast.dayCategories).includes(DayCategory.Nicest)
            )
            expect(nicestDay?.date).toEqual(dates.tuesday)
        })
    })
})

describe('Forecast Categorisation, Worst Day (Temperature)', () => {
    describe('if there is one coldest day', () => {
        const forecasts: Forecast[] = [
            makeForecast({ date: dates.sunday }),
            makeForecast({ date: dates.monday, maxTemp: 10 }),
            makeForecast({ date: dates.tuesday, maxTemp: 5 }),
        ]
        it('finds the coldest day', () => {
            const categorisedForecasts = addCategoriesToForecasts(forecasts)
            const worstDayTemp = categorisedForecasts.find((forecast) =>
                Array.from(forecast.dayCategories).includes(
                    DayCategory.WorstTemp
                )
            )
            expect(worstDayTemp?.date).toEqual(dates.tuesday)
        })
    })

    describe('if there are multiple coldest days', () => {
        const forecasts: Forecast[] = [
            makeForecast({ date: dates.sunday }),
            makeForecast({ date: dates.monday, maxTemp: 5, rainMM: 5 }),
            makeForecast({ date: dates.tuesday, maxTemp: 5, rainMM: 10 }),
            makeForecast({ date: dates.wednesday, maxTemp: 5 }),
        ]
        it('finds the day with highest chance of rain', () => {
            const categorisedForecasts = addCategoriesToForecasts(forecasts)
            const worstDayTemp = categorisedForecasts.find((forecast) =>
                Array.from(forecast.dayCategories).includes(
                    DayCategory.WorstTemp
                )
            )
            expect(worstDayTemp?.date).toEqual(dates.tuesday)
        })
    })

    describe('if there are multiple days with matching temperature and rain', () => {
        const forecasts: Forecast[] = [
            makeForecast({ date: dates.sunday }),
            makeForecast({ date: dates.monday, maxTemp: 5, rainMM: 10 }),
            makeForecast({ date: dates.tuesday, maxTemp: 5, rainMM: 10 }),
            makeForecast({ date: dates.wednesday, maxTemp: 5 }),
        ]
        it('selects the first of the matching days', () => {
            const categorisedForecasts = addCategoriesToForecasts(forecasts)
            const worstTempDay = categorisedForecasts.find((forecast) =>
                Array.from(forecast.dayCategories).includes(
                    DayCategory.WorstTemp
                )
            )
            expect(worstTempDay?.date).toEqual(dates.monday)
        })
    })
    describe('if the coldest day is on a weekend', () => {
        const forecasts: Forecast[] = [
            makeForecast({ date: dates.sunday, maxTemp: 10 }),
            makeForecast({ date: dates.saturday, maxTemp: 0 }),
            makeForecast({ date: dates.monday, maxTemp: 5 }),
            makeForecast({ date: dates.tuesday, maxTemp: 6 }),
            makeForecast({ date: dates.wednesday, maxTemp: 7 }),
        ]
        it('selects the coldest weekday', () => {
            const categorisedForecasts = addCategoriesToForecasts(forecasts)
            const worstTempDay = categorisedForecasts.find((forecast) =>
                Array.from(forecast.dayCategories).includes(
                    DayCategory.WorstTemp
                )
            )
            expect(worstTempDay?.date).toEqual(dates.monday)
        })
    })
})

describe('Forecast Categorisation, Worst Day (Rain)', () => {
    describe('if there is one wettest day', () => {
        const forecasts: Forecast[] = [
            makeForecast({ date: dates.sunday }),
            makeForecast({ date: dates.monday, rainMM: 10 }),
            makeForecast({ date: dates.tuesday, rainMM: 20 }),
        ]
        it('finds the wettest day', () => {
            const categorisedForecasts = addCategoriesToForecasts(forecasts)
            const worstDayRain = categorisedForecasts.find((forecast) =>
                Array.from(forecast.dayCategories).includes(
                    DayCategory.WorstRain
                )
            )
            expect(worstDayRain?.date).toEqual(dates.tuesday)
        })
    })

    describe('if there are multiple wettest days', () => {
        const forecasts: Forecast[] = [
            makeForecast({ date: dates.sunday }),
            makeForecast({ date: dates.monday, maxTemp: 5, rainMM: 10 }),
            makeForecast({ date: dates.tuesday, maxTemp: 4, rainMM: 10 }),
            makeForecast({ date: dates.wednesday, maxTemp: 5 }),
        ]
        it('finds the day with lowest temperature', () => {
            const categorisedForecasts = addCategoriesToForecasts(forecasts)
            const worstDayRain = categorisedForecasts.find((forecast) =>
                Array.from(forecast.dayCategories).includes(
                    DayCategory.WorstRain
                )
            )
            expect(worstDayRain?.date).toEqual(dates.tuesday)
        })
    })

    describe('if there are multiple days with matching temperature and rain', () => {
        const forecasts: Forecast[] = [
            makeForecast({ date: dates.sunday }),
            makeForecast({ date: dates.monday, maxTemp: 5, rainMM: 10 }),
            makeForecast({ date: dates.tuesday, maxTemp: 5, rainMM: 10 }),
            makeForecast({ date: dates.wednesday, maxTemp: 5 }),
        ]
        it('selects the first of the matching days', () => {
            const categorisedForecasts = addCategoriesToForecasts(forecasts)
            const worstDayRain = categorisedForecasts.find((forecast) =>
                Array.from(forecast.dayCategories).includes(
                    DayCategory.WorstRain
                )
            )
            expect(worstDayRain?.date).toEqual(dates.monday)
        })
    })

    describe('if the wettest day is on a weekend', () => {
        const forecasts: Forecast[] = [
            makeForecast({ date: dates.sunday, rainMM: 20 }),
            makeForecast({ date: dates.saturday, rainMM: 10 }),
            makeForecast({ date: dates.monday, rainMM: 0 }),
            makeForecast({ date: dates.tuesday, rainMM: 5 }),
            makeForecast({ date: dates.wednesday, rainMM: 15 }),
        ]
        it('selects the wettest weekday', () => {
            const categorisedForecasts = addCategoriesToForecasts(forecasts)
            const worstDayRain = categorisedForecasts.find((forecast) =>
                Array.from(forecast.dayCategories).includes(
                    DayCategory.WorstRain
                )
            )
            expect(worstDayRain?.date).toEqual(dates.wednesday)
        })
    })
})
