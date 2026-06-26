// API utility for making requests to the backend using axios

import axios from 'axios';

// Determine API base URL. 
// 1. RAW_URL: The exact value from env (cleaned of trailing slashes)
const RAW_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000/api').replace(/\/+$/, '');

// 2. API_BASE_URL: The base for axios (e.g., https://domain.com/api)
// Intelligent detection: If env already has /api, don't append it again.
export const API_BASE_URL = RAW_URL.endsWith('/api') ? RAW_URL : RAW_URL ? `${RAW_URL}/api` : '/api';

// 3. BASE_URL: The domain root for assets (e.g., https://domain.com)
// Always strip /api from the end for asset path construction.
export const BASE_URL = RAW_URL.replace(/\/api$/, '') || '';

// Utility function to get asset URLs (images, files, etc.)
export const getAssetUrl = path => {
  if (!path) return '';
  if (path.startsWith('http')) return path;

  // Ensure path starts with a slash for proper URL construction
  const sanitizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${sanitizedPath}`;
};

// Create axios instance with default config
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor
axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  // Handle errors globally
  if (error.response) {
    // Server responded with error status
    console.error(`API Error [${error.config?.url}]:`, error.response.data);
  } else if (error.request) {
    // Request was made but no response received
    console.error(`API Error [${error.config?.url}]: No response received`);
  } else {
    // Something else happened
    console.error(`API Error [${error.config?.url}]:`, error.message);
  }
  return Promise.reject(error);
});
async function apiRequest(endpoint, method = 'GET', data) {
  try {
    const response = await axiosInstance.request({
      url: endpoint,
      method,
      data
    });
    // Wrap Django responses to match legacy { success, data } format
    if (response.data && response.data.success === undefined) {
      return { success: true, data: response.data };
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message || 'Request failed';
      throw new Error(errorMessage);
    }
    throw error;
  }
}

// Page API functions
export const pageApi = {
  // Get page by ID (e.g., 'home', 'career', 'about')
  get: async pageId => {
    return apiRequest(`/pages/${pageId}`, 'GET');
  },
  // Get all pages
  list: async () => {
    return apiRequest('/pages', 'GET');
  },
  // Create a new page
  create: async pageData => {
    return apiRequest('/pages', 'POST', pageData);
  },
  // Update an existing page
  update: async (pageId, pageData) => {
    return apiRequest(`/pages/${pageId}`, 'PUT', pageData);
  },
  // Delete a page
  delete: async pageId => {
    return apiRequest(`/pages/${pageId}`, 'DELETE');
  }
};

// Career/Job Posting API functions
export const careerApi = {
  list: async () => {
    return apiRequest('/careers', 'GET');
  },
  get: async id => {
    return apiRequest(`/careers/${id}`, 'GET');
  },
  create: async jobData => {
    return apiRequest('/careers/', 'POST', jobData);
  },
  update: async (id, jobData) => {
    return apiRequest(`/careers/${id}/`, 'PUT', jobData);
  },
  delete: async id => {
    return apiRequest(`/careers/${id}`, 'DELETE');
  }
};

// Service API functions
export const serviceApi = {
  list: async () => {
    return apiRequest('/services', 'GET');
  },
  get: async id => {
    return apiRequest(`/services/${id}`, 'GET');
  },
  create: async serviceData => {
    return apiRequest('/services', 'POST', serviceData);
  },
  update: async (id, serviceData) => {
    return apiRequest(`/services/${id}`, 'PUT', serviceData);
  },
  delete: async id => {
    return apiRequest(`/services/${id}`, 'DELETE');
  }
};

// Portfolio API functions
export const portfolioApi = {
  list: async () => {
    return apiRequest('/portfolio', 'GET');
  },
  get: async id => {
    return apiRequest(`/portfolio/${id}`, 'GET');
  },
  create: async portfolioData => {
    return apiRequest('/portfolio', 'POST', portfolioData);
  },
  update: async (id, portfolioData) => {
    return apiRequest(`/portfolio/${id}`, 'PUT', portfolioData);
  },
  delete: async id => {
    return apiRequest(`/portfolio/${id}`, 'DELETE');
  }
};

// Contact Submission API functions
export const contactSubmissionApi = {
  list: async params => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.q) queryParams.append('q', params.q);
    const query = queryParams.toString();
    return apiRequest(`/admin/contact-submissions${query ? `?${query}` : ''}`, 'GET');
  },
  get: async id => {
    return apiRequest(`/admin/contact-submissions/${id}`, 'GET');
  },
  create: async submissionData => {
    return apiRequest('/admin/contact-submissions', 'POST', submissionData);
  },
  delete: async id => {
    return apiRequest(`/admin/contact-submissions/${id}`, 'DELETE');
  }
};

// Job Application API functions
export const jobApplicationApi = {
  list: async params => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.q) queryParams.append('q', params.q);
    if (params?.status) queryParams.append('status', params.status);
    const query = queryParams.toString();
    return apiRequest(`/job-applications${query ? `?${query}` : ''}`, 'GET');
  },
  get: async id => {
    return apiRequest(`/job-applications/${id}`, 'GET');
  },
  create: async applicationData => {
    return apiRequest('/job-applications/', 'POST', applicationData);
  },
  update: async (id, applicationData) => {
    return apiRequest(`/job-applications/${id}/`, 'PUT', applicationData);
  },
  delete: async id => {
    return apiRequest(`/job-applications/${id}`, 'DELETE');
  }
};

// Upload API functions
export const uploadApi = {
  uploadImage: async (file, folder = 'images') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);
    try {
      const response = await axiosInstance.post('/upload/image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message || 'Upload failed';
        throw new Error(errorMessage);
      }
      throw error;
    }
  },
  uploadImages: async files => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    try {
      const response = await axiosInstance.post('/upload/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message || 'Upload failed';
        throw new Error(errorMessage);
      }
      throw error;
    }
  },
  uploadResume: async file => {
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const response = await axiosInstance.post('/upload/resume/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message || 'Upload failed';
        throw new Error(errorMessage);
      }
      throw error;
    }
  }
};
export default axiosInstance;