import axios from 'axios';

// Determine the base URL based on the environment
// In a real app, this would come from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1';
// Assuming backend runs on port 3001, adjust if it's different (e.g., 3000 if that's your backend port)
// My backend is on 3000 from Phase 1, so I'll use that.

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Corrected to 3000 for the backend from Phase 1
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors for handling tokens or global errors here later
// apiClient.interceptors.request.use(config => {
//   const token = /* get token from storage or context */ null;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

// apiClient.interceptors.response.use(response => {
//   return response;
// }, error => {
//   // Handle global errors like 401, 403, 500 etc.
//   // if (error.response && error.response.status === 401) {
//   //   // e.g., redirect to login or refresh token
//   // }
//   return Promise.reject(error);
// });


// Product related API calls
export const getProducts = async (params = {}) => {
  try {
    const response = await apiClient.get('/products', { params });
    return response.data; // Assuming backend returns { count, products }
  } catch (error) {
    console.error('Error fetching products:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Failed to fetch products');
  }
};

export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data; // Assuming backend returns { product }
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error(`Failed to fetch product ${id}`);
  }
};

// Auth related API calls
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data; // Assuming backend returns { token, user, message }
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Login failed');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data; // Assuming backend returns { user, message }
  } catch (error) {
    console.error('Registration error:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Registration failed');
  }
};

// Add more API functions as needed (createProduct, updateProduct, etc.)

export default apiClient; // Exporting the configured instance if direct use is needed elsewhere
                        // But typically, specific service functions are preferred.
