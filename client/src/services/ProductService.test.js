import { ProductService } from './ProductService'; // Update the path accordingly
import { v4 as uuidv4 } from 'uuid';

// Mock the uuidv4 function to return a fixed value
jest.mock('uuid');

describe('ProductService', () => {
  
  it('should create a new product', () => {
    const newProduct = {
      name: 'Test Product',
      description: 'Test description',
      price: 50,
      stockQuantity: 5,
      category: 'Test Category'
    };

    const newProductId = 'mocked-uuid';
    uuidv4.mockReturnValue(newProductId);

    ProductService.createProduct(newProduct);

    expect(ProductService.getAllProducts()).toHaveLength(2);
    expect(ProductService.getAllProducts()[1]).toEqual({
      _id: 'mocked-uuid',
      ...newProduct
    });
  });
});
