<template>
  <div class="signup">
    <div class="signup-container">
      <div class="signup-card">
        <div class="signup-header">
          <h1>Create Account</h1>
          <p>Join SilicoInformatics today</p>
        </div>
        
        <form @submit.prevent="handleSignup" class="signup-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                v-model="formData.firstName"
                placeholder="Enter your first name"
                required
              />
            </div>

            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                v-model="formData.lastName"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

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
            <label for="company">Company Name</label>
            <input
              type="text"
              id="company"
              v-model="formData.company"
              placeholder="Enter your company name"
            />
          </div>

          <div class="form-group">
            <label for="industry">Industry</label>
            <select
              id="industry"
              v-model="formData.industry"
              required
            >
              <option value="" disabled>Select your industry</option>
              <option value="pharmaceutical">Pharmaceutical</option>
              <option value="agriculture">Agriculture</option>
              <option value="biotechnology">Biotechnology</option>
              <option value="healthcare">Healthcare</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="formData.password"
              placeholder="Create a password"
              required
              minlength="8"
            />
            <span class="helper-text">At least 8 characters</span>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="formData.confirmPassword"
              placeholder="Confirm your password"
              required
              minlength="8"
            />
          </div>

          <div class="form-group checkbox-group">
            <div class="custom-checkbox" @click="formData.agreeToTerms = !formData.agreeToTerms">
              <div class="checkbox-box" :class="{ checked: formData.agreeToTerms }">
                <svg v-if="formData.agreeToTerms" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span class="checkbox-text">I agree to the <a href="#" class="link" @click.stop>Terms of Service</a> and <a href="#" class="link" @click.stop>Privacy Policy</a></span>
            </div>
          </div>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>

          <button type="submit" class="signup-button" :disabled="isSubmitting">
            {{ isSubmitting ? 'Creating Account...' : 'Create Account' }}
          </button>
        </form>

        <div class="signup-footer">
          <p>Already have an account? <router-link to="/login" class="login-link">Sign in</router-link></p>
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
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  industry: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
})

const errorMessage = ref('')
const successMessage = ref('')
const isSubmitting = ref(false)

const validateForm = () => {
  // Reset messages
  errorMessage.value = ''
  
  // Check if passwords match
  if (formData.value.password !== formData.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match'
    return false
  }
  
  // Check password strength
  if (formData.value.password.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters long'
    return false
  }
  
  // Validate email format (basic check)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email)) {
    errorMessage.value = 'Please enter a valid email address'
    return false
  }
  
  // Check if terms are agreed
  if (!formData.value.agreeToTerms) {
    errorMessage.value = 'Please agree to the Terms of Service and Privacy Policy'
    return false
  }
  
  return true
}

const handleSignup = async () => {
  // Validate form
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    // Prepare user data (excluding confirmPassword)
    const userData = {
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      email: formData.value.email,
      company: formData.value.company,
      industry: formData.value.industry,
      password: formData.value.password,
      agreedToTerms: formData.value.agreeToTerms
    }
    
    // Call API to register user
    const response = await apiService.signup(userData)
    
    if (response.success) {
      // Show success message
      successMessage.value = response.message || 'Account created successfully! Redirecting to login...'
      
      // Log for debugging
      console.log('User registered successfully:', response.user)
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      errorMessage.value = response.message || 'Signup failed. Please try again.'
    }
    
  } catch (error: any) {
    console.error('Signup error:', error)
    errorMessage.value = error.message || 'An error occurred during signup. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.signup {
  min-height: calc(100vh - 73px - 2rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.signup-container {
  width: 100%;
  max-width: 600px;
  padding: 0 1rem;
}

.signup-card {
  background: rgba(20, 20, 30, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 182, 39, 0.1);
  animation: fadeInUp 0.6s ease-out;
}

.signup-header {
  text-align: center;
  margin-bottom: 2rem;
}

.signup-header h1 {
  color: #FFB627;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.signup-header p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  margin: 0;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

.form-group input:not([type="checkbox"]),
.form-group select {
  padding: 0.875rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group select {
  cursor: pointer;
}

.form-group select option {
  background: #1a1a2e;
  color: #ffffff;
}

.form-group input:not([type="checkbox"]):focus,
.form-group select:focus {
  outline: none;
  border-color: #FFB627;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(255, 182, 39, 0.1);
}

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.helper-text {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: -0.25rem;
}

.checkbox-group {
  margin-top: -0.5rem;
}

.custom-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.checkbox-box {
  width: 22px;
  height: 22px;
  min-width: 22px;
  min-height: 22px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  margin-top: 0.1rem;
}

.checkbox-box:hover {
  border-color: #FFB627;
  background: rgba(255, 182, 39, 0.1);
}

.checkbox-box.checked {
  background: linear-gradient(135deg, #FFB627, #B47D00);
  border-color: #FFB627;
}

.checkbox-box svg {
  color: #1E40AF;
  animation: checkmark 0.3s ease;
}

@keyframes checkmark {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.checkbox-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.5;
}

.checkbox-text .link {
  color: #FFB627;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.checkbox-text .link:hover {
  opacity: 0.8;
  text-decoration: underline;
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

.success-message {
  padding: 0.875rem 1rem;
  border-radius: 8px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #86efac;
  font-size: 0.9rem;
  text-align: center;
}

.signup-button {
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

.signup-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(255, 182, 39, 0.3);
}

.signup-button:active:not(:disabled) {
  transform: translateY(0);
}

.signup-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.signup-footer {
  margin-top: 2rem;
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.signup-footer p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  margin: 0;
}

.login-link {
  color: #FFB627;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s ease;
}

.login-link:hover {
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
  .signup-card {
    padding: 2rem 1.5rem;
  }

  .signup-header h1 {
    font-size: 1.75rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
