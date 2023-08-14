// ProductDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from '../services/ProductService';

const ProductDetail = () => {
  const { id } = useParams();
  const product = ProductService.getProductById(id);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock Quantity: {product.stockQuantity}</p>
      <p>Category: {product.category}</p>
      {/* Display reviews, images, etc. */}
    </div>
  );
};

export default ProductDetail;
