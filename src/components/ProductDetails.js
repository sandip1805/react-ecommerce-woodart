// ProductDetail.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from '../services/ProductService';
import { Button, Chip, Typography } from '@material-tailwind/react';

const ProductDetail = () => {
  const { id } = useParams();
  const product = ProductService.getProductById(Number(id));
  console.log(product);

  const [value, setValue] = useState(0);
  const [largeImage, setLargeImage] = useState(product.primary_image);
  const [modal, setModal] = useState(true);
  const [qty, setQty] = useState(0);

  const fixedPrice = product.price.toFixed(2);

  const decrease = () => {
    if (qty === 0) {
      return;
    }
    setQty((prev) => prev - 1);
  };

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  const goBack = () => {
    value === 0 ? setValue(0) : setValue(value - 1);
    value === 0 ? setLargeImage(product.images[0]) : setLargeImage(product.images[value - 1]);
  };

  const goForward = () => {
    value === product.images.length - 1
      ? setValue(product.images.length - 1)
      : setValue(value + 1);
    value === product.images.length - 1
      ? setLargeImage(product.images[product.images.length - 1])
      : setLargeImage(product.images[value + 1]);
  };

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <main>
      <div className="main-wrapper flex flex-col md:flex-row md:px-[200px] md:py-[100px] relative">
        <div className="image md:basis-1/2 md:flex md:flex-col md:justify-between">
          <div className="hidden md:block large-image">
            <img
              onClick={toggleModal}
              className="object-cover cursor-pointer rounded-xl w-[400px] h-[400px]"
              src={"/img/" + largeImage}
              alt="snekers"
            />
          </div>
          <div className="md:hidden large-image">
            <img
              onClick={goBack}
              className="bg-white rounded-full p-4 absolute top-[15%] left-6 cursor-pointer"
              src="/img/icons/icon-previous.svg"
              alt="go-back"
            />
            <img
              className="w-[100%] h-[300px] object-cover"
              src={"/img/" + largeImage}
              alt="snekers"
            />
            <img
              onClick={goForward}
              className="bg-white rounded-full p-4 absolute top-[15%] left-[82%] cursor-pointer"
              src="/img/icons/icon-next.svg"
              alt="go-forward"
            />
          </div>
          <div className="small-images hidden md:flex mt-7 gap-4 w-[400px]">
            {product.images.map((img, idx) => {
              return (
                <div key={idx} className="single-image">
                  <img
                    onClick={() => setLargeImage(img)}
                    className="w-[80px] cursor-pointer rounded-xl transition-all hover:border-[3px] border-orange h-24 object-cover object-center"
                    src={"/img/" + img}
                    alt="product"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`${
            modal ? "hidden" : "hidden md:block"
          } absolute -top-[20%] right-0 -bottom-[20%] left-0 bg-lightBlack z-10`}
        >
          <div
            className={
              "basis-1/2 flex flex-col justify-between absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
            }
          >
            <div className="large-image">
              <img
                className="w-[400px] h-[400px] rounded-xl cursor-pointer"
                src={"/img/" + largeImage}
                alt="snekers"
              />
              <img
                onClick={toggleModal}
                className="w-[20px] h-[20px] absolute -top-8 left-[95%] transition-all cursor-pointer"
                src="/img/icons/icon-close-white.svg"
                alt="close-icon"
              />
              <img
                onClick={goBack}
                className="bg-white p-4 rounded-full absolute top-[36%] -translate-x-[20px] cursor-pointer transition-all"
                src="/img/icons/icon-previous.svg"
                alt="previous"
              />
              <img
                onClick={goForward}
                className="bg-white p-4 rounded-full absolute top-[36%] left-[95%] cursor-pointer transition-all"
                src="/img/icons/icon-next.svg"
                alt="next"
              />
            </div>
            <div className="small-images flex mt-7 gap-4 w-[400px]">
              {product.images.map((img, idx) => {
                return (
                  <div key={idx} className="single-image">
                    <img
                      onClick={() => setLargeImage(img)}
                      className="w-[80px] cursor-pointer rounded-xl transition-all hover:border-[3px] border-orange h-24 object-cover object-center"
                      src={"/img/" + img}
                      alt="product"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="description p-6 md:basis-1/2 md:py-[40px]">
          <Typography variant="h6" color="blue" textGradient className="uppercase mb-4">
            {product.category}
          </Typography>
          <h1 className="text-3xl md:text-4xl capitalize font-[700] mb-4">
            {product.name}
          </h1>
          <Typography variant="paragraph" className="mb-4">
            {product.description}
          </Typography>

          <div className="price flex items-center">
            <span className="text-3xl font-[700] mr-4">${fixedPrice}</span>
            <Chip value="50%" variant='ghost' className='bg-blue-50'/>
            <p className="md:hidden line-through text-grayishBlue font-[700] translate-x-[50px] lg:mb-2">
              ${fixedPrice}
            </p>
          </div>
          <p className="hidden md:block line-through text-grayishBlue font-[700] mt-2">
            ${fixedPrice}
          </p>

          <div className="buttons-container flex flex-col md:flex-row mt-8">
            <div className="state w-[100%] flex justify-around md:justify-center items-center space-x-10 bg-blue-50 rounded-lg p-3 md:p-2 md:mr-4 md:w-[150px]">
              <button
                onClick={decrease}
                className="minus text-[24px] md:text-[20px] font-[700] text-orange transition-all hover:opacity-50"
              >
                -
              </button>
              <p className="md:text-[14px] font-bold">{qty}</p>
              <button
                onClick={() => setQty((prev) => prev + 1)}
                className="plus text-[24px] md:text-[20px] font-[700] text-orange transition-all hover:opacity-50"
              >
                +
              </button>
            </div>
            <Button className="add-btn border-none rounded-lg text-white font-[700] px-[70px] py-[18px] mt-4 md:mt-0 md:py-0 md:text-[14px] transition-all btn-shadow">
              <img
                className="inline-block -translate-x-2 -translate-y-[2px] h-[15px]"
                src="/img/icons/icon-cart-white.svg"
                alt="cart-icon"
              />
              &nbsp;Add to cart
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
