<template>
  <div class="services">
    <h1>Services & Products</h1>
    <div class="services-content">
      <p>Explore our comprehensive range of services designed to transform your business</p>
      
      <div class="services-grid">
        <div class="service-card">
          <h3>Advanced Analytics</h3>
          <p>Transform your data into actionable insights with our advanced analytics solutions.</p>
        </div>
        <div class="service-card">
          <h3>AI Readiness & Enablement</h3>
          <p>Prepare your organization for AI adoption and implementation.</p>
        </div>
        <div class="service-card">
          <h3>BI & Visualization</h3>
          <p>Create powerful visualizations and dashboards for better decision making.</p>
        </div>
        <div class="service-card">
          <h3>Data Analytics Consulting</h3>
          <p>Expert guidance on your data analytics journey.</p>
        </div>
        <div class="service-card">
          <h3>Data Products & Managed Services</h3>
          <p>End-to-end data product development and management.</p>
        </div>
        <div class="service-card">
          <h3>Data Migration Services</h3>
          <p>Seamless data migration and transformation services.</p>
        </div>
        <div class="service-card">
          <h3>Data Strategy</h3>
          <p>Develop a comprehensive data strategy aligned with your business goals.</p>
        </div>
        <div class="service-card">
          <h3>Data Warehousing</h3>
          <p>Modern data warehouse solutions for efficient data management.</p>
        </div>
        <div class="service-card">
          <h3>Master Data Management</h3>
          <p>Centralize and manage your critical business data.</p>
        </div>
        <div class="service-card">
          <h3>Organization Change Management</h3>
          <p>Guide your organization through digital transformation.</p>
        </div>
        <div class="service-card">
          <h3>Talent Acquisition</h3>
          <p>Find and retain top data and analytics talent.</p>
        </div>
        <div class="service-card">
          <h3>Data & App Integration</h3>
          <p>Seamless integration of data across your applications.</p>
        </div>
        <div class="service-card">
          <h3>Data Governance</h3>
          <p>Implement robust data governance frameworks.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can go here
</script>

<style scoped>
.services {
  padding: 2rem 0;
}

.services-content {
  margin-top: 2rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.service-card {
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: white;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
}

.service-card h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.service-card p {
  color: #666;
  line-height: 1.6;
}
</style>