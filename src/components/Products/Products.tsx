import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import { getProducts, getCategories } from "../../service/ApiService";
import ProductCard from "../ProductCard/ProductCard";
import CustomPagination from "../Pagination/Pagination";

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

interface ProductListProps {
  perPage: number;
}

const ProductList: React.FC<ProductListProps> = ({ perPage }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await getProducts(1, 100);
        setTotalPages(Math.ceil(allProducts.length / perPage));

        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        const paginatedData = allProducts.slice(start, end);

        const filteredProducts = filterProducts(paginatedData);
        setProducts(filteredProducts);
      } catch (error) {}
    };

    fetchData();
  }, [currentPage, perPage, searchTerm, selectedCategory]);

  const filterProducts = (data: Product[]) => {
    return data.filter((product) => {
      const searchMatch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());

      const categoryMatch =
        selectedCategory === "" || product.category === selectedCategory;

      return searchMatch && categoryMatch;
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    const selectedCategory = e.target.value as string;
    setSelectedCategory(selectedCategory);
  };

  return (
    <div>
      <div className="flex justify-evenly m-5">
        <TextField
          className="mr-2"
          type="text"
          placeholder="Search by Title or Brand"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FormControl className="w-4/12">
          <InputLabel id="demo-simple-select-label">Categories</InputLabel>
          <Select
            label="Categories"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <MenuItem value="All Categories">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Grid container spacing={2} className="items-stretch">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <div className="flex justify-center m-5">
        <CustomPagination
          page={currentPage}
          onChange={handlePageChange}
          count={9}
        />
      </div>
    </div>
  );
};

export default ProductList;
