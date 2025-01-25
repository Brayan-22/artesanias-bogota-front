"use client";
import { Box, Container } from '@mui/material';
import React from 'react';
import InventoryTable from './InventoryTable';

export type InventoryPageProps = {
	// types...
}

const InventoryPage: React.FC<InventoryPageProps>  = ({}) => {
	return (
		<Box sx={{p:4}}>
			<InventoryTable/>
		</Box>
	);
};

export default InventoryPage;
