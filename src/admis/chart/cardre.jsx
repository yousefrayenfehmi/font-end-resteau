import React from 'react'
import './chart.css'
import Chart from 'react-apexcharts';

const Charts = ({data}) => {
    
    const chartOptions = {
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          categories: data.map(item => item.name),
        },
      };
    
      const chartSeries = [
        {
          name: 'Ventes',
          data: data.map(item => item.qts),
        },
      ];
  return (

    <div className='chart'>
        <Chart options={chartOptions} series={chartSeries} type="bar" width="500" />
    </div>
  )
}

export default Charts