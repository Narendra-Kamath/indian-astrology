# indian-astrology

[![License][lic-image]][npm-link] [![Build status][travis-image]][travis-link] [![Coverage Status][coverage-image]][coverage-link] [![downloads][dt-image]][npm-link]

> Get the Indian astrological details from the provided birth details as a JSON object. You will also get a prediction based on the calculated details.

## Installation

    $ npm install indian-astrology

## Usage
```js
const IndianAstrology = require('indian-astrology');

console.log(IndianAstrology.getByDate(24, 5, 2018, 18, 1, 5, 30, false));
console.log(IndianAstrology.getByDateAndZone(24, 5, 2018, 18, 1, 5.5, false));
console.log(IndianAstrology.getByDateOfIndia(24, 5, 2018, 18, 1));
console.log(IndianAstrology.getByDateWhereTimeUnknown(24, 5, 2018, 5, 30, false));
console.log(IndianAstrology.getByDateWhereTimeUnknownOfIndia(24, 5, 2018));
console.log(IndianAstrology.getCountryListWithZones());
console.log(IndianAstrology.getOnlyCountryNameList());
console.log(IndianAstrology.getTodaysDetails(false));
```

### Sample JSON Response
Note: The zodiac sign here is the Indian rashi equivalent sign. The prediction is based on the rashi alone as of now.
```json
{
  "rashi": "Kanya",
  "zodiacSign": "Virgo",
  "moonAngle": "22°49'37\"",
  "nakshatra": "Hasta",
  "birthDasha": "Mon/Sun/Rah",
  "birthDate": "25-5-2018",
  "birthTime": "19:5",
  "dayOfWeek": "Friday",
  "birthTimeZone": 5.5,
  "currentDasha": "Mon/Sun/Rah",
  "prediction": "This is a sample prediction based on zodiac sign."
}
```

## API

### getByDate(day, month, year, hour, minute, timeZoneHour, timeZoneMinute, dayLightSaving)
Gives JSON object having the astrological details of given data.
- `day` {number} - The birth day.
- `month` {number} - The birth month.
- `year` {number} - The birth year.
- `hour` {number} - The birth hour in 24 hour format.
- `minute` {number} - The birth minute.
- `timeZoneHour` {number} - The birth timezone hour.
- `timeZoneMinute` {number} - The birth timezone minute.
- `dayLightSaving` {boolean} - The true or false value of daylight saving.
```js
const IndianAstrology = require('indian-astrology');

console.log(IndianAstrology.getByDate(24, 5, 2018, 18, 1, 5, 30, false));
```
### getByDateAndZone(day, month, year, hour, minute, timeZone, dayLightSaving)
Gives JSON object having the astrological details of given data.
- `day` {number} - The birth day.
- `month` {number} - The birth month.
- `year` {number} - The birth year.
- `hour` {number} - The birth hour in 24 hour format.
- `minute` {number} - The birth minute.
- `timeZone` {number} - The birth timezone.
- `dayLightSaving` {boolean} - The true or false value of daylight saving.
```js
const IndianAstrology = require('indian-astrology');

console.log(IndianAstrology.getByDateAndZone(24, 5, 2018, 18, 1, 5.5, false));
```
### getByDateOfIndia(day, month, year, hour, minute)
Gives JSON object having the astrological details of given data.
- `day` {number} - The birth day.
- `month` {number} - The birth month.
- `year` {number} - The birth year.
- `hour` {number} - The birth hour in 24 hour format.
- `minute` {number} - The birth minute.
```js
const IndianAstrology = require('indian-astrology');

console.log(IndianAstrology.getByDateOfIndia(24, 5, 2018, 18, 1));
```
### getByDateWhereTimeUnknown(day, month, year, timeZoneHour, timeZoneMinute, dayLightSaving)
Gives JSON object having the astrological details of given data.
- `day` {number} - The birth day.
- `month` {number} - The birth month.
- `year` {number} - The birth year.
- `timeZoneHour` {number} - The birth timezone hour.
- `timeZoneMinute` {number} - The birth timezone minute.
- `dayLightSaving` {boolean} - The true or false value of daylight saving.
```js
const IndianAstrology = require('indian-astrology');

console.log(IndianAstrology.getByDateWhereTimeUnknown(24, 5, 2018, 5, 30, false));
```
### getByDateWhereTimeUnknownOfIndia(day, month, year)
Gives JSON object having the astrological details of given data.
- `day` {number} - The birth day.
- `month` {number} - The birth month.
- `year` {number} - The birth year.
```js
const IndianAstrology = require('indian-astrology');

console.log(IndianAstrology.getByDateWhereTimeUnknownOfIndia(24, 5, 2018));
```
### getCountryListWithZones()
Gives JSON object having the country list along with mapped timezones.
```js
const IndianAstrology = require('indian-astrology');

console.log(IndianAstrology.getCountryListWithZones());
```
### getOnlyCountryNameList()
Gives JSON array having the country names.
```js
const IndianAstrology = require('indian-astrology');

console.log(IndianAstrology.getOnlyCountryNameList());
```
### getTodaysDetails(dayLightSaving)
Gives JSON object having the astrological details of present day.
- `dayLightSaving` {boolean} - The true or false value of daylight saving.
```js
const IndianAstrology = require('indian-astrology');

console.log(IndianAstrology.getTodaysDetails(false));
```

## Lint, Test and Build

    npm run validate

## Build

    npm run build

## Test

    npm test

## With :heart: by
- Narendra Kamath G
- E-mail: [narendrakamathg@gmail.com](mailto:narendrakamathg@gmail.com)
- LinkedIn: [Narendra Kamath G](https://in.linkedin.com/in/narendra-kamath-g-50158230)

## License
MIT license. Copyright © 2018.

[lic-image]: https://img.shields.io/npm/l/indian-astrology.svg
[npm-link]: https://npmjs.org/package/indian-astrology
[travis-image]: https://img.shields.io/travis/Narendra-Kamath/indian-astrology.svg
[travis-link]: https://travis-ci.org/Narendra-Kamath/indian-astrology
[dt-image]: https://img.shields.io/npm/dt/indian-astrology.svg
[coverage-image]: https://img.shields.io/codecov/c/github/Narendra-Kamath/indian-astrology.svg
[coverage-link]: https://codecov.io/gh/Narendra-Kamath/indian-astrology