/* eslint no-undef:"off" */
const {
    expect,
} = require('chai');
const IndianAstrology = require('.');

describe('Indian Astrology', () => {
    it('should return a valid JSON response for getByDate', () => {
        const response = IndianAstrology.getByDate(24, 5, 2018, 18, 1, 5, 30, false);
        expect(response).to.have.property('rashi');
        expect(response.rashi).to.be.a('string');
        expect(response).to.have.property('zodiacSign');
        expect(response.zodiacSign).to.be.a('string');
        expect(response).to.have.property('moonAngle');
        expect(response.moonAngle).to.be.a('string');
        expect(response).to.have.property('nakshatra');
        expect(response.nakshatra).to.be.a('string');
        expect(response).to.have.property('birthDasha');
        expect(response.birthDasha).to.be.a('string');
        expect(response).to.have.property('birthTime');
        expect(response.birthTime).to.be.a('string');
        expect(response).to.have.property('dayOfWeek');
        expect(response.dayOfWeek).to.be.a('string');
        expect(response).to.have.property('birthTimeZone');
        expect(response.birthTimeZone).to.be.a('number');
        expect(response).to.have.property('currentDasha');
        expect(response.currentDasha).to.be.a('string');
        expect(response).to.have.property('prediction');
        expect(response.prediction).to.be.a('string');
    });
    it('should throw an error for invalid day', () => {
        try {
            IndianAstrology.getByDate(32, 5, 2018, 18, 1, 5, 30, false);
        } catch (err) {
            expect(err).to.be.an.instanceof(Error);
        }
    });
    it('should throw an error for a string day', () => {
        try {
            IndianAstrology.getByDate('32', 5, 2018, 18, 1, 5, 30, false);
        } catch (err) {
            expect(err).to.be.an.instanceof(Error);
        }
    });
    it('should throw an error for a invalid month', () => {
        try {
            IndianAstrology.getByDate(24, -1, 2018, 18, 1, 5, 30, false);
        } catch (err) {
            expect(err).to.be.an.instanceof(Error);
        }
    });
    it('should throw an error for a invalid year', () => {
        try {
            IndianAstrology.getByDate(24, 5, 1000, 18, 1, 5, 30, false);
        } catch (err) {
            expect(err).to.be.an.instanceof(Error);
        }
    });
    it('should throw an error for a invalid date', () => {
        try {
            IndianAstrology.getByDate(null, null, null, 18, 1, 5, 30, false);
        } catch (err) {
            expect(err).to.be.an.instanceof(Error);
        }
    });
    it('should throw an error for a invalid day in month', () => {
        try {
            IndianAstrology.getByDate(31, 4, 2018, 18, 1, 5, 30, false);
        } catch (err) {
            expect(err).to.be.an.instanceof(Error);
        }
    });
    it('should throw an error for a invalid day in february month non-leap year', () => {
        try {
            IndianAstrology.getByDate(29, 2, 2018, 18, 1, 5, 30, false);
        } catch (err) {
            expect(err).to.be.an.instanceof(Error);
        }
    });
    it('should throw an error for a invalid day in february month leap year', () => {
        try {
            IndianAstrology.getByDate(30, 2, 1994, 18, 1, 5, 30, false);
        } catch (err) {
            expect(err).to.be.an.instanceof(Error);
        }
    });
    it('should throw an error for a invalid hour', () => {
        try {
            IndianAstrology.getByDate(25, 5, 2018, 24, 1, 5, 30, false);
        } catch (err) {
            expect(err).to.be.an.instanceof(Error);
        }
    });
    it('should throw an error for a invalid minute', () => {
        try {
            IndianAstrology.getByDate(25, 5, 2018, 24, 60, 5, 30, false);
        } catch (err) {
            expect(err).to.be.an.instanceof(Error);
        }
    });
    it('should throw an error for a string hour', () => {
        try {
            IndianAstrology.getByDate(25, 5, 2018, '24', 60, 5, 30, false);
        } catch (err) {
            expect(err).to.be.an.instanceof(Error);
        }
    });
    it('should throw an error for a string minute', () => {
        try {
            IndianAstrology.getByDate(25, 5, 2018, 24, '60', 5, 30, false);
        } catch (err) {
            expect(err).to.be.an.instanceof(Error);
        }
    });
    it('should throw an error for a string minute', () => {
        try {
            IndianAstrology.getByDate(25, 5, 2018, 24, '60', 5, 30, false);
        } catch (err) {
            expect(err).to.be.an.instanceof(Error);
        }
    });
    it('should throw an error for a no hour or minute', () => {
        try {
            IndianAstrology.getByDate(25, 5, 2018, null, null, 5, 30, false);
        } catch (err) {
            expect(err).to.be.an.instanceof(Error);
        }
    });
    it('should throw an error for a no DST', () => {
        try {
            IndianAstrology.getByDate(25, 5, 2018, 18, 1, 5, 30, null);
        } catch (err) {
            expect(err).to.be.an.instanceof(Error);
        }
    });
    it('should throw an error for a invalid DST', () => {
        try {
            IndianAstrology.getByDate(25, 5, 2018, 18, 1, 5, 30, 'true');
        } catch (err) {
            expect(err).to.be.an.instanceof(Error);
        }
    });
    it('should throw an error for a no timezone', () => {
        try {
            IndianAstrology.getByDateAndZone(24, 5, 2018, 18, 1, null, false);
        } catch (err) {
            expect(err).to.be.an.instanceof(Error);
        }
    });
    it('should throw an error for a invalid timezone', () => {
        try {
            IndianAstrology.getByDateAndZone(24, 5, 2018, 18, 1, '5.5', false);
        } catch (err) {
            expect(err).to.be.an.instanceof(Error);
        }
    });
    it('should return a valid JSON response for getTodaysDetails', () => {
        const response = IndianAstrology.getTodaysDetails(true);
        expect(response).to.have.property('rashi');
        expect(response.rashi).to.be.a('string');
        expect(response).to.have.property('zodiacSign');
        expect(response.zodiacSign).to.be.a('string');
        expect(response).to.have.property('moonAngle');
        expect(response.moonAngle).to.be.a('string');
        expect(response).to.have.property('nakshatra');
        expect(response.nakshatra).to.be.a('string');
        expect(response).to.have.property('birthDasha');
        expect(response.birthDasha).to.be.a('string');
        expect(response).to.have.property('birthTime');
        expect(response.birthTime).to.be.a('string');
        expect(response).to.have.property('dayOfWeek');
        expect(response.dayOfWeek).to.be.a('string');
        expect(response).to.have.property('birthTimeZone');
        expect(response.birthTimeZone).to.be.a('number');
        expect(response).to.have.property('currentDasha');
        expect(response.currentDasha).to.be.a('string');
        expect(response).to.have.property('prediction');
        expect(response.prediction).to.be.a('string');
    });
    it('should return a valid JSON response for getTodaysDetails without passing DST', () => {
        const response = IndianAstrology.getTodaysDetails();
        expect(response).to.have.property('rashi');
        expect(response.rashi).to.be.a('string');
        expect(response).to.have.property('zodiacSign');
        expect(response.zodiacSign).to.be.a('string');
        expect(response).to.have.property('moonAngle');
        expect(response.moonAngle).to.be.a('string');
        expect(response).to.have.property('nakshatra');
        expect(response.nakshatra).to.be.a('string');
        expect(response).to.have.property('birthDasha');
        expect(response.birthDasha).to.be.a('string');
        expect(response).to.have.property('birthTime');
        expect(response.birthTime).to.be.a('string');
        expect(response).to.have.property('dayOfWeek');
        expect(response.dayOfWeek).to.be.a('string');
        expect(response).to.have.property('birthTimeZone');
        expect(response.birthTimeZone).to.be.a('number');
        expect(response).to.have.property('currentDasha');
        expect(response.currentDasha).to.be.a('string');
        expect(response).to.have.property('prediction');
        expect(response.prediction).to.be.a('string');
    });
    it('should return a valid JSON response for getByDateAndZone', () => {
        const response = IndianAstrology.getByDateAndZone(24, 5, 2018, 18, 1, 5.5, false);
        expect(response).to.have.property('rashi');
        expect(response.rashi).to.be.a('string');
        expect(response).to.have.property('zodiacSign');
        expect(response.zodiacSign).to.be.a('string');
        expect(response).to.have.property('moonAngle');
        expect(response.moonAngle).to.be.a('string');
        expect(response).to.have.property('nakshatra');
        expect(response.nakshatra).to.be.a('string');
        expect(response).to.have.property('birthDasha');
        expect(response.birthDasha).to.be.a('string');
        expect(response).to.have.property('birthTime');
        expect(response.birthTime).to.be.a('string');
        expect(response).to.have.property('dayOfWeek');
        expect(response.dayOfWeek).to.be.a('string');
        expect(response).to.have.property('birthTimeZone');
        expect(response.birthTimeZone).to.be.a('number');
        expect(response).to.have.property('currentDasha');
        expect(response.currentDasha).to.be.a('string');
        expect(response).to.have.property('prediction');
        expect(response.prediction).to.be.a('string');
    });
    it('should return a valid JSON response for getByDateAndZone with day light', () => {
        const response = IndianAstrology.getByDateAndZone(24, 5, 2018, 18, 1, 1, true);
        expect(response).to.have.property('rashi');
        expect(response.rashi).to.be.a('string');
        expect(response).to.have.property('zodiacSign');
        expect(response.zodiacSign).to.be.a('string');
        expect(response).to.have.property('moonAngle');
        expect(response.moonAngle).to.be.a('string');
        expect(response).to.have.property('nakshatra');
        expect(response.nakshatra).to.be.a('string');
        expect(response).to.have.property('birthDasha');
        expect(response.birthDasha).to.be.a('string');
        expect(response).to.have.property('birthTime');
        expect(response.birthTime).to.be.a('string');
        expect(response).to.have.property('dayOfWeek');
        expect(response.dayOfWeek).to.be.a('string');
        expect(response).to.have.property('birthTimeZone');
        expect(response.birthTimeZone).to.be.a('number');
        expect(response).to.have.property('currentDasha');
        expect(response.currentDasha).to.be.a('string');
        expect(response).to.have.property('prediction');
        expect(response.prediction).to.be.a('string');
    });
    it('should return a valid JSON response for getByDateOfIndia', () => {
        const response = IndianAstrology.getByDateOfIndia(24, 5, 2018, 18, 1);
        expect(response).to.have.property('rashi');
        expect(response.rashi).to.be.a('string');
        expect(response).to.have.property('zodiacSign');
        expect(response.zodiacSign).to.be.a('string');
        expect(response).to.have.property('moonAngle');
        expect(response.moonAngle).to.be.a('string');
        expect(response).to.have.property('nakshatra');
        expect(response.nakshatra).to.be.a('string');
        expect(response).to.have.property('birthDasha');
        expect(response.birthDasha).to.be.a('string');
        expect(response).to.have.property('birthTime');
        expect(response.birthTime).to.be.a('string');
        expect(response).to.have.property('dayOfWeek');
        expect(response.dayOfWeek).to.be.a('string');
        expect(response).to.have.property('birthTimeZone');
        expect(response.birthTimeZone).to.be.a('number');
        expect(response).to.have.property('currentDasha');
        expect(response.currentDasha).to.be.a('string');
        expect(response).to.have.property('prediction');
        expect(response.prediction).to.be.a('string');
    });
    it('should return a valid JSON response for getByDateWhereTimeUnknownOfIndia', () => {
        const response = IndianAstrology.getByDateWhereTimeUnknownOfIndia(24, 5, 2018);
        expect(response).to.have.property('rashi');
        expect(response.rashi).to.be.a('string');
        expect(response).to.have.property('zodiacSign');
        expect(response.zodiacSign).to.be.a('string');
        expect(response).to.have.property('moonAngle');
        expect(response.moonAngle).to.be.a('string');
        expect(response).to.have.property('nakshatra');
        expect(response.nakshatra).to.be.a('string');
        expect(response).to.have.property('birthDasha');
        expect(response.birthDasha).to.be.a('string');
        expect(response).to.have.property('birthTime');
        expect(response.birthTime).to.be.a('string');
        expect(response).to.have.property('dayOfWeek');
        expect(response.dayOfWeek).to.be.a('string');
        expect(response).to.have.property('birthTimeZone');
        expect(response.birthTimeZone).to.be.a('number');
        expect(response).to.have.property('currentDasha');
        expect(response.currentDasha).to.be.a('string');
        expect(response).to.have.property('prediction');
        expect(response.prediction).to.be.a('string');
    });
    it('should return a valid JSON response for getByDateWhereTimeUnknown', () => {
        const response = IndianAstrology.getByDateWhereTimeUnknown(24, 5, 2018, 5, 30, false);
        expect(response).to.have.property('rashi');
        expect(response.rashi).to.be.a('string');
        expect(response).to.have.property('zodiacSign');
        expect(response.zodiacSign).to.be.a('string');
        expect(response).to.have.property('moonAngle');
        expect(response.moonAngle).to.be.a('string');
        expect(response).to.have.property('nakshatra');
        expect(response.nakshatra).to.be.a('string');
        expect(response).to.have.property('birthDasha');
        expect(response.birthDasha).to.be.a('string');
        expect(response).to.have.property('birthTime');
        expect(response.birthTime).to.be.a('string');
        expect(response).to.have.property('dayOfWeek');
        expect(response.dayOfWeek).to.be.a('string');
        expect(response).to.have.property('birthTimeZone');
        expect(response.birthTimeZone).to.be.a('number');
        expect(response).to.have.property('currentDasha');
        expect(response.currentDasha).to.be.a('string');
        expect(response).to.have.property('prediction');
        expect(response.prediction).to.be.a('string');
    });
    it('should return a valid JSON response for getCountryListWithZones', () => {
        const response = IndianAstrology.getCountryListWithZones();
        expect(response).to.be.an('object');
    });
    it('should return a valid JSON response for getOnlyCountryNameList', () => {
        const response = IndianAstrology.getOnlyCountryNameList();
        expect(response).to.be.an('array');
    });
});