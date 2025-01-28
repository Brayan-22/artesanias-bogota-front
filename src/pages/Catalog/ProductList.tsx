"use client";
import { Box } from '@mui/material';
import React from 'react';
import { Product } from '../../Features/Inventory/Inventory';
import ProductCard from '../../components/ProductCard';

export type ProductListProps = {
	products: Product[]
}

const ProductList: React.FC<ProductListProps>  = ({products}) => {
	return (
		<Box sx={{display:'flex', mb:2, mx:'auto', flexWrap:'wrap', justifyContent:'center'}}>
		{products.map((product) => (
		  <ProductCard key={product.id} product={product} />
		))}
	  </Box>
	);
};

export default ProductList;
