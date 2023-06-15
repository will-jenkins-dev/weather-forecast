import { createTheme, ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './useForecast'
import { ForecastOverview } from './features/forecast/ForecastOverview'

const theme = createTheme({
    palette: {
        primary: { main: '#191e31', contrastText: '#fff' },
        secondary: { main: '#fff', contrastText: '#191e31' },
    },
    typography: {
        fontFamily: 'Helvetica, Arial, sans-serif',
        h1: { fontSize: 30 },
        h2: { fontSize: 20 },
        h3: { fontSize: 18, fontWeight: 600 },
    },
    components: {
        MuiFormLabel: { styleOverrides: { root: { color: '#fff' } } },
    },
})

const LAT_LON = { lat: 50.8244439, lon: -0.1416104 }

function App() {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <ForecastOverview lat={LAT_LON.lat} lon={LAT_LON.lon} />
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App
