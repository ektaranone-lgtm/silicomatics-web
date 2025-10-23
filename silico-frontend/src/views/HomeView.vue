<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="welcome-text">Welcome to</span>
          <span class="company-name">SilicoInformatics</span>
        </h1>
        <p class="hero-subtitle">Your trusted partner in data analytics and digital transformation</p>
        <div class="hero-description">
          <p>Empowering businesses through innovative AI solutions and measurable results</p>
          <router-link to="/login" class="cta-button">Get Started</router-link>
        </div>
      </div>
    </section>

    <section class="industries">
      <h2>Industries We Serve</h2>
      <div class="industries-grid" role="list">
        <button
          type="button"
          class="industry-card industry-button"
          role="listitem"
          @click="toggleIndustry('pharmaceutical')"
          :aria-pressed="selected === 'pharmaceutical'"
        >
          <div class="icon-wrapper">
            <i class="fas fa-pills" aria-hidden="true"></i>
          </div>
          <h3>Pharmaceutical</h3>
          <p>AI-driven drug discovery and development solutions</p>
        </button>

        <button
          type="button"
          class="industry-card industry-button"
          role="listitem"
          @click="toggleIndustry('agriculture')"
          :aria-pressed="selected === 'agriculture'"
        >
          <div class="icon-wrapper">
            <i class="fas fa-leaf" aria-hidden="true"></i>
          </div>
          <h3>Agriculture</h3>
          <p>Smart farming and crop optimization analytics</p>
        </button>

        <button
          type="button"
          class="industry-card industry-button"
          role="listitem"
          @click="toggleIndustry('biotechnology')"
          :aria-pressed="selected === 'biotechnology'"
        >
          <div class="icon-wrapper">
            <i class="fas fa-dna" aria-hidden="true"></i>
          </div>
          <h3>Biotechnology</h3>
          <p>Advanced genomics and research analytics</p>
        </button>

        <button
          type="button"
          class="industry-card industry-button"
          role="listitem"
          @click="toggleIndustry('healthcare')"
          :aria-pressed="selected === 'healthcare'"
        >
          <div class="icon-wrapper">
            <i class="fas fa-hospital-user" aria-hidden="true"></i>
          </div>
          <h3>Healthcare</h3>
          <p>Patient care and operational excellence</p>
        </button>
      </div>

      <!-- Hidden details panel -->
      <div
        class="industry-details"
        v-if="selected"
        role="region"
        :aria-label="selectedLabel + ' details'"
      >
          <div class="industry-details-inner">
            <h3>{{ selectedLabel }}</h3>
            <p>{{ detailsText }}</p>
          </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// currently selected industry key or null
const selected = ref<string | null>(null)

const detailsMap: Record<string, { label: string; text: string }> = {
  pharmaceutical: {
    label: 'Pharmaceutical',
    text: 'We provide AI-driven solutions for drug discovery, predictive modeling, and clinical trial optimization tailored for pharma organizations.'
  },
  agriculture: {
    label: 'Agriculture',
    text: 'Our smart farming tools combine remote sensing, IoT and ML to boost crop yields, reduce waste and optimize resource usage.'
  },
  biotechnology: {
    label: 'Biotechnology',
    text: 'Advanced genomics, bioinformatics pipelines, and research analytics that accelerate discovery and reproducible science.'
  },
  healthcare: {
    label: 'Healthcare',
    text: 'Solutions for patient analytics, operational improvements, and decision support to improve outcomes and reduce costs.'
  }
}

function toggleIndustry(key: string) {
  if (selected.value === key) {
    selected.value = null
  } else {
    selected.value = key
  }
}

const selectedLabel = computed(() => {
  if (!selected.value) return ''
  return detailsMap[selected.value as keyof typeof detailsMap]?.label ?? ''
})

const detailsText = computed(() => {
  if (!selected.value) return ''
  return detailsMap[selected.value as keyof typeof detailsMap]?.text ?? ''
})
</script>

<style scoped>
.home {
  padding: 0;
}

.hero {
  position: relative;
  background: linear-gradient(135deg, 
    rgba(20, 20, 30, 0.7),
    rgba(30, 40, 60, 0.8)
  );
  color: white;
  padding: 8rem 2rem;
  margin: 0;
  overflow: hidden;
  backdrop-filter: blur(8px);
  clip-path: ellipse(100% 100% at 50% 0%);
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(/logo-modern-v7.svg) no-repeat center right -200px;
  opacity: 0.08;
  transform: scale(2);
}

.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 60%,
    rgba(10, 10, 10, 1) 100%
  );
  pointer-events: none;
  z-index: 1;
}

/* Update hero content z-index to appear above the fade */
.hero-content {
  position: relative;
  z-index: 2;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
  animation: fadeInUp 0.8s ease-out;
}

.welcome-text {
  font-size: 1.5rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.company-name {
  font-size: 4rem;
  font-weight: 600;
  line-height: 1.1;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.95),
    rgba(255, 182, 39, 0.85)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0.5rem 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.75);
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.hero-description {
  display: flex;
  align-items: center;
  gap: 2rem;
  animation: fadeInUp 0.8s ease-out 0.4s backwards;
}

.hero-description p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.cta-button {
  display: inline-block;
  background: #FFB627;
  color: #1E40AF;
  padding: 1rem 2rem;
  border-radius: 50px;
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

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 4rem 1.5rem;
  }

  .company-name {
    font-size: 3rem;
  }

  .hero-description {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
}

.industries {
  margin: 4rem 0;
  text-align: center;
}

.industries h2 {
  margin-bottom: 2rem;
  color: #B47D00;
  font-size: 2rem;
}

.industries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.industry-card {
  background: #FFFAF0;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(180, 125, 0, 0.1);
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid rgba(255, 182, 39, 0.1);
}

.industry-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 15px rgba(180, 125, 0, 0.15);
  border-color: rgba(255, 182, 39, 0.2);
}

.icon-wrapper {
  background: linear-gradient(135deg, #FFB627, #B47D00);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 4px 8px rgba(180, 125, 0, 0.2);
}

.icon-wrapper i {
  font-size: 2rem;
  color: #FFFAF0;
}

.industry-card h3 {
  color: #B47D00;
  margin: 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.industry-card p {
  color: #8B7355;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
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

/* Make industry cards behave like buttons */
.industry-button {
  cursor: pointer;
  text-align: inherit;
  border: none;
  background: inherit;
  padding: 0;
}

.industry-button:focus {
  outline: 3px solid rgba(255, 182, 39, 0.4);
  outline-offset: 4px;
}

.industry-button .industry-card {
  /* no-op: kept if nested, but we keep single class on button for styling */
}

/* When using button with class industry-card apply same internals */
.industry-button {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: #FFFAF0;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(180, 125, 0, 0.1);
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid rgba(255, 182, 39, 0.1);
}

.industry-button:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 15px rgba(180, 125, 0, 0.15);
  border-color: rgba(255, 182, 39, 0.2);
}

/* Details panel */
.industry-details {
  max-width: 1000px;
  margin: 1.5rem auto 0 auto;
  background: linear-gradient(180deg, #fff, #fff9f0);
  border-radius: 8px;
  padding: 1.5rem 2rem;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  border: 1px solid rgba(180,125,0,0.08);
  animation: detailsFadeIn 0.25s ease-out;
}

.industry-details-inner h3 {
  margin-top: 0;
  color: #B47D00;
}

.close-details {
  background: transparent;
  border: none;
  color: #1E40AF;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
}

@keyframes detailsFadeIn {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>