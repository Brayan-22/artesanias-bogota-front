import { Box} from '@mui/material';
import React from 'react';
import InventoryTable from './InventoryTable';
import InventoryDashBoard from './InventoryDashBoard';

export type InventoryPageProps = {
	// types...
}

const InventoryPage: React.FC<InventoryPageProps>  = ({}) => {
	return (
		<Box sx={{p:4}}>
			<InventoryDashBoard/>
			<InventoryTable/>
		</Box>
	);
};

export default InventoryPage;
