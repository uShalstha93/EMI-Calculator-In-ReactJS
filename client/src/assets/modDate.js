// modDate.js - Nepali Date Conversion Utilities
class ModDate {
    constructor() {
        this.months = [
            { name: 'Baishakh', en: 'Baisakh', short: 'Bai', days: 31 },
            { name: 'Jeshtha', en: 'Jestha', short: 'Jes', days: 31 },
            { name: 'Ashadh', en: 'Asar', short: 'Ash', days: 32 },
            { name: 'Shravan', en: 'Shrawan', short: 'Sra', days: 31 },
            { name: 'Bhadra', en: 'Bhadra', short: 'Bha', days: 31 },
            { name: 'Ashwin', en: 'Asoj', short: 'Asw', days: 30 },
            { name: 'Kartik', en: 'Kartik', short: 'Kar', days: 30 },
            { name: 'Mansir', en: 'Mangsir', short: 'Man', days: 29 },
            { name: 'Paush', en: 'Poush', short: 'Pau', days: 30 },
            { name: 'Magh', en: 'Magh', short: 'Mag', days: 29 },
            { name: 'Fagun', en: 'Fagun', short: 'Fag', days: 30 },
            { name: 'Chaitra', en: 'Chaitra', short: 'Cha', days: 30 }
        ];

        // Initialize data
        this.ND = this.initializeNepaliDays();
        this.startDates = this.initializeStartDates();
    }

    initializeNepaliDays() {
        // Complete data from your C# code (years 2050-2100)
        const ND = new Array(51).fill().map(() => new Array(12).fill(0));

        // Year 0 (2050)
        ND[0] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31];
        // Year 1 (2051)
        ND[1] = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30];
        // Year 2 (2052)
        ND[2] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30];
        // Year 3 (2053)
        ND[3] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30];
        // Year 4 (2054)
        ND[4] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31];
        // Year 5 (2055)
        ND[5] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30];
        // Year 6 (2056)
        ND[6] = [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30];
        // Year 7 (2057)
        ND[7] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31];
        // Year 8 (2058)
        ND[8] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31];
        // Year 9 (2059)
        ND[9] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30];
        // Year 10 (2060)
        ND[10] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30];
        // Year 11 (2061)
        ND[11] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31];
        // Year 12 (2062)
        ND[12] = [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31];
        // Year 13 (2063)
        ND[13] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30];
        // Year 14 (2064)
        ND[14] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30];
        // Year 15 (2065)
        ND[15] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31];
        // Year 16 (2066)
        ND[16] = [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31];
        // Year 17 (2067)
        ND[17] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30];
        // Year 18 (2068)
        ND[18] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30];
        // Year 19 (2069)
        ND[19] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31];
        // Year 20 (2070)
        ND[20] = [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30];
        // Year 21 (2071)
        ND[21] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30];
        // Year 22 (2072)
        ND[22] = [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30];
        // Year 23 (2073)
        ND[23] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31];
        // Year 24 (2074)
        ND[24] = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30];
        // Year 25 (2075)
        ND[25] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30];
        // Year 26 (2076)
        ND[26] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30];
        // Year 27 (2077)
        ND[27] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31];
        // Year 28 (2078)
        ND[28] = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30];
        // Year 29 (2079)
        ND[29] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30];
        // Year 30 (2080)
        ND[30] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30];
        // Year 31 (2081)
        ND[31] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31];
        // Year 32 (2082)
        ND[32] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30];
        // Year 33 (2083)
        ND[33] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30];
        // Year 34 (2084)
        ND[34] = [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30];
        // Year 35 (2085)
        ND[35] = [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30];
        // Year 36 (2086)
        ND[36] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30];
        // Year 37 (2087)
        ND[37] = [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30];
        // Year 38 (2088)
        ND[38] = [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30];
        // Year 39 (2089)
        ND[39] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30];
        // Year 40 (2090)
        ND[40] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30];
        // Year 41 (2091)
        ND[41] = [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30];
        // Year 42 (2092)
        ND[42] = [30, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30];
        // Year 43 (2093)
        ND[43] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30];
        // Year 44 (2094)
        ND[44] = [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30];
        // Year 45 (2095)
        ND[45] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30];
        // Year 46 (2096)
        ND[46] = [30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30];
        // Year 47 (2097)
        ND[47] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30];
        // Year 48 (2098)
        ND[48] = [31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 29, 31];
        // Year 49 (2099)
        ND[49] = [31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30];
        // Year 50 (2100)
        ND[50] = [31, 32, 31, 32, 30, 31, 30, 29, 30, 29, 30, 30];

        return ND;
    }

    initializeStartDates() {
        const startDates = [];
        // Corresponding to years 2050-2100
        startDates[0] = new Date(1993, 3, 13); // 2050 BS - April 13, 1993 AD
        startDates[1] = new Date(1994, 3, 14); // 2051 BS
        startDates[2] = new Date(1995, 3, 14); // 2052 BS
        startDates[3] = new Date(1996, 3, 13); // 2053 BS
        startDates[4] = new Date(1997, 3, 13); // 2054 BS
        startDates[5] = new Date(1998, 3, 14); // 2055 BS
        startDates[6] = new Date(1999, 3, 14); // 2056 BS
        startDates[7] = new Date(2000, 3, 13); // 2057 BS
        startDates[8] = new Date(2001, 3, 14); // 2058 BS
        startDates[9] = new Date(2002, 3, 14); // 2059 BS
        startDates[10] = new Date(2003, 3, 14); // 2060 BS
        startDates[11] = new Date(2004, 3, 13); // 2061 BS
        startDates[12] = new Date(2005, 3, 14); // 2062 BS
        startDates[13] = new Date(2006, 3, 14); // 2063 BS
        startDates[14] = new Date(2007, 3, 14); // 2064 BS
        startDates[15] = new Date(2008, 3, 13); // 2065 BS
        startDates[16] = new Date(2009, 3, 14); // 2066 BS
        startDates[17] = new Date(2010, 3, 14); // 2067 BS
        startDates[18] = new Date(2011, 3, 14); // 2068 BS
        startDates[19] = new Date(2012, 3, 13); // 2069 BS
        startDates[20] = new Date(2013, 3, 14); // 2070 BS
        startDates[21] = new Date(2014, 3, 14); // 2071 BS
        startDates[22] = new Date(2015, 3, 14); // 2072 BS
        startDates[23] = new Date(2016, 3, 13); // 2073 BS
        startDates[24] = new Date(2017, 3, 14); // 2074 BS
        startDates[25] = new Date(2018, 3, 14); // 2075 BS
        startDates[26] = new Date(2019, 3, 14); // 2076 BS
        startDates[27] = new Date(2020, 3, 13); // 2077 BS
        startDates[28] = new Date(2021, 3, 14); // 2078 BS
        startDates[29] = new Date(2022, 3, 14); // 2079 BS
        startDates[30] = new Date(2023, 3, 14); // 2080 BS
        startDates[31] = new Date(2024, 3, 13); // 2081 BS
        startDates[32] = new Date(2025, 3, 14); // 2082 BS
        startDates[33] = new Date(2026, 3, 14); // 2083 BS
        startDates[34] = new Date(2027, 3, 14); // 2084 BS
        startDates[35] = new Date(2028, 3, 13); // 2085 BS
        startDates[36] = new Date(2029, 3, 14); // 2086 BS
        startDates[37] = new Date(2030, 3, 14); // 2087 BS
        startDates[38] = new Date(2031, 3, 15); // 2088 BS
        startDates[39] = new Date(2032, 3, 14); // 2089 BS
        startDates[40] = new Date(2033, 3, 14); // 2090 BS
        startDates[41] = new Date(2034, 3, 14); // 2091 BS
        startDates[42] = new Date(2035, 3, 15); // 2092 BS
        startDates[43] = new Date(2036, 3, 14); // 2093 BS
        startDates[44] = new Date(2037, 3, 14); // 2094 BS
        startDates[45] = new Date(2038, 3, 14); // 2095 BS
        startDates[46] = new Date(2039, 3, 15); // 2096 BS
        startDates[47] = new Date(2040, 3, 13); // 2097 BS
        startDates[48] = new Date(2041, 3, 14); // 2098 BS
        startDates[49] = new Date(2042, 3, 14); // 2099 BS
        startDates[50] = new Date(2043, 3, 14); // 2100 BS

        return startDates;
    }

    engToNep(date) {
        try {
            const yr = date.getFullYear();
            const mn = date.getMonth() + 1;
            const dy = date.getDate();

            // Check if year is within valid range (1993-2043)
            if (yr < 1993 || yr > 2043) {
                // Return approximate conversion for out-of-range years
                return this.approximateEngToNep(date);
            }

            const startDateIndex = yr - 1993;
            const startDate = this.startDates[startDateIndex];

            // Calculate days difference
            const diffTime = date.getTime() - startDate.getTime();
            let nds = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            let nepYear;
            if (nds >= 0) {
                nepYear = yr + 57;
            } else {
                nepYear = yr + 56;
                // Get previous year's start date
                const prevStartDate = this.startDates[startDateIndex - 1];
                const prevDiffTime = startDate.getTime() - prevStartDate.getTime();
                nds = nds + Math.floor(prevDiffTime / (1000 * 60 * 60 * 24));
            }

            const nepYearLastTwo = nepYear % 100;
            const yearIndex = nepYearLastTwo - 50;

            if (yearIndex < 0 || yearIndex >= this.ND.length) {
                return this.approximateEngToNep(date);
            }

            let cumulativeDays = 0;
            let nepMonth = 1;
            let nepDay = 1;
            const yearData = this.ND[yearIndex];

            for (let i = 0; i < 12; i++) {
                const monthDays = yearData[i];
                if (nds < cumulativeDays + monthDays) {
                    nepMonth = i + 1;
                    nepDay = nds - cumulativeDays + 1;
                    break;
                }
                cumulativeDays += monthDays;
            }

            const formattedMonth = nepMonth.toString().padStart(2, '0');
            const formattedDay = nepDay.toString().padStart(2, '0');
            const formattedYear = nepYear.toString();

            return `${formattedYear}/${formattedMonth}/${formattedDay}`;
        } catch (error) {
            console.error('Error in engToNep:', error);
            return this.getCurrentNepaliDate();
        }
    }

    approximateEngToNep(date) {
        // Approximate conversion for dates outside 1993-2043 range
        // Based on the pattern that Nepali year = English year + 56/57
        const engYear = date.getFullYear();
        const engMonth = date.getMonth() + 1;
        const engDay = date.getDate();

        // Simple approximation (this is not accurate for historical dates)
        const nepYear = engYear + 57;
        const nepMonth = engMonth; // Approximate month mapping
        const nepDay = engDay; // Approximate day mapping

        // Adjust for month/day boundaries
        let adjustedMonth = nepMonth;
        let adjustedDay = nepDay;

        if (adjustedMonth > 12) {
            adjustedMonth = 12;
        }
        if (adjustedMonth < 1) {
            adjustedMonth = 1;
        }

        // Get days in month for the approximate year
        const yearIndex = (nepYear % 100) - 50;
        if (yearIndex >= 0 && yearIndex < this.ND.length) {
            const daysInMonth = this.ND[yearIndex][adjustedMonth - 1] || 30;
            if (adjustedDay > daysInMonth) {
                adjustedDay = daysInMonth;
            }
        }

        return `${nepYear}/${adjustedMonth.toString().padStart(2, '0')}/${adjustedDay.toString().padStart(2, '0')}`;
    }

    nepToEng(nepDateStr) {
        try {
            if (!nepDateStr || nepDateStr.length !== 10) {
                return new Date();
            }

            const year = parseInt(nepDateStr.substring(0, 4));
            const month = parseInt(nepDateStr.substring(5, 7));
            const day = parseInt(nepDateStr.substring(8, 10));

            const yearLastTwo = year % 100;
            const yearIndex = yearLastTwo - 50;

            if (yearIndex < 0 || yearIndex >= this.ND.length) {
                return this.approximateNepToEng(nepDateStr);
            }

            // Calculate total days from start of Nepali year
            let totalDays = day - 1; // Days are 1-based
            for (let i = 0; i < month - 1; i++) {
                totalDays += this.ND[yearIndex][i];
            }

            // Find corresponding English year
            const engYear = year - 57;
            if (engYear >= 1993 && engYear <= 2043) {
                const startDateIndex = engYear - 1993;
                const startDate = this.startDates[startDateIndex];
                const resultDate = new Date(startDate);
                resultDate.setDate(startDate.getDate() + totalDays);
                return resultDate;
            } else {
                return this.approximateNepToEng(nepDateStr);
            }
        } catch (error) {
            console.error('Error in nepToEng:', error);
            return new Date();
        }
    }

    approximateNepToEng(nepDateStr) {
        // Approximate conversion for Nepali dates outside 2050-2100 range
        const year = parseInt(nepDateStr.substring(0, 4));
        const month = parseInt(nepDateStr.substring(5, 7));
        const day = parseInt(nepDateStr.substring(8, 10));

        const engYear = year - 57; // Approximate conversion
        const engMonth = month - 1; // JavaScript months are 0-based
        const engDay = day;

        return new Date(engYear, engMonth, engDay);
    }

    getCurrentNepaliDate() {
        const today = new Date();
        return this.engToNep(today);
    }

    getMasanta(nepaliYear, month) {
        try {
            const yearLastTwo = nepaliYear % 100;
            const yearIndex = yearLastTwo - 50;

            if (yearIndex >= 0 && yearIndex < this.ND.length && month >= 1 && month <= 12) {
                return this.ND[yearIndex][month - 1];
            }
            return 30; // Default fallback
        } catch (error) {
            return 30;
        }
    }

    getNepaliYear(date) {
        const nepDate = this.engToNep(date);
        return parseInt(nepDate.substring(0, 4));
    }

    getNepaliMonth(date) {
        const nepDate = this.engToNep(date);
        return parseInt(nepDate.substring(5, 7));
    }

    getNepaliDay(date) {
        const nepDate = this.engToNep(date);
        return parseInt(nepDate.substring(8, 10));
    }

    getNepaliMonthName(monthNumber) {
        if (monthNumber < 1 || monthNumber > 12) {
            return '';
        }
        return this.months[monthNumber - 1].name;
    }

    getDayOfWeek(date) {
        const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
        // Convert to Nepali format: 1 = Sunday, 2 = Monday, etc.
        return day === 0 ? 1 : day + 1;
    }

    formatNepaliDate(year, month, day) {
        const formattedMonth = month.toString().padStart(2, '0');
        const formattedDay = day.toString().padStart(2, '0');
        return `${year}/${formattedMonth}/${formattedDay}`;
    }

    // Helper methods from original C# code
    getNepaliMonthNum(date) {
        return this.getNepaliMonth(date);
    }

    getNepaliGate(date) {
        return this.getNepaliDay(date);
    }

    // Additional utility methods
    isValidNepaliDate(dateStr) {
        if (!dateStr || dateStr.length !== 10) return false;

        try {
            const year = parseInt(dateStr.substring(0, 4));
            const month = parseInt(dateStr.substring(5, 7));
            const day = parseInt(dateStr.substring(8, 10));

            if (year < 2050 || year > 2100) return false;
            if (month < 1 || month > 12) return false;

            const daysInMonth = this.getMasanta(year, month);
            return day >= 1 && day <= daysInMonth;
        } catch (error) {
            return false;
        }
    }

    // Parse date string into components
    parseNepaliDate(dateStr) {
        if (!this.isValidNepaliDate(dateStr)) {
            return null;
        }

        return {
            year: parseInt(dateStr.substring(0, 4)),
            month: parseInt(dateStr.substring(5, 7)),
            day: parseInt(dateStr.substring(8, 10))
        };
    }
}

// Create singleton instance
const modDateInstance = new ModDate();
export default modDateInstance;