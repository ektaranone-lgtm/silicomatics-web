// API configuration and helper functions

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  industry: string;
  password: string;
  agreedToTerms: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
    industry: string;
    createdAt: string;
  };
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Store token
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Remove token
  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  // Store user data
  setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Get stored user
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Remove user data
  removeUser(): void {
    localStorage.removeItem('user');
  }

  // Generic fetch wrapper
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error: any) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Signup
  async signup(userData: SignupData): Promise<UserResponse> {
    const response = await this.request<UserResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    // Store token and user if signup successful
    if (response.success && response.token) {
      this.setToken(response.token);
      if (response.user) {
        this.setUser(response.user);
      }
    }

    return response;
  }

  // Login
  async login(credentials: LoginData): Promise<UserResponse> {
    const response = await this.request<UserResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Store token and user if login successful
    if (response.success && response.token) {
      this.setToken(response.token);
      if (response.user) {
        this.setUser(response.user);
      }
    }

    return response;
  }

  // Get current user
  async getCurrentUser(): Promise<UserResponse> {
    return await this.request<UserResponse>('/auth/me', {
      method: 'GET',
    });
  }

  // Request password reset
  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    return await this.request<{ success: boolean; message: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Verify reset token
  async verifyResetToken(token: string): Promise<{ success: boolean; message?: string; email?: string }> {
    return await this.request<{ success: boolean; message?: string; email?: string }>(`/auth/verify-reset-token/${token}`, {
      method: 'GET',
    });
  }

  // Reset password
  async resetPassword(data: { token: string; password: string }): Promise<UserResponse> {
    const response = await this.request<UserResponse>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    // Store token and user if reset successful
    if (response.success && response.token) {
      this.setToken(response.token);
      if (response.user) {
        this.setUser(response.user);
      }
    }

    return response;
  }

  // Logout
  logout(): void {
    this.removeToken();
    this.removeUser();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new ApiService();
