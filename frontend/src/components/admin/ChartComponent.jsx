import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({titleName,chartdata}) => {

    const randomColour=(num)=>{

        const r=Math.floor(Math.random()*250);
        const g=Math.floor(Math.random()*250);
        const b=Math.floor(Math.random()*250);

        return `rgba(${r},${g},${b},${num})`;
    }

    const labels=[];
    const backgroundColor=[];
    const borderColor=[];
    const fieldData=[];

    chartdata&&chartdata.map((temp)=>{

        labels.push(temp._id);
        fieldData.push(temp.count);
        backgroundColor.push(randomColour(0.3));
        borderColor.push(randomColour(0.7));

        return temp
    })
    const data = {
        labels: labels,
        datasets: [
            {
                data: fieldData,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
            },
        ],
    };
    return (<>
    <h2 key={titleName} style={{fontSize:'2.3rem',color:'white',position:'relative',bottom:'40px',textAlign:'center'}}>{titleName}</h2>
        <div style={{ position: 'absolute', top: '0px' }}><Doughnut data={data} /></div>
        </>
    )
}

export default ChartComponent