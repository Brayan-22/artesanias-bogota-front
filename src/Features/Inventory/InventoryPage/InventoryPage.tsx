"use client";
import { Container } from '@mui/material';
import React from 'react';
import { InventoryTable } from '../InventoryTable';

export type InventoryPageProps = {
	// types...
}

const InventoryPage: React.FC<InventoryPageProps>  = ({}) => {
	return (
		<Container>
			<InventoryTable/>
		</Container>
	);
};

export default InventoryPage;
