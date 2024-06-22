import "../index.css";
import useBarChart from "../hooks/useBarChart";
import Pagination from "./Pagination";
import ChartMetadata from "./ChartMetaData";
import BarChart from "./BarChart";

const BarChartContainer = () => {
  const {
    data,
    error,
    loading,
    maxValue,
    year,
    pagination: paginationData,
    setYear,
    handlePageChange,
  } = useBarChart();

  return (
    <div className="chart">
      <ChartMetadata
        year={year}
        setYear={setYear}
        totalCarbon={paginationData.totalCarbon}
      />
      <div style={{opacity:loading ? 0.2 : 1}} className="chart-graph d-flex flex-col">
        {loading && <p className="status">Loading...</p>}
        {error && <p className="status">Error While fetching data</p>}
        <BarChart data={data} maxValue={maxValue} />
        <Pagination
          loading={loading}
          currentPage={paginationData.currentPage}
          totalPages={paginationData.totalPages}
          totalRecords={paginationData.totalRecords}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BarChartContainer;
