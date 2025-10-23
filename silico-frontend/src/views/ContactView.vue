<template>
  <div class="contact">
    <h1>Contact Us</h1>
    <div class="contact-content">
      <p>Get in touch with our team by emailing us at: <a href="mailto:silicoinformatics@gmail.com" class="email-link">silicoinformatics@gmail.com</a></p>
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
  color: #3B82F6;
  text-decoration: none;
  transition: color 0.2s ease;
}

.email-link:hover {
  color: #2563EB;
  text-decoration: underline;
}
</style>