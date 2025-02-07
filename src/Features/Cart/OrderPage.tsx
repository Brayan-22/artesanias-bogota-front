import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import OrderSumary from './OrderSumary'

const OrderPage = () => {
  return (
    <Box sx={{display:'flex', justifyContent:'center', gap:2}}>
        <Outlet/>
        <OrderSumary/>
    </Box>
  )
}

export default OrderPage