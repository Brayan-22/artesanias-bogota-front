"use client";
import { Box } from '@mui/material';
import React from 'react';

export type ProductGalleryProps = {
	image: string
}

const ProductGallery: React.FC<ProductGalleryProps>  = ({image}) => {
	return (
		<Box>
			<img src={image} style={{width:'80%', height:"50%"}} alt="" />
		</Box>
	);
};

export default ProductGallery;
