import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Product } from '../Features/Products/Products';
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, description, price } = product;

  return (
    <Card className='mx-1 my-1' style={{ width: '18rem' }}>

      
      <Card.Img  variant="top" src="/src/assets/images/product1.jpg" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>${price}.00</Card.Text>
        <Button variant="light">ver más</Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;
