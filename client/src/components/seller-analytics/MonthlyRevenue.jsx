import { Card, Flex, Select, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { FaAngleDown } from 'react-icons/fa6'

const MonthlyRevenue = ({ data }) => {
    const [obj, setObj] = useState(null);
    const [obj2, setObj2] = useState(null);
    const [years, setYears] = useState([]);

    const preprocess = () => {
        let y = [];
        for (let ye in data.revenueByMonths) {
            y.push(ye);
        }
        setYears(y);
    }

    const func2 = () => {
        let revServ = [];
        for (let key in data?.revenueByServices) {
            revServ.push(data?.revenueByServices[key]);
        }
        data.revServ = revServ;

        const newObj = {
            options: {
                title: {
                    text: 'Revenue by services',
                    align: 'center'
                },
                chart: {
                    id: "basic-bar",
                },
                xaxis: {
                    categories: Object.keys(data?.revenueByServices)
                }
            },
            series: [
                {
                    name: "Revenue in Rupees",
                    data: data?.revServ
                }
            ]
        }

        console.log('new', newObj);

        setObj2({ ...newObj });
    }

    const func = (rev) => {
        setObj({
            series: [{
                name: "Revenue (in Rupees)",
                data: rev
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
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                }
            },
        })
    }

    const handleYears = (e) => {
        console.log('inside years')
        console.log(e.target.value);
        let p = data.revenueByMonths[e.target.value];

        let rev = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let k in p) {
            rev[k] = (p[k]);
        }

        func(rev);
    }

    useEffect(() => {
        console.log(data);

        preprocess();

        let rev = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        func(rev);

        console.log(years);
        func2();
    }, [data])

    return (
        <Flex width={'100%'} direction={{base: 'column', lg: 'row'}} justify={'space-around'} padding={{base: 4, lg: 10}} align={'center'} gap={5}>
            {obj &&
                <Flex style={{ backgroundColor: '#fff', borderRadius: '10px' }} width={{base: '100%', lg: '50%'}} direction={'column'} justify={'center'} align={'center'} padding={5} >
                    <Select icon={<FaAngleDown />} width={{base: '100%', lg: '50%'}} onChange={handleYears} placeholder='Year' >
                        {console.log(years)}
                        {years && Array.from(years).map((y) => {
                            return <option value={y}>{y}</option>
                        })}
                    </Select>
                    {years &&
                        <Chart options={obj.options} series={obj.series} type="line" height={350} width={'100%'} />
                    }
                </Flex>
            }
            {
                obj2 &&
                <Flex style={{ backgroundColor: '#fff', borderRadius: '10px' }} width={{base: '100%', lg: '50%'}} direction={'column'} justify={'center'} align={'center'} padding={5} >
                    <Chart options={obj2?.options} series={obj2?.series} type="bar" width={'100%'} height={350} />
                </Flex>
            }
        </Flex>
    )
}

export default MonthlyRevenue