// Products.js
import React from 'react';
import { Link } from 'react-router-dom';
import { ProductService } from '../services/ProductService';

const Products = () => {
  const products = ProductService.getAllProducts();

  return (
    <div>
      <h2>Products</h2>
      <div className="product-list">
        {products.map(product => (
          <div className="product-card" key={product._id}>
            <Link to={`/products/${product._id}`}>
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Stock Quantity: {product.stockQuantity}</p>
              <p>Category: {product.category}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
