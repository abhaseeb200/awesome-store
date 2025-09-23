import { useState } from 'react';
import API from '@/config/axios/api';

const useCategory = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [singleCategory, setSingleCategory] = useState(null);

    const getAllCategories = async () => {
        try {
            setLoading(true);
            const response = await API.get('/categories?limit=6');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getSingleCategory = async (id) => {
        try {
            setLoading(true);
            const response = await API.get(`/categories/${id}`);
            setSingleCategory(response.data);
        } catch (error) {
            console.error('Error fetching category:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        categories,
        singleCategory,
        getAllCategories,
        getSingleCategory
    };
};

export default useCategory;
