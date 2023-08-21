import { v4 as uuidv4 } from 'uuid'; // Import the UUID library

const products = [
    {
      _id: '1',
      name: 'Wooden Sculpture 1',
      description: 'Beautiful handcrafted wooden sculpture.',
      price: 100,
      stockQuantity: 10,
      category: 'Sculptures',
      images: ['image1.jpg', 'image2.jpg'],
      reviews: [
        {
          userId: 'user1',
          rating: 5,
          comment: 'Absolutely stunning work!'
        }
      ]
    },
    {
      _id: '2',
      name: 'Wooden Sculpture 2',
      description: 'Beautiful handcrafted wooden sculpture.',
      price: 100,
      stockQuantity: 10,
      category: 'Sculptures',
      images: ['image1.jpg', 'image2.jpg'],
      reviews: [
        {
          userId: 'user1',
          rating: 5,
          comment: 'Absolutely stunning work!'
        }
      ]
    },
    {
      _id: '3',
      name: 'Wooden Sculpture 3',
      description: 'Beautiful handcrafted wooden sculpture.',
      price: 100,
      stockQuantity: 10,
      category: 'Sculptures',
      images: ['image1.jpg', 'image2.jpg'],
      reviews: [
        {
          userId: 'user1',
          rating: 5,
          comment: 'Absolutely stunning work!'
        }
      ]
    },
    // Add more product objects here
  ];
  
  export const ProductService = {
    getAllProducts: () => {
      return products;
    },
    getProductById: (productId) => {
      return products.find(product => product._id === productId);
    },
    createProduct: (newProduct) => {
        // Generate a unique ID for the new product
        const newProductId = uuidv4();
    
        // Add the generated ID to the new product object
        const productWithId = { ...newProduct, _id: newProductId };
    
        // Add the product to the products array
        products.push(productWithId);
    },
    updateProduct: (productId, updatedProduct) => {
      const index = products.findIndex(product => product._id === productId);
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
      }
    },
    deleteProduct: (productId) => {
      const index = products.findIndex(product => product._id === productId);
      if (index !== -1) {
        products.splice(index, 1);
      }
    }
  };
  