import { getColor } from "../hooks/useBarChart";

const BarChart = ({ data, maxValue }) => {
  return (
    <>
      <span className="align-end chart-field">Total</span>
      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          const percentage = ((item?.carbon || 0) / maxValue) * 100;
          const color = getColor(index, data.length);
          return (
            <div key={index} className="chart-row">
              <div className="d-flex g-30 w-100">
                <div className="chart-label f-700">{item.shortName}</div>
                <div className="chart-bar-container">
                  <div
                    className="chart-bar"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
              <div className="chart-value f-700">
                {item?.carbon?.toFixed(3) || 0}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default BarChart;
