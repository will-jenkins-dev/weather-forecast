import app from './src/app'
import config from './src/config'
import * as logger from './src/utils/logger'

const { PORT, HOST, SERVICE_NAME, SERVICE_VERSION } = config

app.listen(Number(PORT), HOST)
logger.log(
    `${SERVICE_NAME} (${SERVICE_VERSION}) is running on http://${HOST}:${PORT}`
)
