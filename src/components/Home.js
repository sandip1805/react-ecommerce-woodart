import React from 'react';
import Container from './Container';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-tailwind/react';
import { ProductCard } from './ProductCard';
import { ProductService } from '../services/ProductService';

const Home = () => {
  const products = ProductService.getAllProducts().slice(0, 3);

  return (
    <>
      <div className="bg-[url('https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80')] bg-cover">
        <div className='backdrop-brightness-50'>
          <Container className="flex flex-wrap lg:h-screen">
            <div className="flex items-center w-full">
              <div className="max-w-2xl lg:my-0 lg:mb-8 my-10">
                <Typography variant="h1" className="lg:text-5xl text-4xl" color="white">Lorem ipsum dolor sit</Typography>
                <Typography variant="paragraph" className="py-5" color="white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
                <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
                  <Button className="mt-6 w-max" fullWidth>
                    <Link
                        to="/products"
                        className="lg:px-8 lg:py-4 px-6 text-lg font-medium text-center">
                        Shop Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Container className="flex flex-wrap lg:py-20 py-10">
        <div className="flex justify-center w-full">
          <Typography variant="h1" className="lg:text-5xl text-4xl">Best Sellers</Typography>
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

export default Home;
