import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { setCredentials } from '../Authentication/AuthSlice'
import { useAppDispatch } from '../../app/hooks'

const CustomerPage = () => {
   const dispatch = useAppDispatch()
  
    dispatch(setCredentials({
      rol: "CLIENT",
      id: "1",
       token: ""
    }))
  return (
    <Box>
        <Outlet/>
    </Box>
  )
}

export default CustomerPage