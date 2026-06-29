import axios from 'axios';

// Determine API base URL. 
// 1. RAW_URL: The exact value from env (cleaned of trailing slashes)
const RAW_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

// 2. API_BASE_URL: The base for axios (e.g., https://domain.com/api)
export const API_BASE_URL = RAW_URL.endsWith('/api') 
  ? RAW_URL 
  : (RAW_URL ? `${RAW_URL}/api` : '/api');

// 3. BASE_URL: The domain root for assets (e.g., https://domain.com)
export const BASE_URL = RAW_URL.replace(/\/api$/, '') || '';

export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;

  const sanitizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${sanitizedPath}`;
};

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`API Error [${error.config?.url}]:`, error.response.data);
    } else if (error.request) {
      console.error(`API Error [${error.config?.url}]: No response received`);
    } else {
      console.error(`API Error [${error.config?.url}]:`, error.message);
    }
    return Promise.reject(error);
  }
);

async function apiRequest(endpoint, method = 'GET', data = undefined) {
  try {
    const response = await axiosInstance.request({
      url: endpoint,
      method,
      data,
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

export const pageApi = {
  get: async (pageId) => apiRequest(`/pages/${pageId}`, 'GET'),
  list: async () => apiRequest('/pages/', 'GET'),
  create: async (pageData) => apiRequest('/pages/', 'POST', pageData),
  update: async (pageId, pageData) => apiRequest(`/pages/${pageId}`, 'PUT', pageData),
  delete: async (pageId) => apiRequest(`/pages/${pageId}`, 'DELETE'),
};

export const careerApi = {
  list: async () => apiRequest('/careers/', 'GET'),
  get: async (id) => apiRequest(`/careers/${id}`, 'GET'),
  create: async (jobData) => apiRequest('/careers/', 'POST', jobData),
  update: async (id, jobData) => apiRequest(`/careers/${id}/`, 'PUT', jobData),
  delete: async (id) => apiRequest(`/careers/${id}`, 'DELETE'),
};

export const serviceApi = {
  list: async () => apiRequest('/services/', 'GET'),
  get: async (id) => apiRequest(`/services/${id}`, 'GET'),
  create: async (serviceData) => apiRequest('/services/', 'POST', serviceData),
  update: async (id, serviceData) => apiRequest(`/services/${id}`, 'PUT', serviceData),
  delete: async (id) => apiRequest(`/services/${id}`, 'DELETE'),
};

export const portfolioApi = {
  list: async () => apiRequest('/portfolio/', 'GET'),
  get: async (id) => apiRequest(`/portfolio/${id}`, 'GET'),
  create: async (portfolioData) => apiRequest('/portfolio/', 'POST', portfolioData),
  update: async (id, portfolioData) => apiRequest(`/portfolio/${id}`, 'PUT', portfolioData),
  delete: async (id) => apiRequest(`/portfolio/${id}`, 'DELETE'),
};

export const contactSubmissionApi = {
  list: async (params) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.q) queryParams.append('q', params.q);
    const query = queryParams.toString();
    return apiRequest(`/contact-submissions/${query ? `?${query}` : ''}`, 'GET');
  },
  get: async (id) => apiRequest(`/contact-submissions/${id}`, 'GET'),
  create: async (submissionData) => apiRequest('/contact-submissions/', 'POST', submissionData),
  delete: async (id) => apiRequest(`/contact-submissions/${id}`, 'DELETE'),
};

export const jobApplicationApi = {
  list: async (params) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.q) queryParams.append('q', params.q);
    if (params?.status) queryParams.append('status', params.status);
    const query = queryParams.toString();
    return apiRequest(`/job-applications/${query ? `?${query}` : ''}`, 'GET');
  },
  get: async (id) => apiRequest(`/job-applications/${id}`, 'GET'),
  create: async (applicationData) => apiRequest('/job-applications/', 'POST', applicationData),
  update: async (id, applicationData) => apiRequest(`/job-applications/${id}/`, 'PUT', applicationData),
  delete: async (id) => apiRequest(`/job-applications/${id}`, 'DELETE'),
};

export const uploadApi = {
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axiosInstance.post('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message || 'Upload failed');
      }
      throw error;
    }
  },
  uploadImages: async (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    try {
      const response = await axiosInstance.post('/upload/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message || 'Upload failed');
      }
      throw error;
    }
  },
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const response = await axiosInstance.post('/upload/resume/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message || 'Upload failed');
      }
      throw error;
    }
  },
};
