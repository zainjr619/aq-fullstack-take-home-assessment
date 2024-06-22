import React from "react";
import { YEARS } from "../constants/constants";

const ChartMetadata = ({ year, setYear, totalCarbon }) => {
  return (
    <div className="chart-metadata">
      <div className="chart-metadata-col">
        <span className="chart-metadata-label">Year</span>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          {YEARS.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>
      <div className="chart-metadata-col">
        <span className="chart-metadata-label">Global Total</span>
        <span className="chart-metadata-value">{totalCarbon}</span>
      </div>
    </div>
  );
};

export default ChartMetadata;
