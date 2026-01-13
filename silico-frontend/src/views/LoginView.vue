<template>
  <div class="login">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to access your account</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="formData.password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" v-model="formData.rememberMe" />
              <span>Remember me</span>
            </label>
            <router-link to="/forgot-password" class="forgot-password">Forgot password?</router-link>
          </div>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>

          <button type="submit" class="login-button" :disabled="isSubmitting">
            {{ isSubmitting ? 'Signing In...' : 'Sign In' }}
          </button>
        </form>

        <div class="login-footer">
          <p>Don't have an account? <router-link to="/signup" class="signup-link">Sign up</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiService from '../services/api'

const router = useRouter()

const formData = ref({
  email: '',
  password: '',
  rememberMe: false
})

const errorMessage = ref('')
const successMessage = ref('')
const isSubmitting = ref(false)

const handleLogin = async () => {
  // Reset messages
  errorMessage.value = ''
  successMessage.value = ''
  
  // Basic validation
  if (!formData.value.email || !formData.value.password) {
    errorMessage.value = 'Please provide both email and password'
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Call API to login
    const response = await apiService.login({
      email: formData.value.email,
      password: formData.value.password
    })
    
    if (response.success) {
      successMessage.value = response.message || 'Login successful! Redirecting...'
      
      // Log for debugging
      console.log('User logged in successfully:', response.user)
      
      // Redirect to home after 1 second
      setTimeout(() => {
        router.push('/')
      }, 1000)
    } else {
      errorMessage.value = response.message || 'Login failed. Please try again.'
    }
    
  } catch (error: any) {
    console.error('Login error:', error)
    errorMessage.value = error.message || 'Invalid email or password'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.login {
  min-height: calc(100vh - 73px - 2rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.login-container {
  width: 100%;
  max-width: 450px;
  padding: 0 1rem;
}

.login-card {
  background: var(--color-dark-bg-20);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-primary-alpha-10);
  animation: fadeInUp 0.6s ease-out;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  color: var(--color-primary);
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: var(--color-white-alpha-70);
  font-size: 1rem;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  font-weight: 500;
}

.form-group input {
  padding: 0.875rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-white);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px var(--color-primary-alpha-10);
}

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  cursor: pointer;
  width: 16px;
  height: 16px;
  accent-color: var(--color-primary);
}

.forgot-password {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: opacity 0.2s ease;
}

.forgot-password:hover {
  opacity: 0.8;
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #FCA5A5;
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 0.9rem;
  animation: shake 0.3s ease;
}

.success-message {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #86EFAC;
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 0.9rem;
  animation: fadeIn 0.3s ease;
}

.login-button {
  padding: 1rem;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: var(--color-secondary-dark);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px var(--color-primary-alpha-40);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-footer {
  margin-top: 2rem;
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.login-footer p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  margin: 0;
}

.signup-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s ease;
}

.signup-link:hover {
  opacity: 0.8;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .login-card {
    padding: 2rem 1.5rem;
  }

  .login-header h1 {
    font-size: 1.75rem;
  }
}
</style>
