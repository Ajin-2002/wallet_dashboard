import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import "./WalletChart.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function WalletChart() {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetch('http://localhost:4000/api/wallet/chart-data')
      .then(res => res.json())
      .then(data => {
        const labels = Object.keys(data).slice(-30);
        const values = Object.values(data).slice(-30);
        setChartData({
          labels,
          datasets: [
            {
              label: 'Balance',
              data: values,
              backgroundColor: '#00ff99',
              borderRadius: 4,
              barThickness: 8,
              borderSkipped: false
            }
          ]
        });
      })
      .catch(err => console.error("Error loading chart:", err));
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 10,
        titleColor: '#fff',
        bodyColor: '#00ff99',
        borderColor: '#00ff99',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        display: false,
        grid: { display: false }
      },
      x: {
        display: true,
        grid: { display: false },
        ticks: { 
          color: '#666', 
          font: { size: 12 }
        }
      }
    }
  };

  return (
    <div className="wallet-chart">
      <div className="chart-header">
        <h3>Overall Wallet Chart</h3>
        <button className="menu-btn">⋮</button>
      </div>
      <p className="chart-subtitle">Showing your wallet balances over time</p>
      <div className="chart-container">
        {Object.keys(chartData).length > 0 && <Bar data={chartData} options={options} />}
      </div>
    </div>
  );
}

export default WalletChart;