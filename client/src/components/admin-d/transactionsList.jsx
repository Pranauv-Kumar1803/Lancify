import { useEffect, useState } from "react"
import Chart from "react-apexcharts";
import Loader from '../Loader/Loader'
import api from '../../api/axios'

const TransactionsList = () => {
     const [data, setData] = useState(null);

     const [chartState, setChartState] = useState({ x: null, data: null });
     const buildChart = (years, month) => {
          return ({
               options: {
                    chart: {
                         id: "Year-Month Customer Money Spent"
                    },
                    xaxis: {
                         categories: years
                    }
               },
               series: [
                    {
                         name: "Money Spent by All customers in RS",
                         data: month
                    }
               ]
          });
     }
     console.log(chartState.x, chartState.data)

     useEffect(() => {
          api.get('/admin/transaction-analytics').then(e => {
               setData(e.data.plot)
               setChartState({ x: e.data.plot.years, data: e.data.plot.money })
          }).catch(e => console.log(e));
     }, [])
     // 
     return (
          !data ? <Loader /> : <Chart options={buildChart(chartState.x, chartState.data).options} type="bar" series={buildChart(chartState.x, chartState.data).series} height='500' width='500'></Chart>
     )
}

export default TransactionsList