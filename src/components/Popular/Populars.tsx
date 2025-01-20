import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectAllProducts } from '../../Features/Products/Products'
import ProductCard from '../ProductCard/ProductCard'


const Populars = () => {
  const products = useAppSelector(selectAllProducts)
  return (
    <section className='mt-5'>
        <h2 className='ms-5'>PRODUCTOS POPULARES</h2>
        <div className='d-flex justify-content-center mt-3'>
        {products.map(prodct => (
            <ProductCard key={prodct.id} product={prodct}/>
        ))}

        </div>
    
    </section>
  )
}

export default Populars