import { useState, useEffect } from 'react';
import api from '@/config/axios/api';

const useProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchPopularProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('products?limit=5');
      setProducts(response?.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get single product details
  // Get categories products

  useEffect(() => {
    fetchPopularProducts();
  }, []);

  return {
    products,
    loading,
    refetch: fetchPopularProducts
  };
};

export default useProducts;