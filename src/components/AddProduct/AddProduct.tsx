import React, { useState } from "react";
import { Link } from "react-router-dom";

import { addProduct } from "../../service/ApiService";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuth } from "../../contexts/Auth";

interface Product {
  id: number;
  title: string;
}

const AddProductComponent: React.FC = () => {
  const { deslogar } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [newProductData, setNewProductData] = useState({
    title: "",
  });

  const handleAddProduct = async () => {
    const newProduct: Product = {
      id: Date.now(),
      title: newProductData.title,
    };

    if (newProductData.title.trim() === "") {
      console.error("O título do produto não pode estar vazio.");
      return;
    }

    setProducts([...products, newProduct]);

    try {
      const newProductApi = await addProduct(newProduct);
      console.log(
        "Adicionado produto utilizando a api fake, não o adicionará ao servidor.",
        newProductApi
      );
    } catch (error) {
      console.error("Erro ao adicionar produto na API:", error);
    }

    setNewProductData({
      title: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProductData({
      ...newProductData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button variant="text">
        <Link to="/"> Gerenciar produtos </Link>
      </Button>
      <Button onClick={deslogar} variant="text">
        Sair
      </Button>

      <div className="mb-4">
        <TextField
          type="text"
          name="title"
          value={newProductData.title}
          onChange={handleInputChange}
          label="Product title"
        />
      </div>
      <Button variant="contained" onClick={handleAddProduct}>
        Adicionar Produto
      </Button>

      <ul className="mt-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-gray-200 p-4 rounded shadow mb-4 w-64"
          >
            {product.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddProductComponent;
