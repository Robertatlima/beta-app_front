import React, { useState } from "react";
import { editProduct, deleteProduct } from "../../service/ApiService";
import { useAuth } from "../../contexts/Auth";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isAuth } = useAuth();

  const divisionValue = 10;
  const formattedPrice = (price: number) => {
    let transformToReal = price * 5;
    return transformToReal;
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleEditTitle = async () => {
    try {
      const newTitle = prompt("Digite o novo título:");

      if (newTitle) {
        const updatedProduct = await editProduct(product.id, {
          title: newTitle,
        });
        console.log("Produto editado:", updatedProduct);
      }
    } catch (error) {
      console.error("Erro ao editar o título do produto:", error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const deletedProduct = await deleteProduct(product.id);
      console.log("Produto removido:", deletedProduct);
    } catch (error) {
      console.error("Erro ao remover o título do produto:", error);
    }
  };

  return (
    <div
      className={`my-2 min-h-full max-w-sm rounded overflow-hidden shadow-lg relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className={`w-full h-48 object-cover ${
          isHovered
            ? "border border-gray-300 inset-0 bg-gray-300 opacity-50"
            : "border border-transparent"
        }`}
        src={product.thumbnail}
        alt={product.title}
      />
      {isHovered && (
        <>
          <div className="absolute "></div>
          <button className="absolute bottom-70 left-0 right-0 px-6 py-4 bg-red-500 hover:bg-red-700 text-white">
            Ver Mais
          </button>
        </>
      )}
      <div className="px-6 py-4 flex-grow">
        <div className="font-bold text-xl mb-2">{product.title}</div>
        <p className="text-gray-700 text-base">
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </p>
      </div>
      <div className="text-center px-6 py-4">
        <p className="font-bold text-zinc-800 text-2xl my-1.5">
          R$ {formattedPrice(product.price)}
        </p>
        <p className="font-bold text-zinc-800 text-base my-1.5">
          OU {divisionValue}X DE R${" "}
          {formattedPrice(product.price) / divisionValue}
        </p>
      </div>
      {isAuth ? (
        <div className="text-xs flex justify-around ">
          <button
            className="hover:bg-red-500 hover:text-white p-1 rounded"
            onClick={handleEditTitle}
          >
            Editar produto
          </button>
          <button
            className="hover:bg-red-500 hover:text-white p-1 rounded "
            onClick={handleDeleteProduct}
          >
            Remover produto
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ProductCard;
