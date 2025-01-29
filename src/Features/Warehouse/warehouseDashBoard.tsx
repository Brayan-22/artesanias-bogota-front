import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const WareHouseDashBoard = () => {
  const navigate = useNavigate()
  return (
    <Box sx={{display:'flex', justifyContent:'flex-end', mb:2}}> 
      <Box>

      </Box>
      <Box sx={{display:'flex'}}>
        <Button variant='contained' sx={{mr:1}} onClick={() => navigate(`createProduct`)}>Add Product</Button>
      </Box>

    </Box>
  )
}

export default WareHouseDashBoard;