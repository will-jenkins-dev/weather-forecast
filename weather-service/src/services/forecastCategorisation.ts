import { isWeekend } from 'date-fns'
import {
    CategorisedForecast,
    Forecast,
    DayCategory,
} from '../../../@weather/types'

const findNicerDay = (firstDay: Forecast, secondDay: Forecast): Forecast => {
    const {
        tempCelsius: { maxTemp: maxTempFirst },
        humidity: humidityFirst,
    } = firstDay

    const {
        tempCelsius: { maxTemp: maxTempSecond },
        humidity: humiditySecond,
    } = secondDay

    if (maxTempFirst > maxTempSecond) {
        return firstDay
    } else if (maxTempFirst < maxTempSecond) {
        return secondDay
    } else {
        return humidityFirst <= humiditySecond ? firstDay : secondDay
    }
}
const findWorstTempDay = (
    firstDay: Forecast,
    secondDay: Forecast
): Forecast => {
    const {
        tempCelsius: { maxTemp: maxTempFirst },
        rainMM: rainMMFirst,
    } = firstDay

    const {
        tempCelsius: { maxTemp: maxTempSecond },
        rainMM: rainMMSecond,
    } = secondDay

    if (maxTempFirst > maxTempSecond) {
        return secondDay
    } else if (maxTempFirst < maxTempSecond) {
        return firstDay
    } else {
        return rainMMFirst >= rainMMSecond ? firstDay : secondDay
    }
}
const findWorstRainDay = (firstDay: Forecast, secondDay: Forecast) => {
    const {
        rainMM: rainMMFirst,
        tempCelsius: { maxTemp: maxTempFirst },
    } = firstDay
    const {
        rainMM: rainMMSecond,
        tempCelsius: { maxTemp: maxTempSecond },
    } = secondDay

    if (rainMMFirst > rainMMSecond) {
        return firstDay
    } else if (rainMMFirst < rainMMSecond) {
        return secondDay
    } else {
        return maxTempSecond >= maxTempFirst ? firstDay : secondDay
    }
}
const compareDays = (
    firstDay: Forecast,
    secondDay: Forecast,
    dayType: DayCategory
): Forecast => {
    switch (dayType) {
        case DayCategory.Nicest:
            return findNicerDay(firstDay, secondDay)
        case DayCategory.WorstTemp:
            return findWorstTempDay(firstDay, secondDay)
        case DayCategory.WorstRain:
            return findWorstRainDay(firstDay, secondDay)
    }
}
const findWeekdayForDayType = (
    forecast: Forecast[],
    dayType: DayCategory
): Forecast => {
    const weekDayForecasts = forecast.filter(({ date }) => !isWeekend(date))
    const foundDay = weekDayForecasts.reduce((prev, current) =>
        compareDays(prev, current, dayType)
    )
    return foundDay
}

export const addCategoriesToForecasts = (
    forecasts: Forecast[]
): CategorisedForecast[] => {
    const dateCategoryMap = Object.values(DayCategory).reduce<
        Map<Date, DayCategory[]>
    >((dateDaytypeMap, currentDaytype) => {
        const { date } = findWeekdayForDayType(forecasts, currentDaytype)
        const existingDayTypes = dateDaytypeMap.get(date) || []

        return dateDaytypeMap.set(date, [...existingDayTypes, currentDaytype])
    }, new Map<Date, DayCategory[]>())

    return forecasts.map((forecast) => {
        const dayCategories = dateCategoryMap.get(forecast.date) || []
        return { ...forecast, dayCategories }
    })
}
