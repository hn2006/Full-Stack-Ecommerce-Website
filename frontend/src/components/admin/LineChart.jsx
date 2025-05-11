import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ chartData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e0e0e0',
          font: {
            size: 14,
            family: 'Arial'
          }
        }
      },
      title: {
        display: true,
        text: '30 DAYS REVENUE TREND',
        color: '#ffffff',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Arial'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#4fc3f7',
        bodyColor: '#ffffff',
        borderColor: '#4fc3f7',
        borderWidth: 1,
        cornerRadius: 5,
        padding: 10,
        displayColors: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#b0b0b0',
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(100,100,100,0.2)',
          drawBorder: false
        }
      },
      y: {
        ticks: {
          color: '#b0b0b0',
          font: {
            size: 12
          },
          callback: function(value) {
            return '₹' + value;
          }
        },
        grid: {
          color: 'rgba(100,100,100,0.2)',
          drawBorder: false
        }
      }
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3,
        fill: 'start'
      },
      point: {
        radius: 5,
        hoverRadius: 7,
        hitRadius: 10
      }
    }
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const labels = [];
  const fielddata = [];

  chartData && chartData.forEach((temp) => {
    labels.push(`${temp._id.day} ${months[temp._id.month-1]}`);
    fielddata.push(temp.amount);
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Daily Revenue',
        data: fielddata,
        borderColor: '#4fc3f7',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(79, 195, 247, 0.6)');
          gradient.addColorStop(1, 'rgba(79, 195, 247, 0.1)');
          return gradient;
        },
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#4fc3f7',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: '#4fc3f7',
        pointHoverBorderColor: '#ffffff',
        fill: true,
        cubicInterpolationMode: 'monotone'
      }
    ],
  };

  return (
    <div style={{
      width: '100%',
      height: '400px',
      padding: '20px',
      background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
      borderRadius: '15px',
      boxShadow: `
        0 10px 20px rgba(0,0,0,0.3),
        0 6px 6px rgba(0,0,0,0.2),
        inset 0 0 10px rgba(79, 195, 247, 0.1)
      `,
      border: '1px solid rgba(79, 195, 247, 0.2)',
      // transform: 'perspective(1000px) rotateX(5deg)',
      transformStyle: 'preserve-3d'
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        transform: 'translateZ(20px)'
      }}>
        <Line options={options} data={data} />
      </div>
      <div style={{
        position: 'absolute',
        bottom: '-10px',
        left: '5%',
        right: '5%',
        height: '10px',
        background: 'rgba(79, 195, 247, 0.1)',
        borderRadius: '50%',
        filter: 'blur(5px)',
        transform: 'rotateX(80deg)',
        zIndex: -1
      }}></div>
    </div>
  );
};

export default LineChart;