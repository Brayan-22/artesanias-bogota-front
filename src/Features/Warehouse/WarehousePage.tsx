import { Box} from '@mui/material';
import WareHouseDashBoard from './wareHouseDashBoard';
import WarehouseTable from './wareHouseTable';


const WarehousePage = ({}) => {
	return (
		<Box sx={{p:4}}>
			<WareHouseDashBoard/>
			<WarehouseTable/>
		</Box>
	);
};

export default WarehousePage;
