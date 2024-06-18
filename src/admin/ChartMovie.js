import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ChartMovie = () => {
  const [topViewMoviesMonth, setTopViewMoviesMonth] = useState([]);
  const [topViewMoviesYear, setTopViewMoviesYear] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // Fetch data for the year chart
        const yearResponse = await axios.get("http://localhost:8080/admin/movies/viewed/year/top5");
        setTopViewMoviesYear(yearResponse.data);

        // Fetch data for the month chart
        const monthResponse = await axios.get("http://localhost:8080/admin/movies/viewed/month/top5");
        setTopViewMoviesMonth(monthResponse.data);

      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  const prepareChartData = (data) => {
    return data.map((movie) => ({
      name: movie.name,
      y: movie.views.length
    }));
  };

  const drawChart = (title, seriesData) => {
    return {
      chart: {
        type: "pie",
      },
      title: {
        text: title
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.y}</b>",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.y}",
            distance: 0,
          },
        },
      },
      series: [
        {
          name: title,
          data: seriesData,
          colors: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
          ],
        },
      ],
    };
  };

  return (
    <div style={{ display: "flex", alignSelf: "auto"}}>
      <div style={{width: '300px', margin: '0 10px'}}>
        <HighchartsReact 
          highcharts={Highcharts}
          options={drawChart(
            "Tháng/Lượt xem: ",
            prepareChartData(topViewMoviesMonth)  
          )}
        />
      </div>
      <div style={{width: '300px', margin: '0 10px'}}>
        <HighchartsReact  
          highcharts={Highcharts}
          options={drawChart(
            "Năm/Lượt xem: ",
            prepareChartData(topViewMoviesYear)
          )}
        />
      </div>
    </div>
  );
};

export default ChartMovie;
