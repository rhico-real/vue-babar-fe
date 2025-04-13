import { defineStore } from 'pinia';
import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api', // Use environment variable or default to '/api'
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('access');
    
    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const useUserProfileStore = defineStore('userProfile', {
  state: () => ({
    profile: null,
    loading: false,
    error: null,
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.profile,
    userRole: (state) => state.profile?.role || null,
    userFullName: (state) => state.profile?.full_name || '',
    userPhoto: (state) => state.profile?.photo || null,
    userId: (state) => state.profile?.id || null,
    userIdentifier: (state) => state.profile?.identifier || '',
    isActive: (state) => state.profile?.is_active || false,
    dateJoined: (state) => state.profile?.date_joined || null,
    updatedAt: (state) => state.profile?.updated_at || null,
  },
  
  actions: {
    /**
     * Fetch user profile from the API
     */
    async fetchProfile() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await api.get('/auth/get_profile/');
        this.profile = response.data;
        return this.profile;
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        this.error = err.response?.data?.message || 'Failed to load profile';
        // If unauthorized, clear profile
        if (err.response?.status === 401) {
          this.profile = null;
        }
        throw err;
      } finally {
        this.loading = false;
      }
    },
    
    /**
     * Clear user profile (useful for logout)
     */
    clearProfile() {
      this.profile = null;
      this.error = null;
    },
    
    /**
     * Update profile information (partial update)
     * @param {Object} profileData - Partial profile data to update
     */
    async updateProfile(profileData) {
      this.loading = true;
      this.error = null;
      
      try {
        // This endpoint should be adjusted based on your API
        const response = await api.patch('/auth/update_profile/', profileData);
        this.profile = response.data;
        return this.profile;
      } catch (err) {
        console.error('Failed to update profile:', err);
        this.error = err.response?.data?.message || 'Failed to update profile';
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
