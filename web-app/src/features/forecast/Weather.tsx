import { DayCategory } from '../../@weather/types'

export type Weather = {
    date: Date
    day: string
    dayTemp: number
    maxTemp: number
    description: string
    iconUrl: string
    dayCategories: DayCategory[]
}
