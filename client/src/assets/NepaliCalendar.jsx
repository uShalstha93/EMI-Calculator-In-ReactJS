import React, { useState, useEffect, useRef } from 'react';
import modDate from './modDate';
import './NepaliCalendar.css';

const NepaliCalendar = ({
    value,
    onChange,
    width = 120,
    placeholder = "Date",
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [nepaliDate, setNepaliDate] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [calendarDays, setCalendarDays] = useState([]);
    const calendarRef = useRef(null);
    const inputRef = useRef(null);

    // Initialize with current date or provided value
    useEffect(() => {
        const initializeDate = () => {
            if (value && modDate.isValidNepaliDate(value)) {
                setNepaliDate(value);
                parseDate(value);
            } else {
                const currentNepali = modDate.getCurrentNepaliDate();
                setNepaliDate(currentNepali);
                parseDate(currentNepali);
                if (onChange) {
                    onChange(currentNepali);
                }
            }
        };

        initializeDate();
    }, [value]);

    const parseDate = (dateStr) => {
        if (dateStr && dateStr.length === 10) {
            try {
                const year = dateStr.substring(0, 4);
                const month = dateStr.substring(5, 7);
                const day = dateStr.substring(8, 10);
                setSelectedYear(year);
                setSelectedMonth(month);
                setSelectedDay(day);
                generateCalendar(year, month, day);
            } catch (error) {
                console.error('Error parsing date:', error);
            }
        }
    };

    const generateCalendar = (year, month, selectedDay) => {
        try {
            const yearNum = parseInt(year);
            const monthNum = parseInt(month);

            // Get first day of the month in English date
            const firstDayEng = modDate.nepToEng(`${year}/${month}/01`);
            const startingDay = modDate.getDayOfWeek(firstDayEng); // 1 = Sunday

            const daysInMonth = modDate.getMasanta(yearNum, monthNum);
            const days = [];

            // Add empty cells for days before the 1st
            for (let i = 1; i < startingDay; i++) {
                days.push({ day: '', isEmpty: true });
            }

            // Add days of the month
            for (let i = 1; i <= daysInMonth; i++) {
                days.push({
                    day: i,
                    isSelected: i === parseInt(selectedDay || 0),
                    isEmpty: false
                });
            }

            setCalendarDays(days);
        } catch (error) {
            console.error('Error generating calendar:', error);
            setCalendarDays([]);
        }
    };

    const handleInputChange = (e) => {
        let value = e.target.value.replace(/[^0-9/]/g, '');

        // Auto-format as user types: YYYY/MM/DD
        if (value.length === 4 && !value.includes('/')) {
            value = value + '/';
        } else if (value.length === 7 && value.split('/').length === 2) {
            value = value + '/';
        }

        // Validate year
        if (value.length >= 4) {
            const year = value.substring(0, 4);
            const yearNum = parseInt(year);
            if (yearNum < 2050 || yearNum > 2099) {
                const currentYear = modDate.getNepaliYear(new Date());
                value = currentYear + value.substring(4);
            }
            setSelectedYear(year);
        }

        // Validate month
        if (value.length >= 7) {
            const month = value.substring(5, 7);
            const monthNum = parseInt(month);
            if (monthNum < 1 || monthNum > 12) {
                const currentMonth = modDate.getNepaliMonth(new Date());
                const formattedMonth = currentMonth.toString().padStart(2, '0');
                value = value.substring(0, 5) + formattedMonth + value.substring(7);
            }
            setSelectedMonth(month);
        }

        // Validate day
        if (value.length === 10) {
            const day = value.substring(8, 10);
            const dayNum = parseInt(day);
            const yearNum = parseInt(value.substring(0, 4));
            const monthNum = parseInt(value.substring(5, 7));
            const daysInMonth = modDate.getMasanta(yearNum, monthNum);

            if (dayNum < 1 || dayNum > daysInMonth) {
                const currentDay = modDate.getNepaliDay(new Date());
                const formattedDay = currentDay.toString().padStart(2, '0');
                value = value.substring(0, 8) + formattedDay;
            }
            setSelectedDay(day);
        }

        setNepaliDate(value);
        if (value.length === 10 && onChange) {
            onChange(value);
            parseDate(value);
        }
    };

    const handleDayClick = (day) => {
        if (day.isEmpty) return;

        const formattedMonth = selectedMonth.padStart(2, '0');
        const formattedDay = day.day.toString().padStart(2, '0');
        const newDate = `${selectedYear}/${formattedMonth}/${formattedDay}`;

        setNepaliDate(newDate);
        setSelectedDay(day.day.toString());

        if (onChange) {
            onChange(newDate);
        }

        setIsOpen(false);

        // Update calendar with selected day
        generateCalendar(selectedYear, selectedMonth, day.day.toString());
    };

    const handleYearChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 4) {
            setSelectedYear(value);
            if (value.length === 4) {
                const yearNum = parseInt(value);
                if (yearNum >= 2050 && yearNum <= 2099) {
                    generateCalendar(value, selectedMonth, selectedDay);
                }
            }
        }
    };

    const handleMonthChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 2) {
            setSelectedMonth(value);
            if (value.length === 2) {
                const monthNum = parseInt(value);
                if (monthNum >= 1 && monthNum <= 12) {
                    generateCalendar(selectedYear, value.padStart(2, '0'), selectedDay);
                }
            }
        }
    };

    const incrementYear = () => {
        let yearNum = parseInt(selectedYear || '2050');
        if (yearNum < 2099) {
            yearNum++;
            const newYear = yearNum.toString();
            setSelectedYear(newYear);
            generateCalendar(newYear, selectedMonth, selectedDay);
        }
    };

    const decrementYear = () => {
        let yearNum = parseInt(selectedYear || '2050');
        if (yearNum > 2050) {
            yearNum--;
            const newYear = yearNum.toString();
            setSelectedYear(newYear);
            generateCalendar(newYear, selectedMonth, selectedDay);
        }
    };

    const incrementMonth = () => {
        let monthNum = parseInt(selectedMonth || '01');
        if (monthNum < 12) {
            monthNum++;
        } else {
            monthNum = 1;
            incrementYear();
        }
        const newMonth = monthNum.toString().padStart(2, '0');
        setSelectedMonth(newMonth);
        generateCalendar(selectedYear, newMonth, selectedDay);
    };

    const decrementMonth = () => {
        let monthNum = parseInt(selectedMonth || '01');
        if (monthNum > 1) {
            monthNum--;
        } else {
            monthNum = 12;
            decrementYear();
        }
        const newMonth = monthNum.toString().padStart(2, '0');
        setSelectedMonth(newMonth);
        generateCalendar(selectedYear, newMonth, selectedDay);
    };

    // This function is for calendar icon button toggle (if needed)
    // const toggleCalendar = () => {
    //     if (!disabled) {
    //         setIsOpen(!isOpen);
    //         if (!isOpen) {
    //             parseDate(nepaliDate);
    //         }
    //     }
    // };

    const handleClickOutside = (event) => {
        if (
            calendarRef.current &&
            !calendarRef.current.contains(event.target) &&
            inputRef.current &&
            !inputRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Week day headers
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    // const weekDaysNepali = ['आ', 'सो', 'मं', 'बु', 'बि', 'शु', 'श'];

    return (
        <div className="nepali-calendar-container">
            <div className="input-container" style={{ width: `${width}px` }}>
                <input
                    ref={inputRef}
                    type="text"
                    className="nepali-date-input"
                    value={nepaliDate}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    maxLength="10"
                    disabled={disabled}
                    onFocus={() => setIsOpen(true)}
                />
                {/* <button
                    className="calendar-button"
                    onClick={toggleCalendar}
                    disabled={disabled}
                    type="button"
                >
                    📅
                </button> */}
            </div>

            {isOpen && (
                <div ref={calendarRef} className="calendar-popup">
                    <div className="calendar-header">
                        <div className="year-control">
                            <input
                                type="text"
                                className="year-input"
                                value={selectedYear}
                                onChange={handleYearChange}
                                maxLength="4"
                            />
                            <div className="year-buttons">
                                <button className="year-btn up" onClick={incrementYear} type="button">▲</button>
                                <button className="year-btn down" onClick={decrementYear} type="button">▼</button>
                            </div>
                        </div>

                        <div className="month-control">
                            <input
                                type="text"
                                className="month-input"
                                value={selectedMonth}
                                onChange={handleMonthChange}
                                maxLength="2"
                            />
                            <div className="month-buttons">
                                <button className="month-btn up" onClick={incrementMonth} type="button">▲</button>
                                <button className="month-btn down" onClick={decrementMonth} type="button">▼</button>
                            </div>
                        </div>
                    </div>

                    <div className="week-days">
                        {weekDays.map((day, index) => (
                            <div key={index} className="week-day">{day}</div>
                        ))}
                    </div>

                    <div className="calendar-grid">
                        {calendarDays.map((dayObj, index) => (
                            <button
                                key={index}
                                className={`calendar-day ${dayObj.isEmpty ? 'empty' : ''} ${dayObj.isSelected ? 'selected' : ''}`}
                                onClick={() => handleDayClick(dayObj)}
                                disabled={dayObj.isEmpty}
                                type="button"
                            >
                                {dayObj.day || ''}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NepaliCalendar;