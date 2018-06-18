'use strict';

const vinter5a = require('./prediction');

const d2r = Math.PI / 180;
const r2d = 180 / Math.PI;
let ra = 0;
let pln = 0;
let pla = 0;
let dc = 0; // right ascension, declination
const lord1 = 'KetVenSunMonMarRahJupSatMer';
const dasha = [7, 20, 6, 10, 7, 18, 16, 19, 17];
const znl = 'Aries (Mesha)~Taurus (Vrushaba)~Gemini (Mithuna)~Cancer (Kataka)~Leo (Simha)~Virgo (Kanya)~Libra (Tula)~Scorpio (Vrushika)~Sagittarius (Dhanu)~Capricorn (Makara)~Aquarius (Kumbha)~Pisces (Meena)'; // Zodiac Map
const zsign = znl.split('~');
const range = [1, 31, 1, 12, 1800, 2100, 0, 23, 0, 59, 0,
    0, 0, 12, 0, 59, 0, 179, 0, 59, 0, 0, 0, 89, 0, 59,
];
const naks = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu',
    'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
    'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Shadya', 'Uttara Shadya', 'Shravana',
    'Dhanishtha', 'Shatbisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
];
const vinter1 = 'Your Janma Rashi or the Sign Moon was positioned at Birth is';
const vinter2 = 'According to Vedic Astrology : ';
const vinter4 = vinter5a.split('~');

let rashi;
let zodiacSign;
let moonAngle;
let nakshatra;
let birthDasha;
let birthDate;
let birthTime;
let dayOfWeek;
let birthTimeZone;
let currentDasha;
let prediction;

class AstroCore {
    /**
     * Function to validate the entries.
     * @param  {JSON} f
     */
    static validateEntries(f) {
        if (f.birthDay && f.birthMonth && f.birthYear) {
            if (typeof f.birthDay === 'number' && typeof f.birthMonth === 'number' && typeof f.birthYear === 'number') {
                if (f.birthMonth < 1 || f.birthMonth > 12) {
                    throw new Error('Month should be between 1 and 12');
                }
                if (f.birthYear < 1800 || f.birthYear > 2100) {
                    throw new Error('Year should be between 1800 and 2100');
                }
                if (f.birthMonth === 1 || f.birthMonth === 3 || f.birthMonth === 5 || f.birthMonth === 7 || f.birthMonth === 8 || f.birthMonth === 10 || f.birthMonth === 12) {
                    if (f.birthDay < 1 || f.birthDay > 31) {
                        throw new Error('Day should be between 1 and 31');
                    }
                }
                if (f.birthMonth === 4 || f.birthMonth === 6 || f.birthMonth === 9 || f.birthMonth === 11) {
                    if (f.birthDay < 1 || f.birthDay > 30) {
                        throw new Error('Day should be between 1 and 30');
                    }
                }
                if (f.birthMonth === 2) {
                    if (f.birthYear % 4 === 0 || f.birthYear % 400 === 0) {
                        if (f.birthDay < 1 || f.birthDay > 29) {
                            throw new Error('Day should be between 1 and 29');
                        }
                    } else if (f.birthDay < 1 || f.birthDay > 28) {
                        throw new Error('Day should be between 1 and 28');
                    }
                }
            } else {
                throw new Error('Day, month and Year should be numbers.');
            }
        } else {
            throw new Error('Day, month and Year is required.');
        }
        if (f.birthHour && f.birthMinute) {
            if (typeof f.birthHour === 'number' && typeof f.birthMinute === 'number') {
                if (f.birthHour < 0 || f.birthHour > 23) {
                    throw new Error('Hour should be between 0 and 23.');
                }
                if (f.birthMinute < 0 || f.birthMinute > 59) {
                    throw new Error('Minute should be between 0 and 59.');
                }
            } else {
                throw new Error('Hour and minute should be numbers.');
            }
        } else if (f.birthHour === null || f.birthMinute === null) {
            throw new Error('Hour and minute should not be null.');
        }
        if (f.DST) {
            if (typeof f.DST !== 'boolean') {
                throw new Error('Day light Saving should be either true or false');
            }
        } else if (f.DST === null) {
            throw new Error('DST should not be null.');
        }
        if (f.birthZone) {
            if (typeof f.birthZone !== 'number') {
                throw new Error('Birth zone should be number. Eg: India (5.5) => +5:30 => 5.5, so input should be 5.5');
            }
        } else if (f.birthZone === null) {
            throw new Error('Timezone should not be null.');
        }
        return false;
    }
    /**
     * Function to calculate based on given input JSON.
     * @param  {JSON} inputLunarCalc
     */
    static calculate(inputLunarCalc) {
        if (AstroCore.validateEntries(inputLunarCalc)) {
            return {
                error: 'Unable to satisfy all conditions.',
            };
        }

        let mon = Math.floor(inputLunarCalc.birthMonth);
        let day = Math.floor(inputLunarCalc.birthDay);
        let year = Math.floor(inputLunarCalc.birthYear);
        let hr = Math.floor(inputLunarCalc.birthHour);
        hr += Math.floor(inputLunarCalc.birthMinute) / 60;
        let tz = 5.5; // default to India
        if (inputLunarCalc.birthZone) {
            tz = inputLunarCalc.birthZone;
        } else if (inputLunarCalc.birthZoneHour && inputLunarCalc.birthZoneMinute) {
            tz = Math.floor(inputLunarCalc.birthZoneHour);
            tz += Math.floor(inputLunarCalc.birthZoneMinute) / 60;
        }
        birthTimeZone = tz;

        let ln = tz * 15;
        const la = 0;

        const dst = inputLunarCalc.DST;

        if (tz > 0.0) ln = -ln;
        if (dst) {
            if (ln < 0.0) tz += 1;
            else tz -= 1;
        }

        const jd = AstroCore.mdy2julian(mon, day, year);
        let f;
        let t;
        let gst;
        let ay;
        let ob;
        let l;
        let d;
        let m;
        let mm;
        let e;
        let p;
        let b;
        let r;
        let h;
        let u;
        let s;
        let c;
        let dlt;
        let hh;
        let nk;
        let nl;
        let db;
        let bk;
        let ndasha;
        let jd1;
        let d1;
        let pd;
        let today;
        let curjd;
        let cd;
        if (ln < 0.0) f = hr - tz;
        else f = hr + tz;
        t = (jd - 2451545 - 0.5) / 36525;
        gst = AstroCore.ut2gst(t, f);
        t = ((jd - 2451545) + f / 24 - 0.5) / 36525;
        ay = AstroCore.calcayan(t);

        ob = 23.452294 - 0.0130125 * t; //  Obliquity of Ecliptic

        birthDate = `${inputLunarCalc.birthDay}-${inputLunarCalc.birthMonth}-${inputLunarCalc.birthYear}`;
        birthTime = `${inputLunarCalc.birthHour}:${inputLunarCalc.birthMinute}`;
        // Calculate Moon longitude, latitude, and distance using truncated Chapront algorithm
        /* eslint max-len:"off" */
        dayOfWeek = AstroCore.calculateDayFromDate(+inputLunarCalc.birthDay, +inputLunarCalc.birthMonth, +inputLunarCalc.birthYear);
        // Moon mean longitude
        l = (218.3164591 + 481267.88134236 * t);
        // Moon mean elongation
        d = (297.8502042 + 445267.1115168 * t);
        // Sun's mean anomaly
        m = (357.5291092 + 35999.0502909 * t);
        // Moon's mean anomaly
        mm = (134.9634114 + 477198.8676313 * t);
        // Moon's argument of latitude
        f = (93.2720993 + 483202.0175273 * t);

        d *= d2r;
        m *= d2r;
        mm *= d2r;
        f *= d2r;

        e = 1 - 0.002516 * t - 0.0000074 * t * t;

        p = 6.288774 * Math.sin(mm) +
            1.274027 * Math.sin(d * 2 - mm) +
            0.658314 * Math.sin(d * 2) +
            0.213618 * Math.sin(2 * mm) -
            0.185116 * e * Math.sin(m) -
            0.114332 * Math.sin(f * 2);

        p += 0.058793 * Math.sin(d * 2 - mm * 2) +
            0.057066 * e * Math.sin(d * 2 - m - mm) +
            0.053322 * Math.sin(d * 2 + mm) +
            0.045758 * e * Math.sin(d * 2 - m) -
            0.040923 * e * Math.sin(m - mm) -
            0.034720 * Math.sin(d) -
            0.030383 * e * Math.sin(m + mm);

        p += 0.015327 * Math.sin(d * 2 - f * 2) -
            0.012528 * Math.sin(mm + f * 2) +
            0.010980 * Math.sin(mm - f * 2) +
            0.010675 * Math.sin(d * 4 - mm) +
            0.010034 * Math.sin(3 * mm);

        p += 0.008548 * Math.sin(d * 4 - mm * 2) -
            0.007888 * e * Math.sin(d * 2 + m - mm) -
            0.006766 * e * Math.sin(d * 2 + m) -
            0.005163 * Math.sin(d - mm) +
            0.004987 * e * Math.sin(d + m) +
            0.004036 * e * Math.sin(d * 2 - m + mm) +
            0.003994 * Math.sin(d * 2 + mm * 2);

        b = 5.128122 * Math.sin(f) +
            0.280602 * Math.sin(mm + f) +
            0.277693 * Math.sin(mm - f) +
            0.173237 * Math.sin(d * 2 - f) +
            0.055413 * Math.sin(d * 2 - mm + f) +
            0.046271 * Math.sin(d * 2 - mm - f);

        b += 0.032573 * Math.sin(2 * d + f) +
            0.017198 * Math.sin(2 * mm + f) +
            0.009266 * Math.sin(2 * d + mm - f) +
            0.008823 * Math.sin(2 * mm - f) +
            0.008247 * e * Math.sin(2 * d - m - f) +
            0.004324 * Math.sin(2 * d - f - 2 * mm);

        b += 0.004200 * Math.sin(2 * d + f + mm) +
            0.003372 * e * Math.sin(f - m - 2 * d) +
            0.002472 * e * Math.sin(2 * d + f - m - mm) +
            0.002222 * e * Math.sin(2 * d + f - m) +
            0.002072 * e * Math.sin(2 * d - f - m - mm) +
            0.001877 * e * Math.sin(f - m + mm);

        b += 0.001828 * Math.sin(4 * d - f - mm) -
            0.001803 * e * Math.sin(f + m) -
            0.001750 * Math.sin(3 * f) +
            0.001570 * e * Math.sin(mm - m - f) -
            0.001487 * Math.sin(f + d) -
            0.001481 * e * Math.sin(f + m + mm);

        r = -20905.355 * Math.cos(mm) -
            3699.111 * Math.cos(d * 2 - mm) -
            2955.968 * Math.cos(d * 2) -
            560.925 * Math.cos(2 * mm) -
            48.888 * e * Math.cos(m) -
            3.149 * Math.cos(f * 2);

        r = 0.950724 + 0.051818 * Math.cos(mm) +
            0.009531 * Math.cos(2 * d - mm) +
            0.007843 * Math.cos(2 * d) +
            0.002824 * Math.cos(2 * mm) +
            0.000857 * Math.cos(2 * d + mm) +
            0.000533 * e * Math.cos(2 * d - m);

        r += 0.000401 * e * Math.cos(2 * d - m - mm) +
            0.000320 * e * Math.cos(mm - m) -
            0.000271 * Math.cos(d) -
            0.000264 * e * Math.cos(m + mm) -
            0.000198 * Math.cos(2 * f - mm) +
            0.000173 * Math.cos(3 * mm);

        r += 0.000167 * Math.cos(4 * d - mm) -
            0.000111 * e * Math.cos(m) +
            0.000103 * Math.cos(4 * d - 2 * mm) -
            0.000084 * Math.cos(2 * mm - 2 * d) -
            0.000083 * e * Math.cos(2 * d + m) +
            0.000079 * Math.cos(2 * d + 2 * mm) +
            0.000072 * Math.cos(4 * d);


        l += p;
        while (l < 0.0) l += 360.0;
        while (l > 360.0) l -= 360.0;

        //  Parallax calculations are found in Meeus, Duffett-Smith, Astrologic Almanac (etc)
        //  Topocentric calculations are done on RA and DEC

        // start parallax calculations
        AstroCore.ecl2equ(l, b, ob);
        ln = -ln; // flip sign of longitude
        ln /= 15;
        ln += gst;
        while (ln < 0.0) ln += 24;
        while (ln > 24.0) ln -= 24;
        h = (ln - ra) * 15;
        // calc observer latitude vars
        u = Math.tan(0.996647 * Math.tan(d2r * la));
        // hh = alt/6378140; // assume sea level
        s = 0.996647 * Math.sin(u); // assume sealevel
        c = Math.cos(u); // + hh * Math.cos(d2r(la)); // cos la' -- assume sea level
        r = 1 / Math.sin(d2r * r);
        dlt = Math.atan2(c * Math.sin(d2r * h), r * Math.cos(d2r * dc) - c * Math.cos(d2r * h));
        dlt *= r2d;
        hh = h + dlt;
        dlt /= 15;
        ra -= dlt;
        dc = Math.tan(Math.cos(d2r * hh) * ((r * Math.sin(d2r * dc) - s) /
            (r * Math.cos(d2r * dc) * Math.cos(d2r * h) - c)));
        dc *= r2d;
        AstroCore.equ2ecl(ra, dc, ob);
        // dasha calculations
        l += ay;
        if (l < 0.0) l += 360.0;
        rashi = AstroCore.lon2dmsz(l);
        AstroCore.lon2zodiac(l);
        let temp = rashi;
        rashi = temp.split(' ')[1].replace('(', '').replace(')', '');
        zodiacSign = temp.split(' ')[0].trim();
        moonAngle = temp.split(' ')[2].trim();
        nk = (l * 60) / 800.0; // get nakshatra
        nakshatra = naks[Math.floor(nk)];
        nl = Math.floor(nk) % 9;
        db = 1 - (nk - Math.floor(nk));
        bk = AstroCore.calcbhukti(db, nl);
        ndasha = (db * dasha[nl]) * 365.25;
        jd1 = jd + ndasha;
        d1 = nl;
        pd = AstroCore.calcpraty(db, nl);

        birthDasha = `${lord1.substr(nl * 3, 3)}/${lord1.substr(bk * 3, 3)}/${lord1.substr(pd * 3, 3)}`;

        // Calculate current dasha/bhukti
        // do something if it is the current or future date
        today = new Date();
        mon = today.getMonth() + 1;
        day = today.getDate();
        year = today.getFullYear();
        curjd = AstroCore.mdy2julian(mon, day, year);
        cd = curjd - jd1;
        d1 += 1;
        if (d1 === 9) d1 = 0;
        currentDasha = AstroCore.calccurdasha(cd, d1);

        return {
            rashi,
            zodiacSign,
            moonAngle,
            nakshatra,
            birthDasha,
            birthDate,
            birthTime,
            dayOfWeek,
            birthTimeZone,
            currentDasha,
            prediction,
        };
    }
    /**
     * @param  {number} cd
     * @param  {number} nl
     */
    static calccurdasha(cd, nl) {
        // check for > 120 years
        while (cd < 0) cd += 43830;
        let len = 0;
        for (let i = 0; i < 9; i++) {
            len += dasha[nl] * 365.25;
            if (len > cd) break;
            nl++;
            if (nl === 9) nl = 0;
        }
        cd = len - cd;
        cd /= dasha[nl] * 365.25;
        const bk = AstroCore.calcbhukti(cd, nl);
        const pd = AstroCore.calcpraty(cd, nl);
        const str = `${lord1.substr(nl * 3, 3)}/${lord1.substr(bk * 3, 3)}/${lord1.substr(pd * 3, 3)}`;
        return str;
    }
    /**
     * Returns the day of the week given the date.
     * @param  {number} dd
     * @param  {number} mm
     * @param  {number} yyyy
     */
    static calculateDayFromDate(dd, mm, yyyy) {
        const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
        const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monVal = (mm < 3) ? 1 : 0;
        yyyy -= monVal;
        const day = (yyyy + yyyy / 4 - yyyy / 100 + yyyy / 400 + t[mm - 1] + dd) % 7;
        return week[Math.floor(day)];
    }
    /**
     * @param  {number} db
     * @param  {number} dp
     */
    static calcbhukti(db, dp) {
        const x = 1 - db; // find days elapsed
        let y = 0;
        let buk = dp;
        for (let i = 0; i < 9; i++) {
            y += dasha[buk] / 120; // percentage of period
            if (y > x) break;
            buk++;
            if (buk === 9) buk = 0;
        }
        return buk;
    }
    /**
     * @param  {number} db
     * @param  {number} dp
     */
    static calcpraty(db, dp) {
        const x = 1 - db; // find days elapsed
        let y = 0;
        let bk1 = dp;
        for (let i = 0; i < 9; i++) {
            y += dasha[bk1] / 120; // percentage of period
            if (y > x) break;
            bk1++;
            if (bk1 === 9) bk1 = 0;
        }
        y -= x; // find days left over
        y /= (dasha[bk1] / 120); // % of this bukti to go
        return AstroCore.calcbhukti(y, bk1);
    }
    /**
     * Calculate Ayanamsa using J2000 Epoch
     * @param  {number} t
     */
    static calcayan(t) {
        const ln = 125.0445550 - 1934.1361849 * t + 0.0020762 * t * t; // Mean lunar node
        let off = 280.466449 + 36000.7698231 * t + 0.00031060 * t * t; // Mean Sun
        off = 17.23 * Math.sin(d2r * ln) + 1.27 * Math.sin(d2r * off) - (5025.64 + 1.11 * t) * t;
        off = (off - 85886.27) / 3600.0;
        return off;
    }
    /**
     * @param  {number} t
     * @param  {number} ut
     */
    static ut2gst(t, ut) {
        let t0 = 6.697374558 + (2400.051336 * t) + (0.000025862 * t * t);
        ut *= 1.002737909;
        t0 += ut;
        while (t0 < 0.0) t0 += 24;
        while (t0 > 24.0) t0 -= 24;
        return t0;
    }
    /**
     * @param  {number} ln
     * @param  {number} la
     * @param  {number} ob
     */
    static ecl2equ(ln, la, ob) {
        let y = Math.sin(Math.sin(d2r * la) *
            Math.cos(d2r * ob) + Math.cos(d2r * la) * Math.sin(d2r * ob) * Math.sin(d2r * ln));
        y = Math.sin(d2r * ln) * Math.cos(d2r * ob) - Math.tan(d2r * la) * Math.sin(d2r * ob);
        let x = Math.cos(d2r * ln);
        x = Math.atan2(y, x);
        x *= r2d;
        if (x < 0.0) x += 360;
        ra = x / 15;
    }
    /**
     * Calculate paralax
     * @param  {number} ra1
     * @param  {number} dc1
     * @param  {number} ob
     */
    static equ2ecl(ra1, dc1, ob) {
        ra1 *= 15;
        let y = Math.sin(d2r * ra1) * Math.cos(d2r * ob) + Math.tan(d2r * dc1) * Math.sin(d2r * ob);
        let x = Math.cos(d2r * ra1);
        x = Math.atan2(y, x);
        x *= r2d;
        if (x < 0) x += 360;
        pln = x;
        y = Math.sin(Math.sin(d2r * dc1) * Math.cos(d2r * ob) -
            Math.cos(d2r * dc1) * Math.sin(d2r * ob) * Math.sin(d2r * ra1));
        pla = r2d * y;
    }
    /**
     * Build string with degrees, minutes, seconds and zodiac sign from longitude
     * @param  {number} x
     */
    static lon2dmsz(x) {
        let d;
        let m;
        let s;
        x = Math.abs(x);
        d = Math.floor(x);
        m = (x - d);
        s = m * 60;
        m = Math.floor(s);
        s -= m;
        const z = Math.floor(d / 30);
        d %= 30;
        const str = `${zsign[z]} ${d}°${m}'${Math.floor(s * 60)}"`;
        return str;
    }
    /**
     * Build string with zodiac sign from longitude
     * @param  {number} x
     */
    static lon2zodiac(x) {
        let d;
        let m;
        let s;
        x = Math.abs(x);
        d = Math.floor(x);
        m = (x - d);
        s = m * 60;
        m = Math.floor(s);
        s -= m;
        const z = Math.floor(d / 30);
        d %= 30;
        const str2 = `${d}° ${m}' ${Math.floor(s * 60)}" ${zsign[z]}`;
        prediction = `${vinter1} ${zsign[z]} ${vinter2} ${vinter4[z]}`;
        return str2;
    }
    /**
     * Calculate Julian Day from Month, Day and Year
     * @param  {number} m
     * @param  {number} d
     * @param  {number} y
     */
    static mdy2julian(m, d, y) {
        const im = 12 * (y + 4800) + m - 3;
        let j = (2 * (im - Math.floor(im / 12) * 12) + 7 + 365 * im) / 12;
        j = Math.floor(j) + d + Math.floor(im / 48) - 32083;
        if (j > 2299171) j += Math.floor(im / 4800) - Math.floor(im / 1200) + 38;
        return j;
    }
}

module.exports = AstroCore;