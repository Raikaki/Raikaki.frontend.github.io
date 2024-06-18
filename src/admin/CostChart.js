import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Ensure you have chart.js installed

const CostChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  // useEffect(() => {
  //   // Define the API endpoint URL
  //   const revenueApiUrl = '/api/revenue-by-month';

  //   // Fetch data from the API
  //   axios.get(revenueApiUrl).then(response => {
  //     const data = response.data;

  //     // Prepare the data for the chart
  //     const chartData = {
  //       labels: data.labels,
  //       datasets: [
  //         {
  //           label: 'Số tiền thu được (VND)',
  //           data: data.values,
  //           borderColor: 'green',
  //           backgroundColor: 'rgba(0, 128, 0, 0.2)',
  //           fill: true,
  //           tension: 0.5,
  //         },
  //         {
  //           label: 'Số tiền nhập phim (VND)',
  //           data: data.cost,
  //           borderColor: 'red',
  //           backgroundColor: 'rgba(255, 0, 0, 0.2)',
  //           fill: true,
  //           tension: 0.5,
  //         },
  //       ],
  //     };

  //     // Update the state with the fetched data
  //     setChartData(chartData);
  //   }).catch(error => {
  //     console.error("There was an error fetching the revenue data!", error);
  //   });
  // }, []);
  useEffect(() => {
    // Mẫu dữ liệu
    const currentMonth = new Date().getMonth() + 1; // Lấy tháng hiện tại (từ 0 đến 11, nên +1 để thành 1 đến 12)
    const promises = [];

    for (let month = 1; month <= currentMonth; month++) {
      promises.push(axios.get(`http://localhost:8080/admin/userservice/month/${month}`));
    }

    Promise.all(promises)
      .then(responses => {
        const labels = [];
        const datasetData = [];

        responses.forEach((response, index) => {
          labels.push(`Month ${index + 1}`);
          datasetData.push(response.data); // Assuming response.data.amount is the data you need
        });

        const sampleData = {
          labels: labels,
          datasets: [
            {
              label: 'User Service pack Data',
              data: datasetData,
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
            }
          ]
        };

        setChartData(sampleData);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);
  return (
    <div>
      <h2>Cost Chart</h2>
      <Line data={chartData} options={{
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }} />
    </div>
  );
};

export default CostChart;
