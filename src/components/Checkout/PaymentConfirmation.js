import { Button, Card, IconButton } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';
import {
    CheckIcon
  } from "@heroicons/react/24/outline";

const PaymentConfirmation = (props) => {
    return (
        <div className="flex justify-center w-full gap-10 flex-col lg:flex-row">
            <Card className='lg:p-12 p-6 login_register_shadow lg:mt-20 flex justify-center'>
                <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg">
                        <IconButton 
                            size="lg"
                            variant="text"
                            className="flex rounded-full p-12 bg-green-500 hover:bg-green-500 focus:bg-green-500 pointer-events-none" ripple={false}>
                            <CheckIcon color='white' className="h-12 w-12"></CheckIcon>
                        </IconButton>
                        <p className="text-5xl md:text-7xl lg:text-7xl font-bold tracking-wider pt-10 text-black">Confirmed!!!</p>
                        <p className="text-center text-xl md:text-3xl lg:text-3xl font-bold tracking-wider pt-4 text-black">Thank you for purchase</p>
                        <Link to={'/products'}>
                            <Button className="mt-8">
                                Go to shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default PaymentConfirmation;