<script setup>
import logoUrl from '/logos/silico-logo-full-color.png?url'
import SettingsDropdown from '@/components/SettingsDropdown.vue'
import { useAnimation } from '@/composables/useAnimation'

const { animationState } = useAnimation()
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
</style>

