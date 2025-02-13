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
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({chartData}) => {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '30 days Revenue',
          },
        },
      };
      
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];



      const labels = [0];
      const fielddata=[0];

      chartData&&chartData.map((temp)=>{
        labels.push(`${temp._id.day} ${months[temp._id.month-1]}`);
        fielddata.push(temp.amount);
        return temp;
      })
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Last 30 days Revenue',
            data:fielddata ,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
          }
        ],
      };
  return (
    <div style={{width:'100%',height:'300px',display:'flex',justifyContent:'center',alignItems:'center'}}><Line style={{width:'50%',height:'100%'}} options={options} data={data} /></div>
  )
}

export default LineChart