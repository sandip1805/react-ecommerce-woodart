import { ErrorMessage } from "@hookform/error-message";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CartItems } from "../services/CartService";

const ShippingInfo = (props) => {
  const [cartItems, setCartItems] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const cartObservable = CartItems.subscribe((cartItems) => {
      updateCartValue(cartItems);
    });
    return () => cartObservable.unsubscribe();
  }, []);

  const updateCartValue = (cartItems) => {
    setCartItems(JSON.parse(JSON.stringify(cartItems)));
  };

  const handleShippingSubmit = (data) => {
    props.shippingCallback(data);
    // Add logic here to send the form data to a server, store in a database, etc.
  };

  const whiteSpaceValidation = async (value) => {
    return !!value.trim();
  };

  return (
    <>
      <div className="flex justify-between w-full gap-10">
        <Card
          color="transparent"
          shadow={false}
          className="lg:p-12 p-8 login_register_shadow lg:mt-20 w-full"
        >
          <Typography variant="h4" color="blue-gray" className="text-center">
            Shipping Address
          </Typography>
          <Typography color="gray" className="mt-1 font-normal text-center">
            Enter your shipping address details.
          </Typography>
          <form
            className="mt-8 mb-2"
            onSubmit={handleSubmit(handleShippingSubmit)}
          >
            <div className="mb-4 flex flex-col">
              <div>
                <Input
                  required
                  type="text"
                  size="lg"
                  label="Name"
                  autoComplete="off"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "⚠ Name is required to continue.",
                    },
                    validate: whiteSpaceValidation,
                  })}
                />
                <span className="flex justify-start text-left input_field_error">
                  <p className="text-red text-sm font-medium">
                    <ErrorMessage errors={errors} name="name" />
                  </p>
                  {errors.name && errors.name.type === "validate" && (
                    <p className="text-red text-sm font-medium">
                      ⚠ Name is required to continue.
                    </p>
                  )}
                </span>
              </div>
            </div>
            <div className="mb-4 flex flex-col">
              <div>
                <Input
                  required
                  size="lg"
                  label="Email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "⚠ Email is required to continue.",
                    },
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "⚠ Please enter a valid Email",
                    },
                  })}
                />
                <span className="flex justify-start text-left input_field_error">
                  <p className="text-red text-sm font-medium">
                    <ErrorMessage errors={errors} name="email" />
                  </p>
                </span>
              </div>
            </div>
            <Button
              type="submit"
              className="mt-6"
              fullWidth
              onClick={handleSubmit(handleShippingSubmit)}
            >
              Submit
            </Button>
          </form>
        </Card>
        <Card
          color="transparent"
          shadow={false}
          className="lg:p-12 p-8 login_register_shadow lg:mt-20 w-full"
        >
          <Typography variant="h4" color="blue-gray" className="text-center">
            Order Summary
          </Typography>
          {cartItems.map((product, index) => (
              <div
                key={product._id}
                product={product}
                className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
              >
                <img
                  src={"/img/" + product?.primary_image}
                  alt={product && product?.name ? product?.name : "Product Name"}
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
                  <div className="mt-4 flex lg:flex-col justify-between items-end sm:mt-0 sm:flex">
                    <div className="flex gap-2.5 items-center m-0 justify-between">
                      <Typography variant="h6">Qty: </Typography>
                      <p className="text-sm">
                        {Number(product?.cartQuantity)}
                      </p>
                    </div>
                    <div className="flex gap-2.5 items-center m-0 justify-between">
                      <p className="text-sm">
                        ${Number(product?.cartQuantity) * Number(product?.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Card>
      </div>
    </>
  );
};

export default ShippingInfo;
