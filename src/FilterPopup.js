// FilterPopup.js
import React, { useEffect, useRef } from "react";
import "./FilterPopup.css";

const FilterPopup = ({
  columnData,
  selectedFilters,
  setSelectedFilters,
  onClose,
  columnName,
}) => {
  const popupRef = useRef();

  const getUniqueValues = (data) => {
    const allValues = data.reduce((acc, value) => {
      // Flatten if value is an array (including nested arrays), and then process each item
      const flatValues = Array.isArray(value) ? value.flat(Infinity) : [value];
      flatValues.forEach((item) => {
        // Handle each item as a string, trimming any whitespace
        if (typeof item === "string" && item.trim() !== "") {
          acc.push(item.trim());
        }
      });
      return acc;
    }, []);

    // Sort the values uniformly
    const sortValues = (a, b) => {
      // Convert both values to lowercase strings for case-insensitive comparison
      const aString = a.toLowerCase();
      const bString = b.toLowerCase();
      return aString.localeCompare(bString);
    };

    // Remove duplicates and sort
    const sortedUniqueValues = [...new Set(allValues)].sort(sortValues);

    return sortedUniqueValues;
  };

  const uniqueValues =
    columnName === "Stream" ? ["Yes", "No"] : getUniqueValues(columnData);
  const handleCheckboxChange = (value) => {
    const updatedFilters = selectedFilters.includes(value)
      ? selectedFilters.filter((filter) => filter !== value)
      : [...selectedFilters, value];
    setSelectedFilters(updatedFilters);
  };
  /*
  const countUniqueStringsInArrayOfArrays = (data, columnName) => {
    // Flatten the array of string arrays into a single array
    const flattenedArray = data.reduce((acc, row) => {
      const arrayValues = row[columnName];
      if (Array.isArray(arrayValues)) {
        acc.push(...arrayValues);
      }
      return acc;
    }, []);

    // Use a Set to find unique values
    const uniqueValues = new Set(flattenedArray);
    return uniqueValues.size;
  };*/

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }

    // Adding click event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Removing event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="filter-popup-overlay">
      <div ref={popupRef} className="filter-popup">
        <div
          className={
            uniqueValues.length <= 2
              ? "filter-popup-centered"
              : columnName === "Team" ||
                columnName === "Proposer" ||
                columnName === "Nouns ID" ||
                columnName === "Sponsor"
              ? "filter-popup-columns-team"
              : "filter-popup-columns"
          }
        >
          {uniqueValues.map((value, index) => (
            <div
              key={index}
              className={columnName === "Proposer" ? "stacked-item" : ""}
            >
              <input
                type="checkbox"
                name="filterOption"
                value={value}
                checked={selectedFilters.includes(value)}
                onChange={() => handleCheckboxChange(value)}
              />
              <label>{value}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
