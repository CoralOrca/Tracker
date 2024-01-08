import React, { useState } from "react";
import "./DatePicker.css"; // Import the CSS for styling

const DatePicker = ({ onDateChange }) => {
  const handleStartDateChange = (e) => {
    // Update the start date and call the passed function
    setStartDate(e.target.value);
    onDateChange(e.target.value, endDate);
  };

  const handleEndDateChange = (e) => {
    // Update the end date and call the passed function
    setEndDate(e.target.value);
    onDateChange(startDate, e.target.value);
  };

  const [startDate, setStartDate] = useState("2021-10-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <div className="date-picker-container">
      <div className="date-picker">
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min="2021-10-01"
        />
      </div>
      <div className="date-picker">
        <p> ... </p>
      </div>
      <div className="date-picker">
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
        />
      </div>
    </div>
  );
};

export default DatePicker;
