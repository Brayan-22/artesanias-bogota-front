import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const InventoryPage = () => {
  return (
    <Box sx={{display:'flex'}}>
      <Outlet/>
    </Box>
  )
}

export default InventoryPage