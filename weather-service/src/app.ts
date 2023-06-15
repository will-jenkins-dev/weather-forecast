import express, { Request, Response } from 'express'
import cors from 'cors'
import * as logger from './utils/logger'

import config from './config'
import { forecastService } from './services/forecastService'
import { Forecast, LatLon } from '../../@weather/types'

const app = express()
app.use(express.json())
app.use(cors())
app.get('/', (req: Request, res: Response) => {
    res.send(`Hello from ${config.SERVICE_NAME}! (v${config.SERVICE_VERSION})`)
})

type AsQueryParams<T> = { [P in keyof T]: string }

app.get(
    '/forecast',
    async (
        req: Request<unknown, unknown, unknown, AsQueryParams<LatLon>>,
        res: Response<Forecast[] | string>
    ) => {
        const lat = parseFloat(req.query.lat)
        const lon = parseFloat(req.query.lon)

        if (isNaN(lat) || isNaN(lon)) {
            return res.status(400).send('Invalid lat or lon')
        }

        try {
            const forecast = await forecastService.getSevenDayForecast({
                lat,
                lon,
            })

            res.json(forecast)
        } catch (e) {
            logger.logError(e)
            return res.send(`Erk, unable to get forecast for ${lat}, ${lon}`)
        }
    }
)

export default app
