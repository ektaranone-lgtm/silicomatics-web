<template>
  <div class="reset-password">
    <div class="reset-password-container">
      <div class="reset-password-card">
        <div class="reset-password-header">
          <h1>{{ isVerifying ? 'Verifying...' : 'Create New Password' }}</h1>
          <p v-if="!isVerifying && isValidToken">Choose a strong password for your account</p>
          <p v-else-if="!isVerifying && !isValidToken">Invalid or expired reset link</p>
        </div>

        <!-- Loading State -->
        <div v-if="isVerifying" class="loading-state">
          <div class="spinner"></div>
          <p>Verifying your reset link...</p>
        </div>

        <!-- Invalid Token State -->
        <div v-else-if="!isValidToken" class="invalid-token">
          <div class="error-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <p class="error-text">
            This password reset link is invalid or has expired.
          </p>
          <p class="error-subtext">
            Reset links are only valid for 10 minutes for security reasons.
          </p>
          <router-link to="/forgot-password" class="request-new-link">
            Request a New Reset Link
          </router-link>
        </div>

        <!-- Success State -->
        <div v-else-if="resetSuccess" class="success-content">
          <div class="success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <p class="success-text">
            Password Reset Successful!
          </p>
          <p class="success-subtext">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>
          <router-link to="/login" class="signin-button">
            Sign In
          </router-link>
        </div>

        <!-- Reset Password Form -->
        <form v-else @submit.prevent="handleResetPassword" class="reset-password-form">
          <div class="user-info" v-if="userEmail">
            <p class="reset-for">Resetting password for:</p>
            <p class="user-email">{{ userEmail }}</p>
          </div>

          <div class="form-group">
            <label for="password">New Password</label>
            <div class="password-input-wrapper">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="formData.password"
                placeholder="Enter new password"
                required
                minlength="8"
              />
              <button
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
                tabindex="-1"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              </button>
            </div>
            <div class="password-strength">
              <div class="strength-bar">
                <div 
                  class="strength-fill" 
                  :class="passwordStrength.class"
                  :style="{ width: passwordStrength.width }"
                ></div>
              </div>
              <span class="strength-label" :class="passwordStrength.class">
                {{ passwordStrength.label }}
              </span>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm New Password</label>
            <div class="password-input-wrapper">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                v-model="formData.confirmPassword"
                placeholder="Confirm new password"
                required
                minlength="8"
              />
              <button
                type="button"
                class="toggle-password"
                @click="showConfirmPassword = !showConfirmPassword"
                tabindex="-1"
              >
                <svg v-if="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              </button>
            </div>
          </div>

          <div class="password-requirements">
            <p class="requirements-title">Password must contain:</p>
            <ul>
              <li :class="{ valid: formData.password.length >= 8 }">
                <span class="check-icon">✓</span> At least 8 characters
              </li>
              <li :class="{ valid: /[A-Z]/.test(formData.password) }">
                <span class="check-icon">✓</span> One uppercase letter
              </li>
              <li :class="{ valid: /[a-z]/.test(formData.password) }">
                <span class="check-icon">✓</span> One lowercase letter
              </li>
              <li :class="{ valid: /[0-9]/.test(formData.password) }">
                <span class="check-icon">✓</span> One number
              </li>
            </ul>
          </div>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <button type="submit" class="reset-button" :disabled="isSubmitting">
            {{ isSubmitting ? 'Resetting Password...' : 'Reset Password' }}
          </button>
        </form>

        <div class="reset-password-footer">
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
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/services/api'

const router = useRouter()
const route = useRoute()

const formData = ref({
  password: '',
  confirmPassword: ''
})

const errorMessage = ref('')
const isSubmitting = ref(false)
const isVerifying = ref(true)
const isValidToken = ref(false)
const resetSuccess = ref(false)
const userEmail = ref('')
const resetToken = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Password strength calculator
const passwordStrength = computed(() => {
  const password = formData.value.password
  if (password.length === 0) {
    return { width: '0%', label: '', class: '' }
  }
  
  let strength = 0
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^a-zA-Z0-9]/.test(password)) strength++
  
  if (strength <= 2) {
    return { width: '33%', label: 'Weak', class: 'weak' }
  } else if (strength <= 4) {
    return { width: '66%', label: 'Good', class: 'good' }
  } else {
    return { width: '100%', label: 'Strong', class: 'strong' }
  }
})

// Verify token on mount
onMounted(async () => {
  const token = route.query.token as string
  
  if (!token) {
    isVerifying.value = false
    isValidToken.value = false
    return
  }
  
  resetToken.value = token
  
  try {
    const response = await api.verifyResetToken(token)
    if (response.success) {
      isValidToken.value = true
      userEmail.value = response.email || ''
    } else {
      isValidToken.value = false
    }
  } catch (error: any) {
    console.error('Token verification error:', error)
    isValidToken.value = false
  } finally {
    isVerifying.value = false
  }
})

const validatePassword = (): boolean => {
  if (formData.value.password.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters long'
    return false
  }
  
  if (formData.value.password !== formData.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match'
    return false
  }
  
  return true
}

const handleResetPassword = async () => {
  errorMessage.value = ''
  
  if (!validatePassword()) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    const response = await api.resetPassword({
      token: resetToken.value,
      password: formData.value.password
    })
    
    if (response.success) {
      resetSuccess.value = true
      
      // Auto redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } else {
      errorMessage.value = response.message || 'Failed to reset password. Please try again.'
    }
  } catch (error: any) {
    console.error('Reset password error:', error)
    errorMessage.value = error.message || 'An error occurred. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.reset-password {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.reset-password-container {
  width: 100%;
  max-width: 500px;
}

.reset-password-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.reset-password-header {
  padding: 40px 40px 20px;
  text-align: center;
}

.reset-password-header h1 {
  font-size: 28px;
  color: #1a1a1a;
  margin: 0 0 10px 0;
  font-weight: 600;
}

.reset-password-header p {
  color: #666;
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
}

/* Loading State */
.loading-state {
  padding: 60px 40px;
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  margin: 0 auto 20px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-state p {
  color: #666;
  font-size: 16px;
}

/* Invalid Token State */
.invalid-token {
  padding: 40px;
  text-align: center;
}

.error-icon {
  margin-bottom: 20px;
}

.error-icon svg {
  color: #dc3545;
}

.error-text {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 10px 0;
}

.error-subtext {
  color: #666;
  margin: 10px 0 30px;
  line-height: 1.6;
}

.request-new-link {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s;
}

.request-new-link:hover {
  transform: translateY(-2px);
}

/* Success State */
.success-content {
  padding: 40px;
  text-align: center;
}

.success-icon {
  margin-bottom: 20px;
}

.success-icon svg {
  color: #28a745;
}

.success-text {
  font-size: 22px;
  font-weight: 600;
  color: #28a745;
  margin: 10px 0;
}

.success-subtext {
  color: #666;
  margin: 10px 0 30px;
  line-height: 1.6;
}

.signin-button {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 40px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s;
}

.signin-button:hover {
  transform: translateY(-2px);
}

/* Form */
.reset-password-form {
  padding: 20px 40px 40px;
}

.user-info {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 25px;
  text-align: center;
}

.reset-for {
  font-size: 13px;
  color: #666;
  margin: 0 0 5px 0;
}

.user-email {
  font-size: 16px;
  font-weight: 600;
  color: #667eea;
  margin: 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.password-input-wrapper {
  position: relative;
}

.form-group input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: color 0.2s;
}

.toggle-password:hover {
  color: #667eea;
}

.password-strength {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.strength-bar {
  flex: 1;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: width 0.3s, background-color 0.3s;
}

.strength-fill.weak {
  background: #dc3545;
}

.strength-fill.good {
  background: #ffc107;
}

.strength-fill.strong {
  background: #28a745;
}

.strength-label {
  font-size: 12px;
  font-weight: 600;
  min-width: 50px;
}

.strength-label.weak {
  color: #dc3545;
}

.strength-label.good {
  color: #ffc107;
}

.strength-label.strong {
  color: #28a745;
}

.password-requirements {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.requirements-title {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin: 0 0 10px 0;
}

.password-requirements ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.password-requirements li {
  font-size: 13px;
  color: #999;
  margin: 6px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.password-requirements li.valid {
  color: #28a745;
}

.check-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #e0e0e0;
  color: white;
  font-size: 10px;
  flex-shrink: 0;
}

.password-requirements li.valid .check-icon {
  background: #28a745;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  border: 1px solid #fcc;
}

.reset-button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.reset-button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.reset-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reset-password-footer {
  padding: 20px 40px 40px;
  text-align: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: gap 0.2s;
}

.back-link:hover {
  gap: 12px;
}

@media (max-width: 768px) {
  .reset-password {
    padding: 10px;
  }

  .reset-password-header {
    padding: 30px 20px 15px;
  }

  .reset-password-header h1 {
    font-size: 24px;
  }

  .reset-password-form {
    padding: 15px 20px 30px;
  }

  .reset-password-footer {
    padding: 15px 20px 30px;
  }
}
</style>
