<script setup>
import { ref } from 'vue'
import logoUrl from '/logos/silico-logo-full-color.png?url'
import SettingsDropdown from '@/components/SettingsDropdown.vue'
import { useAnimation } from '@/composables/useAnimation'

const { animationState } = useAnimation()
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <div>
    <div class="background-layer" :class="{ 'animation-on': animationState === 'on' }"></div>
    <nav>
      <div class="container">
        <div class="nav-content">
          <div class="brand">
            <router-link to="/" aria-label="Go to home page">
              <img :src="logoUrl" alt="Silico Informatics Logo" />
            </router-link>
          </div>
          <div class="nav-right">
            <ul class="nav-links">
              <li><router-link to="/services">Services & Products</router-link></li>
              <li><router-link to="/contact">Contact</router-link></li>
              <li><router-link to="/about">About</router-link></li>
            </ul>
            <SettingsDropdown />
            <router-link to="/splash" class="cta-button">GET STARTED</router-link>
            <button class="hamburger" @click="toggleMobileMenu" aria-label="Toggle menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    <div v-if="mobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu"></div>

    <!-- Mobile Menu Drawer -->
    <div class="mobile-menu" :class="{ 'open': mobileMenuOpen }">
      <ul class="mobile-nav-links">
        <li><router-link to="/services" @click="closeMobileMenu">Services & Products</router-link></li>
        <li><router-link to="/contact" @click="closeMobileMenu">Contact</router-link></li>
        <li><router-link to="/about" @click="closeMobileMenu">About</router-link></li>
        <li><router-link to="/splash" class="mobile-cta" @click="closeMobileMenu">GET STARTED</router-link></li>
      </ul>
    </div>

    <main class="container">
      <router-view></router-view>
    </main>

    <footer>
      <div class="container">
        <p>&copy; 2026 Silicoinformatics</p>
      </div>
    </footer>
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
}

.brand a {
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
}

.brand img {
  height: 64px;
  width: auto;
  filter: drop-shadow(0 0 12px rgba(255, 213, 79, 0.4)) drop-shadow(0 0 20px rgba(30, 144, 255, 0.25));
  transition: filter 0.3s ease;
}

.brand a:hover img {
  filter: drop-shadow(0 0 16px rgba(255, 213, 79, 0.5)) drop-shadow(0 0 24px rgba(30, 144, 255, 0.35));
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
  color: var(--color-white);
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

.cta-button {
  display: inline-block;
  background: var(--color-primary);
  color: var(--color-secondary-dark);
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.cta-button:hover {
  background: var(--color-white);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--color-black-alpha-10);
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

.background-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-bg-primary);
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.background-layer.animation-on::before,
.background-layer.animation-on::after {
  content: '';
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 200%;
  background-image:
    radial-gradient(circle, var(--color-sand-primary) 1px, transparent 1px),
    radial-gradient(circle, var(--color-sand-secondary) 2px, transparent 2px),
    radial-gradient(circle, var(--color-sand-tertiary) 1px, transparent 1px),
    radial-gradient(circle, var(--color-sand-primary) 2px, transparent 2px),
    radial-gradient(circle, var(--color-sand-secondary) 1px, transparent 1px),
    radial-gradient(circle, var(--color-sand-tertiary) 1px, transparent 1px),
    radial-gradient(circle, var(--color-sand-primary) 2px, transparent 2px),
    radial-gradient(circle, var(--color-sand-secondary) 1px, transparent 1px);
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
  opacity: 1;
}

.background-layer.animation-on::after {
  animation-duration: 25s;
  animation-delay: -10s;
  opacity: 0.8;
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
  background-color: var(--color-navy-alpha-90);
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

footer {
  position: relative;
  z-index: 10;
  padding: 2rem 0;
  margin-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

footer p {
  text-align: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.85rem;
  margin: 0;
  letter-spacing: 0.5px;
}

@media (prefers-color-scheme: dark) {
  footer p {
    color: rgba(255, 255, 255, 0.3);
  }
}

/* Hamburger Menu Button */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.hamburger span {
  width: 100%;
  height: 3px;
  background: var(--color-white);
  border-radius: 3px;
  transition: all 0.3s ease;
}

.hamburger:hover span {
  background: var(--color-primary);
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(2px);
}

/* Mobile Menu Drawer */
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 280px;
  height: 100%;
  background: var(--color-navy-alpha-90);
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: right 0.3s ease;
  padding-top: 80px;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  overflow-x: hidden;
}

.mobile-menu.open {
  right: 0;
}

.mobile-nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mobile-nav-links li {
  list-style: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-nav-links a {
  display: block;
  color: var(--color-white);
  text-decoration: none;
  padding: 1.2rem 2rem;
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
}

.mobile-nav-links a:hover {
  background: rgba(255, 255, 255, 0.05);
  padding-left: 2.5rem;
}

.mobile-nav-links .mobile-cta {
  background: var(--color-primary);
  color: var(--color-secondary-dark);
  font-weight: 600;
  margin: 1.5rem;
  border-radius: 50px;
  text-align: center;
  padding: 1rem 2rem;
}

.mobile-nav-links .mobile-cta:hover {
  background: var(--color-white);
  padding-left: 2rem;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .brand img {
    height: 40px;
  }

  .nav-right {
    gap: 1rem;
  }

  .nav-links {
    display: none;
  }

  .cta-button {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .mobile-menu-overlay {
    display: block;
  }

  main.container {
    padding-top: calc(57px + 1.5rem);
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.75rem;
  }

  .brand img {
    height: 32px;
  }

  .nav-right {
    gap: 0.5rem;
  }

  .mobile-menu {
    width: 250px;
  }
}
</style>

