import { Card, CardContent, Typography, Box } from '@mui/material'
import { Weather } from './Weather'

export const WeatherCard = ({ weather }: { weather: Weather }) => {
    const { iconUrl, description, dayTemp, maxTemp } = weather
    return (
        <Card sx={{ backgroundImage: iconUrl, minWidth: 100 }}>
            <CardContent>
                <Box display="flex" alignItems="center" flexDirection="column">
                    <Typography variant="h2" gutterBottom>
                        {weather.day}
                    </Typography>
                    <Box component="img" src={iconUrl} />
                    <Typography variant="h3">{description}</Typography>
                    <Typography>Day temp: {dayTemp}&deg;</Typography>
                    <Typography>Max temp: {maxTemp}&deg;C</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}
