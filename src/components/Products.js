// Products.js
import React from 'react';
import { Link } from 'react-router-dom';
import { ProductService } from '../services/ProductService';
import { Button, Typography } from '@material-tailwind/react';
import { ProductCard } from './ProductCard';
import Container from './Container';

const Products = () => {
  const products = ProductService.getAllProducts();

  return (
    <>
      <Container className="flex flex-wrap lg:py-20 py-10">
        <div className="flex justify-center w-full">
          <Typography variant="h1" className="lg:text-5xl text-4xl">Products</Typography>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:pt-4'>
          {products.map(product => (
              <ProductCard key={product._id} product={product}/>
          ))}
        </div>
        <div className="flex justify-center w-full lg:pt-10 pt-5">
        <Typography variant="lead">
          <Link to="/products" className="inline-block">
              <Button variant="text" size='lg' className="flex items-center gap-2">
                View More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </Link>
        </Typography>
        </div>
      </Container>
    </>
  );
};

export default Products;
