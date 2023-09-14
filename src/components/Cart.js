import React, { useEffect, useState } from "react";
import { CartItems, CartService } from "../services/CartService";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(5);
  const [totalAmount, setTotalAmount] = useState(5);

  useEffect(() => {
    const cartObservable = CartItems.subscribe((cartItems) => {
      setShippingFee(5);
      updateCartValue(cartItems);
    });
    return () => cartObservable.unsubscribe();
  }, []);

  const updateCartValue = (cartItems) => {
    setCartItems(JSON.parse(JSON.stringify(cartItems)));
    setSubTotal(getSubTotal(cartItems));
    setTotalAmount(getTotal(cartItems));
  };

  const getSubTotal = (items) => {
    return items ? items.reduce((a, c) => a + c.cartQuantity * c.price, 0) : 0;
  };

  const getTotal = (cartItems) => {
    return getSubTotal(cartItems) + Number(shippingFee);
  };

  const updateCartHandler = (type, index) => {
    if (type === "MINUS" && Number(cartItems[index].cartQuantity) === 1) return;
    cartItems[index].cartQuantity =
      type === "PLUS"
        ? Number(cartItems[index].cartQuantity) + 1
        : Number(cartItems[index].cartQuantity) - 1;
    updateCartValue(cartItems);
    CartService.addCartItem(JSON.parse(JSON.stringify(cartItems)));
  };

  const handleRemoveItem = (index) => {
    cartItems.splice(index, 1);
    updateCartValue(cartItems);
    CartService.addCartItem(JSON.parse(JSON.stringify(cartItems)));
  };

  return (
    <>
      <div className="bg-gray-100 lg:py-20 py-10">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        {(cartItems && cartItems.length > 0) ? (
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {cartItems.map((product, index) => (
                <div
                  key={product._id}
                  product={product}
                  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                >
                  <img
                    src={"/img/" + product?.primary_image}
                    alt={
                      product && product?.name ? product?.name : "Product Name"
                    }
                    className="w-full rounded-lg sm:w-40 w-80 h-24"
                    style={{ minWidth: "80px" }}
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0 flex lg:flex-col justify-between items-center lg:items-start">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                {product && product?.name
                                ? product?.name
                                : "Product Name"}
                            </h2>
                            <p className="mt-1 text-xs text-gray-700 uppercase">
                                {product?.category}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-700 uppercase">
                                ${product?.price}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 flex lg:flex-col justify-between sm:mt-0 sm:flex">
                      <div className="flex items-center">
                        <Button
                          className="cursor-pointer rounded rounded-r-none shadow-none text-sm text-black py-2 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50 bg-blue-100"
                          onClick={() => updateCartHandler("MINUS", index)}
                        >
                          -
                        </Button>
                        <Button className="cursor-auto pointer-events-none rounded-none text-sm shadow-none text-black py-2 px-3.5 hover:shadow-none bg-blue-100">
                          {product?.cartQuantity}
                        </Button>
                        <Button
                          className="cursor-pointer rounded rounded-l-none text-sm text-black shadow-none py-2 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50 bg-blue-100"
                          onClick={() => updateCartHandler("PLUS", index)}
                        >
                          +
                        </Button>
                      </div>
                      <div className="flex gap-2.5 items-center m-0 justify-between">
                        <p className="text-sm">
                          $
                          {Number(product?.cartQuantity) *
                            Number(product?.price)}
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          onClick={() => handleRemoveItem(index)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">${subTotal}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">${shippingFee}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">${totalAmount}</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                Check out
              </button>
            </div>
          </div>
        ) : (
            <div className="px-16 md:px-0 flex items-center justify-center">
                <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
                    <p className="text-6xl md:text-7xl lg:text-7xl font-bold tracking-wider text-gray-300">Oops!!!</p>
                    <p className="text-2xl md:text-3xl lg:text-3xl font-bold tracking-wider text-gray-500 mt-4">Empty Cart</p>
                    <p className="text-gray-500 mt-8 py-2 border-y-2 text-center">No items found in your cart.</p>
                    <Link to={'/products'}>
                        <Button className="mt-4">
                            Go to shopping
                        </Button>
                    </Link>
                </div>
            </div>
        )}
      </div>
    </>
  );
};

export default Cart;
