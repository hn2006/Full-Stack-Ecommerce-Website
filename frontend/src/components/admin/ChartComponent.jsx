import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({ titleName, chartdata }) => {
  // Generate consistent colors based on index
  const generateColor = (index, alpha = 1) => {
    const colors = [
      '#FFEB3B', '#8BC34A', '#FF5722', '#CDDC39',
      '#FFC107', '#FF9800', '#FF3D00', '#00C853',
      '#4CAF50', '#FF4081', '#FF9800', '#FF5252'
    ];
    return `${colors[index % colors.length]}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
  };

  const labels = [];
  const backgroundColor = [];
  const borderColor = [];
  const fieldData = [];

  chartdata?.forEach((item, i) => {
    labels.push(item._id);
    fieldData.push(item.count);
    backgroundColor.push(generateColor(i, 0.6));
    borderColor.push(generateColor(i, 1));
  });

  const total = fieldData.reduce((sum, v) => sum + v, 0);

  const data = {
    labels,
    datasets: [{
      data: fieldData,
      backgroundColor,
      borderColor,
      borderWidth: 2,
      weight: 0.5
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom', // moved legend to bottom
        labels: {
          color: '#e0e0e0',
          font: { size: 12, family: 'Arial' },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30,30,30,0.9)',
        titleColor: '#FFEB3B',
        bodyColor: '#ffffff',
        borderColor: '#FFEB3B',
        borderWidth: 1,
        cornerRadius: 5,
        padding: 10,
        displayColors: true,
        callbacks: {
          label: ctx => {
            const label = ctx.label || '';
            const value = ctx.raw || 0;
            const percent = Math.round((value / total) * 100);
            return `${label}: ${value} (${percent}%)`;
          }
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 0,
        borderRadius: 5,
        borderJoinStyle: 'round'
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'relative',
        width: '100%',
        height: '450px',
        padding: '20px',
        background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
        borderRadius: '15px',
        boxShadow: `
          0 10px 20px rgba(0,0,0,0.3),
          0 6px 6px rgba(0,0,0,0.2),
          inset 0 0 15px rgba(119, 145, 240, 0.1)
        `,
        border: '1px solid rgba(119, 145, 240, 0.1)',
        transform: 'perspective(1000px) rotateX(5deg)',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Title */}
      <h2 style={{
        fontSize: '1.8rem',   // readable size
        color: '#ffffff',     // light color on dark bg
        textAlign: 'center',
        marginBottom: '10px',
        textShadow: '0 2px 4px rgba(119, 145, 240, 0.1)',
        fontWeight: '600',
        letterSpacing: '1px'
      }}>
        {titleName}
      </h2>

      {/* Chart */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100% - 60px)' // leave space for title
      }}>
        <Doughnut data={data} options={options} />
      </div>

      {/* 3D Effect Shadow */}
      <div style={{
        position: 'absolute',
        bottom: '-15px',
        left: '10%',
        right: '10%',
        height: '15px',
        background: 'rgba(119, 145, 240, 0.1)',
        borderRadius: '50%',
        filter: 'blur(8px)',
        transform: 'rotateX(80deg)',
        zIndex: -1
      }} />
    </motion.div>
  );
};

export default ChartComponent;
