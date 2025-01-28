import axios from "axios";
import { useState } from "react";
import "./styles.css";

const ExampleComponent = () => {
  // Estados para criação de produtos
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // Estados para busca de produtos
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Função para criar produto
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
      // Limpa os campos do formulário
      setName("");
      setDescription("");
      setPrice("");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // Função para buscar produtos (filtro no front-end)
  const handleSearch = async () => {
    try {
      // Obtém todos os produtos
      const response = await axios.get("http://localhost:3001/products");

      // Filtra localmente pelo nome
      const filteredProducts = response.data.filter((product: any) =>
        product.name.toLowerCase().includes(searchName.toLowerCase())
      );

      setSearchResults(filteredProducts);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
    }
  };

  return (
    <div className="container">
      {/* Seção de criação de produto */}
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
          Criar Produto
        </button>
      </form>

      {/* Seção de busca de produtos */}
      <div className="search-section">
        <h2>Buscar Produtos</h2>
        <div className="form-group">
          <label htmlFor="searchName">Nome do Produto</label>
          <input
            id="searchName"
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="form-control"
            placeholder="Digite parte do nome"
          />
        </div>
        <button
          type="button"
          onClick={handleSearch}
          className="btn btn-secondary"
        >
          Buscar
        </button>

        {/* Exibição dos resultados */}
        {searchResults.length > 0 && (
          <div className="search-results mt-3">
            <h3>Resultados ({searchResults.length})</h3>
            <div className="list-group">
              {searchResults.map((product) => (
                <div key={product.id} className="list-group-item">
                  <h5 className="mb-1">{product.name}</h5>
                  <p className="mb-1">{product.description}</p>
                  <small>Preço: R$ {product.price.toFixed(2)}</small>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExampleComponent;
