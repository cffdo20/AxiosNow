import axios from "axios";
import { useState } from "react";
import "./styles.css";

const ExampleComponent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      name,
      description,
      price: parseFloat(price),
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/products",
        newProduct
      );
      console.log("Product created:", response.data);
      // Clear form fields
      setName("");
      setDescription("");
      setPrice("");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // const handleDelete = async () => {
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:3001/products/${productId}`
  //     );
  //     console.log("Product deleted:", response.data);
  //     // Clear productId field
  //     setProductId("");
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //   }
  // };

  return (
    <div className="container">
      <h2>Criar novo produto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Nome</label>
          <input
            id="productName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Descrição</label>
          <input
            id="productDescription"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Preço</label>
          <input
            id="productPrice"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Product
        </button>
      </form>

      {/* <h2>Delete Product</h2>
      <div>
        <label>Product ID:</label>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />
        <button onClick={handleDelete}>Delete Product</button>
      </div> */}
    </div>
  );
};

export default ExampleComponent;
