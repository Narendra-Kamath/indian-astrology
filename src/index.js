'use strict';

const AstroCore = require('./astro-core');
const CountryList = require('./country-db');

let birthDay = 0;
let birthMonth = 0;
let birthYear = 0;
let birthHour = 0;
let birthMinute = 0;
let birthTimeZone = 0;
let birthTimeZoneHour = 0;
let birthTimeZoneMinute = 0;

class IndianAstrology {
    /**
     * Function is used to get this particular time's astrological details.
     * @param  {boolean} dayLight
     */
    static getTodaysDetails(dayLight) {
        let today = new Date();
        birthDay = today.getDate();
        birthMonth = today.getMonth() + 1;
        birthYear = today.getFullYear();
        birthHour = today.getHours();
        birthMinute = today.getMinutes();
        birthTimeZone = today.getTimezoneOffset();
        birthTimeZone /= 60;
        birthTimeZone = Math.abs(birthTimeZone);
        birthTimeZoneHour = Math.floor(birthTimeZone);
        birthTimeZoneMinute = (birthTimeZone - Math.floor(birthTimeZone)) * 60;
        const DST = dayLight || false;
        const inputLunarCalc = {
            birthDay,
            birthMonth,
            birthYear,
            birthHour,
            birthMinute,
            birthTimeZone,
            DST,
        };
        return AstroCore.calculate(inputLunarCalc);
    }
    /**
     * Function is used to get the astrological details by the given date details.
     * @param  {number} day
     * @param  {number} month
     * @param  {number} year
     * @param  {number} hour24
     * @param  {number} minute
     * @param  {number} timeZoneHour
     * @param  {number} timeZoneMinute
     * @param  {boolean} dayLight
     */
    static getByDate(day, month, year, hour24, minute, timeZoneHour, timeZoneMinute, dayLight) {
        const DST = dayLight || false;
        const inputLunarCalc = {
            birthDay: day,
            birthMonth: month,
            birthYear: year,
            birthHour: hour24,
            birthMinute: minute,
            birthZoneHour: timeZoneHour,
            birthZoneMinute: timeZoneMinute,
            DST,
        };
        return AstroCore.calculate(inputLunarCalc);
    }
    /**
     * Function used to get the astrological details by Date and Zone.
     * @param  {number} day
     * @param  {number} month
     * @param  {number} year
     * @param  {number} hour24
     * @param  {number} minute
     * @param  {number} timeZone {Example: India +5:30 => 5.5}
     * @param  {boolean} dayLight
     */
    static getByDateAndZone(day, month, year, hour24, minute, timeZone, dayLight) {
        const DST = dayLight || false;
        const inputLunarCalc = {
            birthDay: day,
            birthMonth: month,
            birthYear: year,
            birthHour: hour24,
            birthMinute: minute,
            birthTimeZone: timeZone,
            DST,
        };
        return AstroCore.calculate(inputLunarCalc);
    }
    /**
     * Function used to get the astrological details, given the country is India.
     * @param  {number} day
     * @param  {number} month
     * @param  {number} year
     * @param  {number} hour24
     * @param  {number} minute
     */
    static getByDateOfIndia(day, month, year, hour24, minute) {
        const inputLunarCalc = {
            birthDay: day,
            birthMonth: month,
            birthYear: year,
            birthHour: hour24,
            birthMinute: minute,
            birthTimeZone: 5.5,
            DST: false,
        };
        return AstroCore.calculate(inputLunarCalc);
    }
    /**
     * Function to get astrological details, given the time is unknown for India.
     * Time is considered as mid of the day.
     * @param  {number} day
     * @param  {number} month
     * @param  {number} year
     */
    static getByDateWhereTimeUnknownOfIndia(day, month, year) {
        const inputLunarCalc = {
            birthDay: day,
            birthMonth: month,
            birthYear: year,
            birthHour: 12,
            birthMinute: 0,
            birthTimeZone: 5.5,
            DST: false,
        };
        return AstroCore.calculate(inputLunarCalc);
    }
    /**
     * Function to get the astrological details by specifying country timezone,
     * where birth time is unknown. Time is considered as mid of the day.
     * @param  {number} day
     * @param  {number} month
     * @param  {number} year
     * @param  {number} timeZoneHour
     * @param  {number} timeZoneMinute
     * @param  {boolean} dayLight
     */
    static getByDateWhereTimeUnknown(day, month, year, timeZoneHour, timeZoneMinute, dayLight) {
        const DST = dayLight || false;
        const inputLunarCalc = {
            birthDay: day,
            birthMonth: month,
            birthYear: year,
            birthHour: 12,
            birthMinute: 0,
            birthZoneHour: timeZoneHour,
            birthZoneMinute: timeZoneMinute,
            DST,
        };
        return AstroCore.calculate(inputLunarCalc);
    }
    /**
     * Returns the JSON object containing countries list and respective timezones.
     */
    static getCountryListWithZones() {
        return CountryList;
    }
    /**
     * Returns the array of country names.
     */
    static getOnlyCountryNameList() {
        return Object.keys(CountryList);
    }
}

module.exports = IndianAstrology;