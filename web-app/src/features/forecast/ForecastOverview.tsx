import { useState } from 'react'
import { Typography, Box, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { DayCategorySelector } from './DayCategorySelector'
import { useForecast } from '../../useForecast'
import { CategorisedWeatherCard } from './CategorisedWeatherCard'

import { DayCategory, LatLon } from '../../@weather/types'

export const ForecastOverview = ({ lat, lon }: LatLon) => {
    const { today, tomorrow, sevenDays } = useForecast({
        lat,
        lon,
    })

    const {
        palette: { primary },
    } = useTheme()

    const [dayCategory, setDayCategory] = useState<DayCategory>(
        DayCategory.Nicest
    )

    return (
        <Box padding={10} bgcolor={primary.main} color={primary.contrastText}>
            <Typography variant="h1" mb={5}>
                Daily/Weekly Forecast for Inshur Office, 1 Jubilee Street,
                Brighton
            </Typography>
            <DayCategorySelector onChangeDayCategory={setDayCategory} />

            <Grid container justifyContent="space-between" mt={3}>
                <Grid item xs={5}>
                    <Typography variant="h2" pb={2}>
                        Today
                    </Typography>
                    {today && (
                        <CategorisedWeatherCard
                            weather={today}
                            dayCategory={dayCategory}
                        />
                    )}
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h2" pb={2}>
                        Tomorrow
                    </Typography>
                    {tomorrow && (
                        <CategorisedWeatherCard
                            weather={tomorrow}
                            dayCategory={dayCategory}
                        />
                    )}
                </Grid>
                <Grid item xs={12} py={2}>
                    <Typography variant="h2">7 days</Typography>
                </Grid>
                <Grid
                    container
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    {sevenDays?.map((weather) => (
                        <CategorisedWeatherCard
                            key={weather.date.toString()}
                            weather={weather}
                            dayCategory={dayCategory}
                        />
                    ))}
                </Grid>
            </Grid>
        </Box>
    )
}
