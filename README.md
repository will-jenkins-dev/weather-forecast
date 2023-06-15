# Forecast-o-matic 9000

## Setup and Start

1. Edit `.env` (in /weather-service) to add a valid OpenWeatherMap API key.

2. In the root run `npm run setup` - this should run `npm install` in the root and then in two sub-projects.

3. In the root run `npm start` - this should start the `weather-service` and the `web-app`.

## Notes

-   Only a few tests have been added, specifically around the specifications for how to categorise different day types etc
-   There are common types in the the root of the app that ideally would exist as a separate package. I tried to mock that arrangement by putting them in the root and accessing them from both sub-projects but CRA prevents any imports from outside of `/src` so I had to copy them manually into the web-app project.
