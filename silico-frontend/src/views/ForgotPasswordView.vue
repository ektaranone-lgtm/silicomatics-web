<template>
  <div class="forgot-password">
    <div class="forgot-password-container">
      <div class="forgot-password-card">
        <div class="forgot-password-header">
          <h1>Reset Password</h1>
          <p v-if="!emailSent">Enter your email address and we'll help you reset your password</p>
          <p v-else>Check your email for reset instructions</p>
        </div>
        
        <form v-if="!emailSent" @submit.prevent="handleForgotPassword" class="forgot-password-form">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              placeholder="Enter your registered email"
              required
            />
          </div>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <button type="submit" class="reset-button" :disabled="isSubmitting">
            {{ isSubmitting ? 'Sending...' : 'Send Reset Link' }}
          </button>
        </form>

        <div v-else class="success-content">
          <div class="success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <p class="success-text">
            We've sent password reset instructions to <strong>{{ formData.email }}</strong>
          </p>
          <p class="success-subtext">
            Please check your inbox and follow the instructions to reset your password.
          </p>
          <p class="success-note">
            Didn't receive the email? Check your spam folder or <a href="#" @click.prevent="resendEmail" class="link">resend</a>
          </p>
        </div>

        <div class="forgot-password-footer">
          <router-link to="/login" class="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Sign In
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()

const formData = ref({
  email: ''
})

const errorMessage = ref('')
const emailSent = ref(false)
const isSubmitting = ref(false)

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const handleForgotPassword = async () => {
  errorMessage.value = ''
  
  // Validate email format
  if (!validateEmail(formData.value.email)) {
    errorMessage.value = 'Please enter a valid email address'
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Call the backend API
    const response = await api.forgotPassword(formData.value.email)
    
    if (response.success) {
      // Show success message
      emailSent.value = true
    } else {
      errorMessage.value = response.message || 'Failed to send reset email. Please try again.'
    }
    
  } catch (error: any) {
    console.error('Forgot password error:', error)
    errorMessage.value = 'An error occurred. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const resendEmail = () => {
  emailSent.value = false
  errorMessage.value = ''
  // User can submit the form again
}
</script>

<style scoped>
.forgot-password {
  min-height: calc(100vh - 73px - 2rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.forgot-password-container {
  width: 100%;
  max-width: 450px;
  padding: 0 1rem;
}

.forgot-password-card {
  background: rgba(20, 20, 30, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 182, 39, 0.1);
  animation: fadeInUp 0.6s ease-out;
}

.forgot-password-header {
  text-align: center;
  margin-bottom: 2rem;
}

.forgot-password-header h1 {
  color: #FFB627;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.forgot-password-header p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  margin: 0;
  line-height: 1.5;
}

.forgot-password-form {
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
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #FFB627;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(255, 182, 39, 0.1);
}

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.error-message {
  padding: 0.875rem 1rem;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  font-size: 0.9rem;
  text-align: center;
}

.reset-button {
  padding: 1rem;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #FFB627, #B47D00);
  color: #1E40AF;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.reset-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(255, 182, 39, 0.3);
}

.reset-button:active:not(:disabled) {
  transform: translateY(0);
}

.reset-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-content {
  text-align: center;
  padding: 1rem 0;
}

.success-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  color: #86efac;
  background: rgba(34, 197, 94, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(34, 197, 94, 0.3);
  animation: scaleIn 0.5s ease-out;
}

.success-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

.success-text strong {
  color: #FFB627;
  font-weight: 600;
}

.success-subtext {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

.success-note {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.5;
}

.success-note .link {
  color: #FFB627;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s ease;
}

.success-note .link:hover {
  opacity: 0.8;
}

.forgot-password-footer {
  margin-top: 2rem;
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #FFB627;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  transition: opacity 0.2s ease;
}

.back-link:hover {
  opacity: 0.8;
}

.back-link svg {
  width: 16px;
  height: 16px;
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

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .forgot-password-card {
    padding: 2rem 1.5rem;
  }

  .forgot-password-header h1 {
    font-size: 1.75rem;
  }
}
</style>
