"use client";
import React from 'react';
import styles from './Hero.module.scss';
import { Button, Container } from '@mui/material';
import { Height } from '@mui/icons-material';

export type HeroProps = {
	// types...
}

const Hero: React.FC<HeroProps>  = ({}) => {
	return (
 			<Container className="hero-image" sx={{
				display:'flex',
				justifyContent:'center',
				alignItems:'center',
				height:'100vh',
				width: '100vw'
				}} >
				<Button variant="contained" color='success' >Comprar ahora</Button>
			</Container>
	);
};

export default Hero;
