# Forecast-o-matic 9000

## Setup and Start

1. Edit `.env` (in /weather-service) to add a valid OpenWeatherMap API key.

2. In the root run `npm run setup` - this should run `npm install` in the root and then in two sub-projects.

3. In the root run `npm start` - this should start the `weather-service` and the `web-app`.

## Notes

-   Only a few tests have been added, specifically around the specifications for how to categorise different day types etc
-   There are common types in the the root of the app that ideally would exist as a separate package. I tried to mock that arrangement by putting them in the root and accessing them from both sub-projects but CRA prevents any imports from outside of `/src` so I had to copy them manually into the web-app project.


---

## Task Outline

### Requirement 1: Best day to visit the office

Story

As an employee of [company], I want to visit the office on the nicest day, so that I can chill on
the beach on my lunch break

Back end

For the given lat / long, parse the API data and find the warmest day over the next 7 days.
If multiple days have the same highest temperature, then go for the day that has the
warmest temperature and the lowest humidity.
- If multiple days have both the warmest temperature and lowest humidity, then
return the first of those days.
- If the warmest day is on a weekend day, choose the warmest working day. Don’t
worry about public holidays.

Non-Functional Requirements

This requirement asks for OpenWeather, however negotiations are taking place with other
mapping providers. As such, the code should limit its exposure to OpenWeather and its
associated terminology in such as way that it is easy to swap out OpenWeather for another
weather provider.

Front end

Make an app which shows the weather for today, rendering the result from the API. The
app should show the best day and its temperature. Remember - this is about function, not
form.

### Requirement 2: Worst day

Story

As an employee of [company], I want to know the worst day to come in, so that I can avoid it
Much like the previous task, allow the user to select “worst day” and subsequently provide
which weather they consider to be the worst out of temperature or rain. Then filter the API
results according to their choices

As before, exclude weekends.
- If two days share the same temperature, choose the day with the highest chance of
rain. If the same, return the first.

