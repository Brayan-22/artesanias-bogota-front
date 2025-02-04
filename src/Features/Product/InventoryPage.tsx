import { Box } from '@mui/material'
import InventoryDashBoard from './InventoryDashBoard'
import { Outlet } from 'react-router-dom'

const InventoryPage = () => {
  return (
    <Box sx={{display:'flex'}}>
      <InventoryDashBoard/>
      <Outlet/>
    </Box>
  )
}

export default InventoryPage