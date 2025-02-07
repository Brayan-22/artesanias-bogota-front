import { Box, Button } from '@mui/material'
import { useAppDispatch } from '../app/hooks'
import { setTestMode } from '../Features/Authentication/AuthSlice'

const TestNavbar = () => {
    const dispatch = useAppDispatch()

    const handleNavBarType = (testMode: "guest" | "customer" | "admin" | "manager") =>{
        dispatch(setTestMode({mode: testMode}))
    }

  return (
    <Box display={'flex'}>
        <Button onClick={()=>handleNavBarType("guest")} >Guest Mode</Button>
        <Button onClick={()=>handleNavBarType("customer")} >Customer Mode</Button>
        <Button onClick={()=>handleNavBarType("admin")} >Store Admin Mode</Button>
        <Button onClick={()=>handleNavBarType("manager")} >Manager Mode</Button>
    </Box>
  )
}

export default TestNavbar