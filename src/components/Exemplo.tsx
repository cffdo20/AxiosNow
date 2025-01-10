import { useState } from 'react';
import axios from 'axios';
import './styles.css';

const ExampleComponent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      name,
      description,
      price: parseFloat(price)
    };

    try {
      const response = await axios.post('http://localhost:3001/products', newProduct);
      console.log('Product created:', response.data);
      // Clear form fields
      setName('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default ExampleComponent;