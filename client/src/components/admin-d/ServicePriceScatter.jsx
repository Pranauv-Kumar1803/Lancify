import { Text, Box } from '@chakra-ui/react'
import { Scatter } from 'react-chartjs-2';
import { ArcElement, Chart, Legend, Tooltip, registerables } from 'chart.js';
Chart.register(...registerables);

const ServicePriceScatter = ({ data }) => {
     console.log(data)
     const prices = data;
     const scatterData = {
          datasets: [
               {
                    label: 'Service Prices',
                    data: prices.map((price, index) => ({ x: index + 1, y: price })), // Assume x-axis as index+1
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
               },
          ],
     };

     const options = {
          scales: {
               x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                         display: false, // Hide the X-axis title
                    },
               },
               y: {
                    type: 'linear',
                    position: 'left',
                    title: {
                         display: true,
                         text: 'Price',
                    },
               },
          },
     };
     return <Box height='46vh' p='4'>
          <Text textAlign='center' mb='6'>Services & Prices</Text>
          <Scatter data={scatterData} options={options} />
     </Box>
};

export default ServicePriceScatter;
