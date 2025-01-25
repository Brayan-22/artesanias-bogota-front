"use client";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

export type ProductDetailsProps = {
	description: String
}

const ProductDetails: React.FC<ProductDetailsProps>  = ({description}) => {
	return (
		<Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Detalles del producto</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {description}
        </AccordionDetails>
      </Accordion>
	);
};

export default ProductDetails;
