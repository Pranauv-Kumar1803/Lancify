import { useEffect, useState } from "react"
import Loader from '../Loader/Loader'
import api from './../../api/axios'

const TransactionsList = () => {
     const [data, setData] = useState(null);
     useEffect(() => {
          api.get('/admin/transaction-analytics').then(e => {
               setData(e.data)
          }).catch(e => console.log(e));
     }, [])
     return (
          !data ? <Loader /> : <></>
     )
}

export default TransactionsList