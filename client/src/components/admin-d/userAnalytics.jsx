import { Box, Text } from '@chakra-ui/react';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
Chart.register(ArcElement, Tooltip, Legend);

const UserAnalytics = ({ users, sellers }) => {
     const data = {
          labels: ['Sellers', 'Customers'],
          datasets: [
               {
                    data: [sellers.length, users.length - sellers.length],
                    backgroundColor: ['#FF6384', '#36A2EB'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB'],
               },
          ],
     };

     const options = {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
               legend: {
                    display: true,
                    position: 'top',
                    labels: {
                         boxWidth: 15,
                    },
               },
               tooltip: {
                    callbacks: {
                         label: (context) => {
                              const labelIndex = context.dataIndex;
                              const label = data.labels[labelIndex] || '';
                              const value = data.datasets[0].data[labelIndex] || '';
                              return `${label}: ${value} (${((value / data.datasets[0].data.reduce((acc, curr) => acc + curr)) * 100).toFixed(2)}%)`;
                         },
                    },
               },
          },
     };

     return (
          <Box height='36vh' p='4' >
               <Text textAlign='center'>Customers and Sellers</Text>
               <Pie data={data} options={options} />
          </Box>
     );
};

export default UserAnalytics;