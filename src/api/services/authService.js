import axios from "../client";
import jwtDecode from "jwt-decode";

import { ENDPOINTS } from "../config";

export const authService = {
  // User login
  async login(email, password) {
    try {
      const response = await axios.post(ENDPOINTS.LOGIN, { email, password });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Save token
      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  // User registration
  async register(userData) {
    try {
      const response = await axios.post(ENDPOINTS.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  // Logout
  logout() {
    localStorage.removeItem("token"); // Remove token
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("token"); // Returns true if token exists
  },

  // Get authentication token
  getToken() {
    return localStorage.getItem("token");
  },

  getUserRole() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded.roles || null;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  },
};
