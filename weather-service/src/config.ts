import * as packageJson from '../package.json'

const config: Record<string, string> = {
    SERVICE_NAME: 'Weather Service',
    SERVICE_VERSION: packageJson.version,
    SERVICE_ID: packageJson.name,
    PORT: process.env.SERVICE_PORT ?? '8081',
    HOST: process.env.SERVICE_HOST ?? 'localhost',
    ENV: process.env.ENVIRONMENT_NAME || 'local',
    OPEN_WEATHER_MAP_API_ENDPOINT:
        'https://api.openweathermap.org/data/2.5/onecall' as const,
    OPEN_WEATHER_MAP_API_KEY:
        process.env.OPEN_WEATHER_MAP_API_KEY ?? ('' as const),
}

export default config
