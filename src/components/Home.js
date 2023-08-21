import React from 'react';
import Container from './Container';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-tailwind/react';
import { ProductCard } from './ProductCard';

const Home = () => {
  return (
    <>
      <div className="bg-[url('https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80')] bg-cover">
        <div className='backdrop-brightness-50'>
          <Container className="flex flex-wrap h-screen">
            <div className="flex items-center w-full h-full">
              <div className="max-w-2xl mb-8">
                <Typography variant="h1" className="" color="white">Lorem ipsum dolor sit</Typography>
                <Typography variant="paragraph" className="py-5" color="white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
                <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
                  <Button className="mt-6 w-max" fullWidth>
                    <Link
                        to="/products"
                        className="px-8 py-4 text-lg font-medium text-center">
                        Shop Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Container className="flex flex-wrap py-20">
        <div className="flex justify-center w-full">
          <Typography variant="h1">Best Sellers</Typography>
        </div>
        <div className='grid grid-cols-3 gap-8'>
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
        <div className="flex justify-center w-full pt-10">
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
