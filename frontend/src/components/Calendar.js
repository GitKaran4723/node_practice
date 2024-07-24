import React, { useState, useEffect, useRef } from 'react';
import '../styles/Calendar.css';

const Calendar = ({ selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const [selectedDay, setSelectedDay] = useState(selectedDate.getDate());
  const daysRef = useRef(null);

  useEffect(() => {
    setCurrentMonth(selectedDate.getMonth());
    setCurrentYear(selectedDate.getFullYear());
    setSelectedDay(selectedDate.getDate());

    if (daysRef.current) {
      const selectedElement = daysRef.current.querySelector('.selected');
      if (selectedElement) {
        const containerWidth = daysRef.current.offsetWidth;
        const elementOffset = selectedElement.offsetLeft;
        const elementWidth = selectedElement.offsetWidth;
        daysRef.current.scrollLeft = elementOffset - containerWidth / 2 + elementWidth / 2;
      }
    }
  }, [selectedDate]);

  const handleDateClick = (day) => {
    const today = new Date();
    
    const currentDate = new Date(currentYear, currentMonth, day);
  
    if (currentDate <= today) {
      const fullDate = new Date(currentYear, currentMonth, day);
      fullDate.setMinutes(fullDate.getMinutes() + fullDate.getTimezoneOffset() + 330); // Convert to IST
      setSelectedDay(day);
      onDateChange(fullDate);
      
    }
  };

  const handleMonthChange = (offset) => {
    const newMonth = currentMonth + offset;
    const newYear = newMonth < 0 ? currentYear - 1 : (newMonth > 11 ? currentYear + 1 : currentYear);
    const adjustedMonth = newMonth < 0 ? 11 : (newMonth > 11 ? 0 : newMonth);

    if (new Date(newYear, adjustedMonth) <= new Date()) {
      setCurrentMonth(adjustedMonth);
      setCurrentYear(newYear);
    }
  };

  const days = Array.from(
    { length: new Date(currentYear, currentMonth + 1, 0).getDate() },
    (_, i) => i + 1
  );

  const today = new Date();

  return (
    <div className="calendar">
      <div className="calendar-month">
        <button
          onClick={() => handleMonthChange(-1)}
          disabled={new Date(currentYear, currentMonth - 1) > today}
        >
          ‹
        </button>
        <span>
          {new Date(currentYear, currentMonth).toLocaleString('default', {
            month: 'long',
          })}{' '}
          {currentYear}
        </span>
        <button
          onClick={() => handleMonthChange(1)}
          disabled={new Date(currentYear, currentMonth + 1) > today}
        >
          ›
        </button>
      </div>
      <div className="calendar-days" ref={daysRef}>
        {days.map((day) => {
          const isDisabled = new Date(currentYear, currentMonth, day) > today;
          return (
            <div
              key={day}
              className={`calendar-day ${day === selectedDay ? 'selected' : ''}`}
              onClick={() => !isDisabled && handleDateClick(day)}
              style={{ cursor: isDisabled ? 'not-allowed' : 'pointer', color: isDisabled ? '#ccc' : 'inherit' }}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
