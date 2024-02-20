import { SimpleGrid } from '@chakra-ui/react';
import React from 'react'
import Chart from 'react-apexcharts'

const MonthlyRevenue = () => {

    const obj = {

        series: [{
            name: "Revenue (in dollars)",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Revenue by Month',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.2
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        },
    };

    const obj2 = {
        options: {
            title: {
                text: 'Revenue by services',
                align: 'center'
            },
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ['service1', 'service2', 'service3', 'service4', 'service5', 'service6', 'service7', 'service8']
            }
        },
        series: [
            {
                name: "Revenue in dollars",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    }

    return (
        <>
            <SimpleGrid spacing={3} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                <Chart options={obj.options} series={obj.series} type="line" height={350} width={'100%'} />
            </SimpleGrid>
            <SimpleGrid spacing={3} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                <Chart options={obj2.options} series={obj2.series} type="bar" width={'100%'} height={350} />
            </SimpleGrid>
        </>
    )
}

export default MonthlyRevenue