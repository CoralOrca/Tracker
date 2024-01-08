import React, { useState, useEffect } from "react";
import "./TimeSlider.css"; // Import your CSS file

const TimeSlider = ({ startDate, endDate, onDateChange }) => {
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(600);

  // Calculate the selected start and end dates based on slider positions
  useEffect(() => {
    const totalRange = endDate - startDate;
    const selectedStartDate = new Date(
      startDate.getTime() + (startValue / 600) * totalRange
    );
    const selectedEndDate = new Date(
      startDate.getTime() + (endValue / 600) * totalRange
    );

    // Ensure the two circles never cross each other
    if (selectedStartDate >= selectedEndDate) {
      if (startValue < endValue) {
        setStartValue(endValue);
      } else {
        setEndValue(startValue);
      }
    }

    // You can use selectedStartDate and selectedEndDate as needed
    onDateChange(selectedStartDate, selectedEndDate);
  }, [startValue, endValue, startDate, endDate, onDateChange]);

  return (
    <div className="time-slider">
      <div className="lineTimeline"></div>
      <div
        className="lineTimeRange"
        style={{ left: startValue, width: endValue - startValue }}
      ></div>
      <div
        className="startHandle"
        style={{ left: startValue }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          document.addEventListener("mousemove", handleStartDrag);
          document.addEventListener("mouseup", handleDragEnd);
        }}
      >
        <div className="date-label">
          {new Date(
            startDate.getTime() + (startValue / 600) * (endDate - startDate)
          ).toLocaleDateString()}
        </div>
      </div>
      <div
        className="endHandle"
        style={{ left: endValue }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          document.addEventListener("mousemove", handleEndDrag);
          document.addEventListener("mouseup", handleDragEnd);
        }}
      >
        <div className="date-label">
          {new Date(
            startDate.getTime() + (endValue / 600) * (endDate - startDate)
          ).toLocaleDateString()}
        </div>
      </div>
    </div>
  );

  function handleStartDrag(e) {
    const newValue = Math.min(Math.max(e.clientX - 10, 0), endValue - 10);
    setStartValue(newValue);
  }

  function handleEndDrag(e) {
    const newValue = Math.max(Math.min(e.clientX - 10, 600), startValue + 10);
    setEndValue(newValue);
  }

  function handleDragEnd() {
    document.removeEventListener("mousemove", handleStartDrag);
    document.removeEventListener("mousemove", handleEndDrag);
  }
};

export default TimeSlider;
