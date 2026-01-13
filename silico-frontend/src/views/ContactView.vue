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
}

.email-link {
  color: var(--color-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.email-link:hover {
  color: var(--color-secondary-dark);
  text-decoration: underline;
}
</style>
