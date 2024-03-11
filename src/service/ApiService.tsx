const baseUrl = "https://dummyjson.com";

interface Product {
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
}

interface ApiResponse {
  products: Product[];
}

export const getProducts = async (
  page: number,
  perPage: number
): Promise<Product[]> => {
  try {
    const apiUrl = `${baseUrl}/products`;
    const response = await fetch(apiUrl);
    const data: ApiResponse = await response.json();

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedData = data.products.slice(start, end);

    return paginatedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const apiUrl = `${baseUrl}/products/categories`;
    const response = await fetch(apiUrl);
    const data: string[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const addProduct = async (
  newProductData: Partial<Product>
): Promise<Product> => {
  try {
    const response = await fetch(`${baseUrl}/products/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProductData),
    });

    const newProduct: Product = await response.json();
    return newProduct;
  } catch (error) {
    console.error("Erro ao adicionar novo produto:", error);
    throw error;
  }
};

export const editProduct = async (
  productId: number,
  updatedData: Partial<Product>
): Promise<Product> => {
  try {
    const response = await fetch(`${baseUrl}/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    const editedProduct: Product = await response.json();
    return editedProduct;
  } catch (error) {
    console.error("Erro ao editar produto:", error);
    throw error;
  }
};

export const deleteProduct = async (
  productId: number
): Promise<{ product: Product }> => {
  try {
    const response = await fetch(`${baseUrl}/products/${productId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar produto");
    }

    const deletedProduct: {
      product: Product;
    } = await response.json();

    return deletedProduct;
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    throw error;
  }
};
