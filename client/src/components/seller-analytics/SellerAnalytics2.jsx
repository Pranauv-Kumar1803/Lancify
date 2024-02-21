import { Card, CardBody, Flex, Heading, Image, Select, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { FaAngleDown } from 'react-icons/fa6'

const SellerAnalytics2 = ({ data }) => {
    const [obj, setObj] = useState(null);
    const [obj2, setObj2] = useState(null);

    const func2 = () => {
        let timeServ = [];
        for (let key in data?.avgObj) {
            timeServ.push(data?.avgObj[key][1]);
        }
        data.timeServ = timeServ;

        const newObj = {
            options: {
                title: {
                    text: 'Avg Time per Service',
                    align: 'center',
                },
                chart: {
                    id: "basic-bar",
                },
                xaxis: {
                    categories: Object.keys(data?.avgObj)
                }
            },
            series: [
                {
                    name: "Time in Seconds",
                    data: data?.timeServ
                }
            ]
        }

        console.log('new', newObj);

        setObj2({ ...newObj });
    }

    const func = () => {
        let num = [];
        for (let key in data?.orders_by_service) {
            num.push(data?.orders_by_service[key]);
        }
        data.num = num;

        const newObj = {
            options: {
                title: {
                    text: 'No. of Orders per Service',
                    align: 'center',
                },
                chart: {
                    id: "basic-bar",
                },
                xaxis: {
                    categories: Object.keys(data?.orders_by_service)
                }
            },
            series: [
                {
                    name: "Time in Seconds",
                    data: data?.num
                }
            ]
        }

        console.log('new', newObj);

        setObj({ ...newObj });
    }

    useEffect(() => {
        console.log(data);

        func();
        func2();
    }, [data])

    return (
        <Flex width={'100%'} direction={{base: 'column', lg: 'row'}} justify={'center'} padding={{base: 4, lg: 5}} gap={5}>
            {
                obj2 &&
                <Flex style={{ backgroundColor: '#fff', borderRadius: '10px' }} width={{ base: '100%', lg: '50%' }} direction={'column'} justify={'center'} align={'center'} padding={3} >
                    <Chart options={obj2?.options} series={obj2?.series} type="bar" width={'100%'} height={350} />
                </Flex>
            }
            {
                obj &&
                <Flex style={{ backgroundColor: '#fff', borderRadius: '10px' }} width={{ base: '100%', lg: '50%' }} direction={'column'} justify={'center'} align={'center'} padding={3} >
                    <Chart options={obj?.options} series={obj?.series} type="bar" width={'100%'} height={350} />
                </Flex>
            }
        </Flex>
    )
}

export default SellerAnalytics2;