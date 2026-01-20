<template>
  <div class="contact">
    <h1>Contact Us</h1>
    <div class="contact-content">
      <p>Get in touch with our team by emailing us at: <a href="mailto:contact@silicoinformatics.com" class="email-link">contact@silicoinformatics.com</a></p>
      <!-- Contact form can be added here -->
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can go here
</script>

<style scoped>
.contact {
  padding: 2rem 0;
  color: rgba(255, 255, 255, 0.85);
}

/* Light mode overrides */
[data-theme="light"] .contact {
  color: var(--color-navy);
}

.contact h1 {
  color: var(--color-primary);
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-white));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: fadeInDown 0.8s ease-out;
}

/* Light mode h1 gradient */
[data-theme="light"] .contact h1 {
  background: linear-gradient(135deg, var(--color-navy), var(--color-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.contact-content {
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
}

.contact-content p {
  line-height: 1.8;
  font-size: 1.1rem;
  text-align: center;
}

/* Light mode paragraphs */
[data-theme="light"] .contact-content p {
  color: var(--color-navy);
}

.email-link {
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 600;
}

.email-link:hover {
  color: var(--color-white);
  text-decoration: underline;
}

/* Light mode email link */
[data-theme="light"] .email-link {
  color: var(--color-secondary);
}

[data-theme="light"] .email-link:hover {
  color: var(--color-navy);
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
  .contact h1 {
    font-size: 2.5rem;
  }

  .contact-content p {
    font-size: 1rem;
  }
}
</style>