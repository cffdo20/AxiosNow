import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const DataTable: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:3001/products"
        );
        setData(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const filteredData = data.filter((product) =>
    product.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="search-input"
      />
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
