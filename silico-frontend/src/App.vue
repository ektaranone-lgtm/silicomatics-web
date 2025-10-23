<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import logoUrl from '/logo-modern-v7.svg?url'

const isDropdownOpen = ref(false)
const dropdownRef = ref(null)

const toggleDropdown = (event) => {
  event.preventDefault()
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<template>
  <div>
    <div class="sand-animation"></div>
    <nav>
      <div class="container">
        <div class="nav-content">
          <div class="brand">
            <img :src="logoUrl" alt="Silico Informatics Logo" />
          </div>
          <div class="nav-right">
            <ul class="nav-links">
              <li><router-link to="/">Home</router-link></li>
              <li class="has-dropdown" ref="dropdownRef">
                <a href="#" @click="toggleDropdown" class="dropdown-toggle">
                  Services & Products<span class="chevron" :class="{ 'chevron-active': isDropdownOpen }">▼</span>
                </a>
                <div class="dropdown-menu" v-show="isDropdownOpen">
                  <router-link to="/services/analytics" class="dropdown-item">Advanced Analytics</router-link>
                  <router-link to="/services/ai" class="dropdown-item">AI Readiness & Enablement</router-link>
                  <router-link to="/services/bi" class="dropdown-item">BI & Visualization</router-link>
                  <router-link to="/services/consulting" class="dropdown-item">Digital Transformation</router-link>
                </div>
              </li>
              <li><router-link to="/contact">Contact</router-link></li>
              <li><router-link to="/about">About</router-link></li>
            </ul>
            <router-link to="/login" class="cta-button">GET STARTED</router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="container">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2rem;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  width: 400px; /* Fixed width container for the logo */
  overflow: visible;
}

.brand img {
  height: auto;
  width: 100%;
  transform: scale(1.6) translateY(2px); /* Make the logo 50% larger and adjust vertical alignment */
  transform-origin: center;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-links a {
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  padding: 0.75rem 0;
  transition: opacity 0.2s ease;
  line-height: 1;
}

.nav-links a:hover {
  opacity: 0.7;
}

.has-dropdown {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
}

.chevron {
  font-size: 0.7rem;
  margin-top: 2px;
  transition: transform 0.2s ease;
}

.chevron-active {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
  background-color: rgba(13, 13, 13, 0.95);
  min-width: 300px;
  padding: 0;
  margin-top: 0.8rem;
  border-radius: 4px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  opacity: 0;
  animation: dropdownEnter 0.2s ease forwards;
  backdrop-filter: blur(10px);
}

.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 12px;
  height: 12px;
  background-color: rgba(13, 13, 13, 0.95);
}

@keyframes dropdownEnter {
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 1rem 2.5rem;
  color: #ffffff;
  text-decoration: none;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;
  text-align: center;
  white-space: nowrap;
  line-height: 1.4;
  background-color: transparent;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  opacity: 1;
}

.cta-button {
  display: inline-block;
  background: #FFB627;
  color: #1E40AF;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.cta-button:hover {
  background: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.industries {
  margin: 2rem 0;
}

.industries ul {
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
}

.services {
  margin: 2rem 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.service-item {
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: transform 0.2s ease;
}

.service-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.sand-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.sand-animation::before,
.sand-animation::after {
  content: '';
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 200%;
  background-image: 
    radial-gradient(circle, #FFB627 1px, transparent 1px),
    radial-gradient(circle, #f5da55 2px, transparent 2px),
    radial-gradient(circle, #d4af37 1px, transparent 1px),
    radial-gradient(circle, #B47D00 2px, transparent 2px),
    radial-gradient(circle, #FFB627 1px, transparent 1px),
    radial-gradient(circle, #f5da55 1px, transparent 1px),
    radial-gradient(circle, #d4af37 2px, transparent 2px),
    radial-gradient(circle, #FFB627 1px, transparent 1px);
  background-size: 
    200px 300px,
    300px 400px,
    150px 250px,
    250px 350px,
    180px 280px,
    220px 320px,
    280px 380px,
    160px 260px;
  background-position: 
    0 0,
    50px 60px,
    100px 30px,
    150px 80px,
    200px 20px,
    250px 90px,
    300px 40px,
    350px 70px;
  background-repeat: repeat;
  animation: sandFall 20s linear infinite;
  opacity: 0.8;
}

.sand-animation::after {
  animation-duration: 25s;
  animation-delay: -10s;
  opacity: 0.6;
}

@keyframes sandFall {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}

nav {
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  padding: 0.5rem 0;
}

main.container {
  position: relative;
  z-index: 10;
  padding-top: calc(73px + 2rem);
}

.dropdown-menu {
  background-color: rgba(13, 13, 13, 0.95);
  backdrop-filter: blur(10px);
}
</style>

