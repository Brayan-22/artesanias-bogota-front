import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const CustomerPage = () => {
  return (
    <Box>
        <Outlet/>
    </Box>
  )
}

export default CustomerPage