import { useEffect, useMemo, useState } from "react";
import axios from "axios";
// get api data from backend
const getChartData = async (currentPage, year) => {
  const response = await axios
    .get(`http://localhost:5000/?page=${currentPage}&year=${year}`)
    .then((response) => response.data);
  return response;
};

// adjust color of chart
export const getColor = (index, total) => {
  const step = 100 / total;
  const colorValue = Math.round(step * (index + 1));
  return `rgba(65, 86, 90, ${colorValue / 100})`;
};
// manage states
const useBarChart = () => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(2020);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // check carbon is greater than 0 for graph style
  const filteredItems = useMemo(
    () => data?.filter((item) => item?.carbon && item?.carbon > 0),
    [data]
  );
  // get percentage to apply as width of div
  const maxValue = useMemo(
    () => Math.ceil(Math.max(...filteredItems.map((item) => item.carbon))),
    [filteredItems]
  );

  useEffect(() => {
    setLoading(true);
    getChartData(currentPage, year)
      .then((response) => {
        const { data, ...pagination } = response;
        setPagination(pagination);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, year]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
// return data to components
  return {
    data,
    pagination,
    loading,
    error,
    maxValue,
    year,
    setYear,
    handlePageChange,
  };
};

export default useBarChart;
