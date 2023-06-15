import { Box, Typography } from '@mui/material'
import { WeatherCard } from './WeatherCard'
import { Weather } from './Weather'
import { DayCategory } from '../../@weather/types'

const camelToTitle = (camelCase: string) =>
    camelCase
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase())
        .trim()

const COLORS = { NICE: 'yellow', WORST: 'red' }

const categoryColor = ({
    dayCategory,
    weather,
}: {
    dayCategory: DayCategory
    weather: Weather
}) => {
    const matches = weather?.dayCategories.includes(dayCategory)
    if (!matches) return 'transparent'
    return dayCategory === DayCategory.Nicest ? COLORS.NICE : COLORS.WORST
}

export const CategorisedWeatherCard = ({
    weather,
    dayCategory,
}: {
    weather: Weather
    dayCategory: DayCategory
}) => {
    return (
        <Box>
            <Typography
                variant="h3"
                color={categoryColor({ dayCategory, weather })}
            >
                {camelToTitle(dayCategory) || ''}
            </Typography>
            <Box
                sx={{
                    borderWidth: 10,
                    borderRadius: 4,
                    borderStyle: 'solid',
                    borderColor: categoryColor({ dayCategory, weather }),
                }}
            >
                <WeatherCard weather={weather} />
            </Box>
        </Box>
    )
}
