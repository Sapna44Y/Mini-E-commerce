import { useState, useEffect, useMemo } from "react";
import { createProduct, getProducts } from "../services/api";

const contextualMatch = (query, product) => {
  const queryWords = query.toLowerCase().split(/\s+/);
  const productText = `${product.name} ${product.description}`.toLowerCase();

  const contextualKeywords = {
    sit: ["sofa", "chair", "bench", "seat", "couch"],
    sleep: ["bed", "mattress", "cot"],
    work: ["desk", "table", "chair", "monitor"],
    family: ["large", "big", "sectional", "set", "multiple"],
    wood: ["oak", "teak", "pine", "mahogany", "timber"],
  };

  if (queryWords.some((word) => productText.includes(word))) {
    return true;
  }

  for (const [context, matches] of Object.entries(contextualKeywords)) {
    if (queryWords.includes(context)) {
      return matches.some((keyword) => productText.includes(keyword));
    }
  }

  return false;
};

const useProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setAllProducts(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return allProducts;

    const query = searchQuery.toLowerCase().trim();
    return allProducts.filter(
      (product) =>
        contextualMatch(query, product) ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }, [allProducts, searchQuery]);

  const addProduct = async (productData) => {
    try {
      setLoading(true);
      await createProduct(productData);
      await fetchProducts();
      return true;
    } catch (err) {
      setError("Failed to add product");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products: filteredProducts,
    allProducts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    addProduct,
    fetchProducts,
  };
};

export default useProducts;
