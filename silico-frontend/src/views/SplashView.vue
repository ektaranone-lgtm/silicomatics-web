<template>
  <div class="splash">
    <div class="splash-content">
      <div class="splash-header">
        <h1 class="splash-title">
          <span class="title-line">Welcome to</span>
          <span class="title-highlight">SilicoInformatics</span>
        </h1>
        <p class="splash-subtitle">Your Journey to Digital Transformation Begins Here</p>
      </div>

      <div class="splash-features">
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-chart-line" aria-hidden="true"></i>
          </div>
          <h3>Advanced Analytics</h3>
          <p>Harness the power of data-driven insights to transform your business decisions</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-brain" aria-hidden="true"></i>
          </div>
          <h3>AI Solutions</h3>
          <p>Cutting-edge artificial intelligence to automate and optimize your operations</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-rocket" aria-hidden="true"></i>
          </div>
          <h3>Digital Innovation</h3>
          <p>Future-proof your organization with modern technology solutions</p>
        </div>
      </div>

      <div class="splash-message">
        <div class="message-box">
          <i class="fas fa-tools message-icon" aria-hidden="true"></i>
          <h2>We're Getting Ready for You</h2>
          <p>Our backend infrastructure is being prepared to provide you with the best experience.
             In the meantime, explore our services and learn how we can help transform your business.</p>
          <div class="splash-actions">
            <router-link to="/services" class="primary-button">
              Explore Services
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </router-link>
            <router-link to="/contact" class="secondary-button">
              Contact Us
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Splash page component - shown while backend is being set up
</script>

<style scoped>
.splash {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.splash-content {
  max-width: 1200px;
  width: 100%;
  text-align: center;
}

.splash-header {
  margin-bottom: 4rem;
  animation: fadeInDown 0.8s ease-out;
}

.splash-title {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.title-line {
  font-size: 1.5rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.title-highlight {
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(90deg,
    rgba(255, 255, 255, 0.95),
    rgba(255, 182, 39, 0.85)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.splash-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
}

.splash-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
}

.feature-card {
  background: linear-gradient(135deg, rgba(255, 182, 39, 0.1), rgba(180, 125, 0, 0.05));
  border: 1px solid rgba(255, 182, 39, 0.2);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(255, 182, 39, 0.2);
  border-color: rgba(255, 182, 39, 0.4);
}

.feature-icon {
  background: linear-gradient(135deg, #FFB627, #B47D00);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 4px 12px rgba(180, 125, 0, 0.3);
}

.feature-icon i {
  font-size: 1.8rem;
  color: #FFFAF0;
}

.feature-card h3 {
  color: #FFB627;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  font-size: 1rem;
}

.splash-message {
  animation: fadeInUp 0.8s ease-out 0.4s backwards;
}

.message-box {
  background: linear-gradient(135deg, rgba(30, 40, 60, 0.8), rgba(20, 20, 30, 0.8));
  border: 2px solid rgba(255, 182, 39, 0.3);
  border-radius: 16px;
  padding: 3rem 2rem;
  max-width: 800px;
  margin: 0 auto;
  backdrop-filter: blur(10px);
}

.message-icon {
  font-size: 3rem;
  color: #FFB627;
  margin-bottom: 1.5rem;
}

.message-box h2 {
  color: #FFB627;
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 600;
}

.message-box p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.splash-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.primary-button,
.secondary-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.primary-button {
  background: #FFB627;
  color: #1E40AF;
}

.primary-button:hover {
  background: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 182, 39, 0.3);
}

.secondary-button {
  background: transparent;
  color: #FFB627;
  border: 2px solid #FFB627;
}

.secondary-button:hover {
  background: rgba(255, 182, 39, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 182, 39, 0.2);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  .splash {
    padding: 1rem;
  }

  .title-highlight {
    font-size: 2.5rem;
  }

  .splash-subtitle {
    font-size: 1.1rem;
  }

  .splash-features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .message-box {
    padding: 2rem 1.5rem;
  }

  .message-box h2 {
    font-size: 1.5rem;
  }

  .message-box p {
    font-size: 1rem;
  }

  .splash-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
